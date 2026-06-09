# V-IT Community — CODEBASE REFERENCE

> Đọc file này để hiểu toàn bộ project. Không cần đọc source code trừ khi cần sửa chi tiết.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` — không có tailwind.config.js) |
| React | 19.2.4 |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge, next-themes |
| Deploy | Railway (auto-deploy từ GitHub branch `master`) |
| Repo | https://github.com/hieunm1902/v-it_master.git |

---

## Cấu trúc thư mục

```
v-it_master/
├── app/
│   ├── globals.css              # Tailwind v4 import + custom CSS vars + utility classes
│   ├── layout.tsx               # Root layout — metadata, Inter font, <body>
│   ├── page.tsx                 # Trang chủ (/ ) — ghép tất cả sections
│   ├── bai-viet/
│   │   └── page.tsx             # Danh sách bài viết — filter, sidebar, pagination mock
│   ├── su-kien/
│   │   └── page.tsx             # Danh sách sự kiện — grid, filter loại, stats
│   ├── khoa-hoc/
│   │   └── page.tsx             # Danh sách khóa học — grid, filter, CTA giảng viên
│   └── ve-chung-toi/
│       └── page.tsx             # Giới thiệu — mission, team, timeline, charity
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Sticky navbar + mobile drawer menu
│   │   └── Footer.tsx           # Footer 4 cột + social links + charity badge
│   └── sections/
│       ├── Hero.tsx             # Hero section — headline, CTA, stats bar, wave bottom
│       ├── FeaturedArticles.tsx # 3 bài nổi bật (card lớn) + 4 bài compact + category chips
│       ├── UpcomingEvents.tsx   # 4 sự kiện grid — badges, speakers, progress bar
│       ├── CommunityFeatures.tsx # 6 feature cards — viết bài, khóa học, sự kiện...
│       ├── FeaturedCourses.tsx  # 3 khóa học nổi bật — rating, instructor, level
│       ├── CharityBanner.tsx    # Dark green section — active/completed charity projects
│       └── Newsletter.tsx       # Email subscription form (client component, mock submit)
│
└── lib/
    ├── data.ts                  # Toàn bộ mock data (xem chi tiết bên dưới)
    └── utils.ts                 # cn(), formatDate(), formatDateLong(), formatCurrency(), slugify()
```

---

## Design System

| Token | Giá trị | Dùng cho |
|---|---|---|
| Primary | Indigo `#4F46E5` | CTA, active state, links |
| Secondary | Emerald `#059669` | Charity, courses, community |
| Background | Slate-50 `#F8FAFC` | Page background |
| Text | Slate-900 `#0F172A` | Headings |
| Muted | Slate-500 `#64748B` | Body text, captions |
| Hero gradient | `from-slate-900 via-indigo-950 to-violet-950` | Hero + dark sections |
| Charity gradient | `from-emerald-900 via-teal-900 to-slate-900` | Charity banner |
| Card hover | `translateY(-4px) + shadow-xl` | `.card-hover` class |
| Font | Inter (Google Fonts) | Toàn bộ |

---

## lib/data.ts — Mock Data

### Types

```typescript
Author   { id, name, avatar(initials), role, company, bio, articles, followers, github?, linkedin? }
Article  { id, slug, title, excerpt, author, category, tags[], readTime, date, views, likes, featured, coverColor, coverIcon }
Event    { id, slug, title, description, type, date, endDate?, time, location, venue?, isOnline, speakers[], registeredCount, capacity, price, priceAmount?, tags[], coverColor, organizer }
Course   { id, slug, title, description, instructor, category, level, duration, lessons, students, rating, price, priceAmount?, tags[], coverColor, updatedAt }
CharityProject { id, title, description, target, raised, beneficiaries, completedAt?, status, coverColor }
```

### Dữ liệu hiện có

| | Số lượng | Chi tiết |
|---|---|---|
| Authors | 6 | Nguyễn Minh Khôi (FE/VNG), Trần Thị Lan Anh (AI/FPT), Lê Quang Hưng (DevOps/Tiki), Phạm Bảo Trung (BE/MoMo), Hoàng Thu Thảo (Mobile/Shopee), Vũ Đức Thành (Security) |
| Articles | 9 | Categories: Frontend(2), AI/ML(2), DevOps(2), Backend(1), Mobile(1), Security(1) |
| Events | 6 | Types: conference(1), workshop(1), meetup(1), webinar(1), hackathon(1), sharing(1) |
| Courses | 6 | Categories: Frontend, AI/ML, DevOps, Backend, Mobile, Security |
| CharityProjects | 4 | 2 active, 2 completed |
| communityStats | object | members: 12453, articles: 847, events: 124, courses: 38, charityRaised: 550M, cities: 63 |
| articleCategories | 8 | Frontend(187), Backend(143), AI/ML(124), DevOps(98), Mobile(76), Security(65), Database(54), Career(100) |

### Article coverColor palette
`from-blue-500 to-indigo-600` | `from-purple-500 to-pink-600` | `from-cyan-500 to-blue-600` | `from-emerald-500 to-teal-600` | `from-orange-500 to-red-500` | `from-red-500 to-rose-600` | `from-violet-500 to-purple-600`

---

## Navbar — NAV_LINKS

```
/ → Trang chủ
/bai-viet → Bài viết
/su-kien → Sự kiện
/khoa-hoc → Khóa học
/chia-se → Chia sẻ   ← trang chưa build
/ve-chung-toi → Về chúng tôi
```

---

## Trang đã build ✅

| Route | File | Tính năng |
|---|---|---|
| `/` | app/page.tsx | Hero + CommunityFeatures + FeaturedArticles + UpcomingEvents + FeaturedCourses + CharityBanner + Newsletter |
| `/bai-viet` | app/bai-viet/page.tsx | List articles, category filter buttons, search bar (UI only), sidebar (top authors + tags), pagination mock |
| `/su-kien` | app/su-kien/page.tsx | Grid events, type filter, stats row, registration progress bar, register button |
| `/khoa-hoc` | app/khoa-hoc/page.tsx | Grid courses, category + level + price filter, instructor CTA section |
| `/ve-chung-toi` | app/ve-chung-toi/page.tsx | Mission/vision, stats, core values (4), team (6 people), timeline (6 milestones), contact |

---

## Trang chưa build ❌

| Route | Mô tả |
|---|---|
| `/bai-viet/[slug]` | Chi tiết bài viết — full content, TOC, author bio, related articles, comment |
| `/su-kien/[slug]` | Chi tiết sự kiện — speakers, agenda, registration form |
| `/khoa-hoc/[slug]` | Chi tiết khóa học — syllabus, lessons list, enroll |
| `/chia-se` | Danh sách sharing sessions |
| `/tu-thien` | Chi tiết quỹ từ thiện — transparent fund tracker |
| `/tham-gia` | Đăng ký tài khoản |
| `/dang-nhap` | Login |
| `/viet-bai` | Editor viết bài (Markdown/rich text) |
| `/tao-khoa-hoc` | Tạo khóa học mới |
| `/programs/new` | Tạo sự kiện mới |

---

## Backend / Auth

**Hiện tại:** Chưa có backend. Toàn bộ là static mock data từ `lib/data.ts`.

**Cần làm khi thêm backend:**
- Database: PostgreSQL (Railway đã có addon)
- Auth: NextAuth.js hoặc custom JWT
- API routes: `app/api/` directory
- Cần thêm `DATABASE_URL` vào Railway environment variables

---

## Tailwind v4 — Lưu ý quan trọng

- **Không có** `tailwind.config.js` hay `tailwind.config.ts`
- Config màu trong `app/globals.css` dùng `@theme { --color-primary-*: ... }`
- Dark mode variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Custom classes trong globals.css: `.gradient-text`, `.gradient-hero`, `.card-hover`, `.line-clamp-2`, `.line-clamp-3`

---

## Deployment — Railway

- Branch: `master`
- Build command: `npm run build` (Next.js)
- Start command: `npm run start`
- Node version: auto-detect từ package.json
- Sau mỗi `git push origin master` → Railway tự deploy

---

## Quy ước code

- `'use client'` chỉ khi cần: interactive state (Navbar mobile menu, Newsletter form)
- Server Components mặc định cho tất cả các page và sections
- Import data trực tiếp từ `lib/data.ts` (không fetch API khi chưa có backend)
- Dùng `cn()` từ `lib/utils.ts` cho conditional classNames
- Ảnh: không có ảnh thật — dùng gradient + emoji/icon làm placeholder
- Avatar: 2 chữ cái viết tắt (vd: "NM", "TL") render trong div tròn gradient
