import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create an Admin
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.admin.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      password: adminPassword,
    },
  });
  console.log('✅ Admin created: admin / admin123');

  // Create a Sample Participant
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.participant.upsert({
    where: { usn: '1XX21XX000' },
    update: {},
    create: {
      name: 'Test Student',
      usn: '1XX21XX000',
      password: userPassword,
      yearOfStudy: 3,
      collegeName: 'PACE Institute',
      location: 'Bangalore',
    },
  });
  console.log('✅ Participant created: 1XX21XX000 / user123');

  console.log('✨ Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
