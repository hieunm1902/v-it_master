import fs from 'fs';
import path from 'path';
import type { Article, Event, Course, CharityProject } from '@/lib/data';
import {
  articles as mockArticles,
  events as mockEvents,
  courses as mockCourses,
  charityProjects as mockCharity,
} from '@/lib/data';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(name: string, fallback: T): T {
  try {
    const p = path.join(DATA_DIR, `${name}.json`);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {}
  return fallback;
}

function writeJson(name: string, data: unknown) {
  ensureDir();
  fs.writeFileSync(
    path.join(DATA_DIR, `${name}.json`),
    JSON.stringify(data, null, 2),
    'utf-8',
  );
}

export const getArticles = () => readJson<Article[]>('articles', mockArticles);
export const saveArticles = (d: Article[]) => writeJson('articles', d);

export const getEvents = () => readJson<Event[]>('events', mockEvents);
export const saveEvents = (d: Event[]) => writeJson('events', d);

export const getCourses = () => readJson<Course[]>('courses', mockCourses);
export const saveCourses = (d: Course[]) => writeJson('courses', d);

export const getCharityProjects = () =>
  readJson<CharityProject[]>('charity', mockCharity);
export const saveCharityProjects = (d: CharityProject[]) =>
  writeJson('charity', d);
