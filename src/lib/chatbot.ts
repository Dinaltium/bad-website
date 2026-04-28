import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from './prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are a helpful assistant for a college fest website. Your role is to:

1. Help users navigate the website and understand features
2. Guide users through the registration process
3. Provide information about events and activities
4. Keep users updated with fest-related information
5. Answer questions about login, registration, and participation

Website Features:
- Two types of users: Admin and Participant
- Admin can manage events and participants
- Participants can register with: Name, Year of Study (1-4), College Name, Location, USN
- Events page showcasing all fest activities
- Dashboard for managing user profile and registrations

Key Navigation:
- /login - Login or Register page
- /events - Browse all events
- /dashboard - User dashboard

Be concise, friendly, and helpful. If users want to register, guide them to the login page where they can create an account.`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatbotService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async chat(userId: string, userType: string, message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      // Build conversation context
      const history = conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const chat = this.model.startChat({
        history,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(`${SYSTEM_PROMPT}\n\nUser Type: ${userType}\nUser Query: ${message}`);
      const response = result.response.text();

      // Store chat history
      await prisma.chatHistory.create({
        data: {
          userId,
          userType,
          message,
          response,
        },
      });

      return response;
    } catch (error) {
      console.error('Chatbot error:', error);
      throw new Error('Failed to generate response');
    }
  }

  async getChatHistory(userId: string, limit: number = 10): Promise<ChatMessage[]> {
    const history = await prisma.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return history.reverse().flatMap(h => [
      { role: 'user' as const, content: h.message },
      { role: 'assistant' as const, content: h.response },
    ]);
  }
}

export const chatbotService = new ChatbotService();
