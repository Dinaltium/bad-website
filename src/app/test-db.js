
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const admins = await prisma.admin.findMany();
    console.log('Admins found:', admins.length);
    if (admins.length > 0) {
      console.log('Admin 1 name:', admins[0].name);
    }
  } catch (error) {
    console.error('DATABASE_TEST_ERROR:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
