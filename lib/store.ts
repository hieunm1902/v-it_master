import { prisma } from '@/lib/db';
import type { Article, Event, Course, CharityProject, Author } from '@/lib/data';
import {
  articles as mockArticles,
  events as mockEvents,
  courses as mockCourses,
  charityProjects as mockCharity,
} from '@/lib/data';

// ── Mappers ───────────────────────────────────────────────────────────────────

type DbAuthor = {
  id: number; name: string; avatar: string; role: string; company: string;
  bio: string; articles: number; followers: number; github: string | null; linkedin: string | null;
};

function mapAuthor(a: DbAuthor): Author {
  return {
    id: a.id, name: a.name, avatar: a.avatar, role: a.role,
    company: a.company, bio: a.bio, articles: a.articles, followers: a.followers,
    ...(a.github ? { github: a.github } : {}),
    ...(a.linkedin ? { linkedin: a.linkedin } : {}),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(a: any): Article {
  return {
    id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt,
    ...(a.content ? { content: a.content } : {}),
    author: mapAuthor(a.author),
    category: a.category, tags: a.tags, readTime: a.readTime,
    date: a.date, views: a.views, likes: a.likes, featured: a.featured,
    coverColor: a.coverColor, coverIcon: a.coverIcon,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(e: any): Event {
  return {
    id: e.id, slug: e.slug, title: e.title, description: e.description,
    type: e.type as Event['type'], date: e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    time: e.time, location: e.location,
    ...(e.venue ? { venue: e.venue } : {}),
    isOnline: e.isOnline,
    speakers: e.speakers as Event['speakers'],
    registeredCount: e.registeredCount, capacity: e.capacity,
    price: e.price as Event['price'],
    ...(e.priceAmount != null ? { priceAmount: e.priceAmount } : {}),
    tags: e.tags, coverColor: e.coverColor, organizer: e.organizer,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCourse(c: any): Course {
  return {
    id: c.id, slug: c.slug, title: c.title, description: c.description,
    instructor: mapAuthor(c.instructor),
    category: c.category, level: c.level as Course['level'],
    duration: c.duration, lessons: c.lessons, students: c.students,
    rating: c.rating, price: c.price as Course['price'],
    ...(c.priceAmount != null ? { priceAmount: c.priceAmount } : {}),
    tags: c.tags, coverColor: c.coverColor, updatedAt: c.updatedAt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCharity(p: any): CharityProject {
  return {
    id: p.id, title: p.title, description: p.description,
    target: p.target, raised: p.raised, beneficiaries: p.beneficiaries,
    ...(p.completedAt ? { completedAt: p.completedAt } : {}),
    status: p.status as CharityProject['status'],
    coverColor: p.coverColor,
  };
}

// ── Public getters (with fallback to mock data) ───────────────────────────────

export async function getArticles(): Promise<Article[]> {
  try {
    const items = await prisma.article.findMany({
      include: { author: true },
      orderBy: { date: 'desc' },
    });
    if (items.length === 0) return mockArticles;
    return items.map(mapArticle);
  } catch {
    return mockArticles;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const items = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    if (items.length === 0) return mockEvents;
    return items.map(mapEvent);
  } catch {
    return mockEvents;
  }
}

export async function getCourses(): Promise<Course[]> {
  try {
    const items = await prisma.course.findMany({
      include: { instructor: true },
      orderBy: { createdAt: 'desc' },
    });
    if (items.length === 0) return mockCourses;
    return items.map(mapCourse);
  } catch {
    return mockCourses;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const item = await prisma.article.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (!item) return mockArticles.find(a => a.slug === slug) ?? null;
    return mapArticle(item);
  } catch {
    return mockArticles.find(a => a.slug === slug) ?? null;
  }
}

export async function getCharityProjects(): Promise<CharityProject[]> {
  try {
    const items = await prisma.charityProject.findMany({ orderBy: { id: 'asc' } });
    if (items.length === 0) return mockCharity;
    return items.map(mapCharity);
  } catch {
    return mockCharity;
  }
}
