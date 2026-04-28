
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    const name = 'rafan79200@gmail.com';
    const password = 'rafan123';

    const admin = await prisma.admin.findUnique({
      where: { name },
    });

    if (!admin) {
      console.log('Admin not found');
      return;
    }

    const isValid = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isValid);
  } catch (error) {
    console.error('LOGIN_TEST_ERROR:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
