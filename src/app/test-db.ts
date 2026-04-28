
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const admins = await prisma.admin.findMany();
    console.log('Admins found:', admins.length);
    console.log('Admin 1:', admins[0]?.name);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
