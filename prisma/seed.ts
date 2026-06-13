import { PrismaClient } from '@prisma/client';
import { authors, articles, events, courses, charityProjects } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Authors (must go first — other models reference them)
  for (const a of authors) {
    await prisma.author.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id, name: a.name, avatar: a.avatar, role: a.role,
        company: a.company, bio: a.bio, articles: a.articles,
        followers: a.followers, github: a.github, linkedin: a.linkedin,
      },
    });
  }
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Author"', 'id'), COALESCE((SELECT MAX(id) FROM "Author"), 1), true)`;
  console.log(`  ✓ ${authors.length} authors`);

  // Articles
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt,
        content: a.content, authorId: a.author.id, category: a.category,
        tags: a.tags, readTime: a.readTime, date: a.date,
        views: a.views, likes: a.likes, featured: a.featured,
        coverColor: a.coverColor, coverIcon: a.coverIcon,
      },
    });
  }
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Article"', 'id'), COALESCE((SELECT MAX(id) FROM "Article"), 1), true)`;
  console.log(`  ✓ ${articles.length} articles`);

  // Events
  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {},
      create: {
        id: e.id, slug: e.slug, title: e.title, description: e.description,
        type: e.type, date: e.date, endDate: e.endDate, time: e.time,
        location: e.location, venue: e.venue, isOnline: e.isOnline,
        speakers: e.speakers, registeredCount: e.registeredCount,
        capacity: e.capacity, price: e.price, priceAmount: e.priceAmount,
        tags: e.tags, coverColor: e.coverColor, organizer: e.organizer,
      },
    });
  }
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Event"', 'id'), COALESCE((SELECT MAX(id) FROM "Event"), 1), true)`;
  console.log(`  ✓ ${events.length} events`);

  // Courses
  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        id: c.id, slug: c.slug, title: c.title, description: c.description,
        instructorId: c.instructor.id, category: c.category, level: c.level,
        duration: c.duration, lessons: c.lessons, students: c.students,
        rating: c.rating, price: c.price, priceAmount: c.priceAmount,
        tags: c.tags, coverColor: c.coverColor, updatedAt: c.updatedAt,
      },
    });
  }
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Course"', 'id'), COALESCE((SELECT MAX(id) FROM "Course"), 1), true)`;
  console.log(`  ✓ ${courses.length} courses`);

  // Charity projects
  for (const p of charityProjects) {
    await prisma.charityProject.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id, title: p.title, description: p.description,
        target: p.target, raised: p.raised, beneficiaries: p.beneficiaries,
        completedAt: p.completedAt, status: p.status, coverColor: p.coverColor,
      },
    });
  }
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"CharityProject"', 'id'), COALESCE((SELECT MAX(id) FROM "CharityProject"), 1), true)`;
  console.log(`  ✓ ${charityProjects.length} charity projects`);

  console.log('✅ Seed hoàn tất!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
