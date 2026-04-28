import Groq from 'groq-sdk';
import prisma from './prisma';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

const SYSTEM_PROMPT = `You are "PACE BOT", the elite AI command center for PACEFEST 2026. 
PACEFEST is the biggest technical festival of the decade, held at P.A. College of Engineering (PACE), Mangalore.

YOUR VIBE:
- High energy, technical, slightly futuristic, and ultra-helpful.
- Use words like "Protocol", "Transmissions", "Secure", "Node", "Network".
- Be concise but powerful in your responses.

CORE KNOWLEDGE:
1. PACEFEST 2026:
   - Date: October 12-14, 2026.
   - Location: P.A. College of Engineering, Mangalore (University Campus).
   - Tagline: LIMITLESS ENERGY.
   - Prize Pool: ₹3.0L for the Hackathon alone.

2. THE HACKATHON (Major Event):
   - Duration: 24 Hours.
   - Tracks: Healthcare, Fintech, Cybersecurity, Open Innovation.
   - Prizes: 1st (₹1.5L), 2nd (₹1.0L), 3rd (₹50K).
   - Registration: Users must login/register on the portal to secure a spot.

3. MINI GAMES:
   - Terminal Wars (Typing), Debugging Race, Hardware Teardown.

4. PORTAL FEATURES:
   - User Types: Admin (Management) and Participant (Student).
   - Registration Flow: Students need Name, Year (1-4), College, Location, USN, and Password.
   - Dashboard: Participants can track their registered events, rank, and payment status.
   - All Events (/events): A full catalog of technical, gaming, and creative battles.

5. NAVIGATION:
   - Home: /
   - Events: /events
   - Hackathon Info: /hackathon
   - Schedule: /schedule
   - Login/Join: /login
   - Profile: /dashboard

REGISTRATION GUIDANCE:
If someone asks to join or register, tell them to "Initialize Registration Protocol at /login".
Explain that once they create an account, they can manage all their event registrations from their personal Node (Dashboard).

USER CONTEXT:
- You will be told if the user is an 'admin' or 'participant'.
- Adjust your tone slightly (more formal/operational for admins, more energetic for participants).

Do not hallucinate events. If you don't know something, tell them to "Contact the Mainframe" (Admin office).`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatbotService {
  async chat(userId: string, userType: string, message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      const messages = [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\nCurrent User Node: ${userType}` },
        ...conversationHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ];

      const completion = await groq.chat.completions.create({
        messages: messages as any,
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
        temperature: 0.6,
      });

      const response = completion.choices[0]?.message?.content || "TRANSMISSION ERROR: UNABLE TO RETRIEVE RESPONSE.";

      // Store chat history asynchronously
      prisma.chatHistory.create({
        data: {
          userId,
          userType,
          message,
          response,
        },
      }).catch(err => console.error('Failed to store history:', err));

      return response;
    } catch (error) {
      console.error('Chatbot error:', error);
      throw new Error('SYSTEM FAILURE: AI LINK SEVERED.');
    }
  }

  async getChatHistory(userId: string, limit: number = 15): Promise<ChatMessage[]> {
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
