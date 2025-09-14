import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create screens with correct enum values
  const screens = await Promise.all([
    prisma.screen.upsert({
      where: { screenNumber: 1 },
      update: {},
      create: {
        screenNumber: 1,
        type: 'STANDARD',
        totalSeats: 100,
      },
    }),
    prisma.screen.upsert({
      where: { screenNumber: 2 },
      update: {},
      create: {
        screenNumber: 2,
        type: 'THREED',
        totalSeats: 80,
      },
    }),
    prisma.screen.upsert({
      where: { screenNumber: 3 },
      update: {},
      create: {
        screenNumber: 3,
        type: 'IMAX',
        totalSeats: 120,
      },
    }),
  ]);

  console.log('✅ Created screens:', screens.map(s => `Screen ${s.screenNumber} (${s.type})`));

  // Create a sample movie
  const sampleMovie = await prisma.movie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Sample Movie',
      description: 'A sample movie for testing the booking system',
      genres: ['Action', 'Adventure'],
      duration: 120,
      releaseDate: Math.floor(Date.now() / 1000),
      language: 'English',
      ageRating: 'PG-13',
      posterUrl: 'https://via.placeholder.com/300x450',
      backdropUrl: 'https://via.placeholder.com/1920x1080',
      status: 'ACTIVE',
      casts: ['Actor 1', 'Actor 2'],
      director: 'Sample Director',
    },
  });

  console.log('✅ Created sample movie:', sampleMovie.title);

  // Create sample shows for each screen type
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const shows = [];
  
  for (const screen of screens) {
    // Create shows at different times for each screen
    const showTimes = [
      new Date(tomorrow).setHours(14, 30, 0, 0), // 2:30 PM
      new Date(tomorrow).setHours(18, 0, 0, 0),  // 6:00 PM
      new Date(tomorrow).setHours(21, 30, 0, 0), // 9:30 PM
    ];

    for (const showTime of showTimes) {
      const show = await prisma.show.create({
        data: {
          movieId: sampleMovie.id,
          screenId: screen.id,
          showTime: Math.floor(showTime / 1000),
          startDate: Math.floor(today.getTime() / 1000),
          endDate: Math.floor(nextWeek.getTime() / 1000),
          pricing: {
            platinum: screen.type === 'IMAX' ? 600 : screen.type === 'THREED' ? 400 : 300,
            gold: screen.type === 'IMAX' ? 400 : screen.type === 'THREED' ? 300 : 200,
            silver: screen.type === 'IMAX' ? 300 : screen.type === 'THREED' ? 250 : 150,
          },
        },
      });
      shows.push(show);
    }
  }

  console.log(`✅ Created ${shows.length} shows across all screen types`);
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 