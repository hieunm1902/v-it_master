// ── Types ─────────────────────────────────────────────────────────────────────

export type Author = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  company: string;
  bio: string;
  articles: number;
  followers: number;
  github?: string;
  linkedin?: string;
};

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author: Author;
  category: string;
  tags: string[];
  readTime: number;
  date: string;
  views: number;
  likes: number;
  featured: boolean;
  coverColor: string;
  coverIcon: string;
};

export type Event = {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: 'conference' | 'workshop' | 'meetup' | 'hackathon' | 'webinar' | 'sharing';
  date: string;
  endDate?: string;
  time: string;
  location: string;
  venue?: string;
  isOnline: boolean;
  speakers: { name: string; role: string; avatar: string }[];
  registeredCount: number;
  capacity: number;
  price: 'free' | 'paid';
  priceAmount?: number;
  tags: string[];
  coverColor: string;
  organizer: string;
};

export type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  instructor: Author;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: 'free' | 'paid';
  priceAmount?: number;
  tags: string[];
  coverColor: string;
  updatedAt: string;
};

export type CharityProject = {
  id: number;
  title: string;
  description: string;
  target: number;
  raised: number;
  beneficiaries: string;
  completedAt?: string;
  status: 'active' | 'completed';
  coverColor: string;
};

// ── Authors ───────────────────────────────────────────────────────────────────

export const authors: Author[] = [
  {
    id: 1,
    name: 'Nguyễn Minh Khôi',
    avatar: 'NM',
    role: 'Senior Frontend Engineer',
    company: 'VNG Corporation',
    bio: 'Hơn 8 năm kinh nghiệm với React, TypeScript và kiến trúc frontend hiện đại.',
    articles: 24,
    followers: 1842,
    github: 'minhkhoi',
    linkedin: 'minhkhoi',
  },
  {
    id: 2,
    name: 'Trần Thị Lan Anh',
    avatar: 'TL',
    role: 'AI/ML Engineer',
    company: 'FPT AI',
    bio: 'Chuyên gia về Machine Learning và Computer Vision. Đam mê ứng dụng AI vào thực tiễn.',
    articles: 18,
    followers: 2310,
    github: 'lananh',
    linkedin: 'lananh',
  },
  {
    id: 3,
    name: 'Lê Quang Hưng',
    avatar: 'LQ',
    role: 'DevOps Lead',
    company: 'Tiki',
    bio: 'Kiến trúc hệ thống cloud-native, Kubernetes, CI/CD pipelines. Speaker tại nhiều tech event.',
    articles: 31,
    followers: 3105,
    github: 'quanghung',
    linkedin: 'quanghung',
  },
  {
    id: 4,
    name: 'Phạm Bảo Trung',
    avatar: 'PT',
    role: 'Backend Engineer',
    company: 'MoMo',
    bio: 'Golang, microservices, distributed systems. Nghiện cà phê và clean code.',
    articles: 15,
    followers: 987,
    github: 'baotrung',
    linkedin: 'baotrung',
  },
  {
    id: 5,
    name: 'Hoàng Thu Thảo',
    avatar: 'HT',
    role: 'Mobile Developer',
    company: 'Shopee Vietnam',
    bio: 'Flutter & React Native enthusiast. Xây dựng các ứng dụng di động triệu người dùng.',
    articles: 12,
    followers: 756,
    github: 'thuthao',
    linkedin: 'thuthao',
  },
  {
    id: 6,
    name: 'Vũ Đức Thành',
    avatar: 'VD',
    role: 'Security Engineer',
    company: 'Cyber Security Vietnam',
    bio: 'Chuyên gia bảo mật ứng dụng web và cloud. CTF player, bug bounty hunter.',
    articles: 20,
    followers: 1654,
    github: 'ducthanh',
    linkedin: 'ducthanh',
  },
];

// ── Articles ──────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    id: 1,
    slug: 'react-server-components-tuong-lai-cua-react',
    title: 'React Server Components: Tương lai của React đã đến',
    excerpt: 'RSC thay đổi hoàn toàn cách chúng ta nghĩ về rendering. Cùng khám phá kiến trúc mới này và cách nó cải thiện performance đáng kể.',
    author: authors[0],
    category: 'Frontend',
    tags: ['React', 'Next.js', 'RSC', 'Performance'],
    readTime: 8,
    date: '2026-06-05',
    views: 4231,
    likes: 312,
    featured: true,
    coverColor: 'from-blue-500 to-indigo-600',
    coverIcon: '⚛️',
  },
  {
    id: 2,
    slug: 'lam-the-nao-de-deploy-llm-len-production',
    title: 'Làm thế nào để deploy LLM lên Production? Bài học từ thực tế',
    excerpt: 'Từ prototype đến production, chúng tôi đã gặp phải hàng chục vấn đề khi deploy LLM. Đây là những bài học đắt giá nhất.',
    author: authors[1],
    category: 'AI/ML',
    tags: ['LLM', 'MLOps', 'Production', 'AI'],
    readTime: 12,
    date: '2026-06-03',
    views: 6842,
    likes: 521,
    featured: true,
    coverColor: 'from-purple-500 to-pink-600',
    coverIcon: '🤖',
  },
  {
    id: 3,
    slug: 'kubernetes-cho-nguoi-moi-bat-dau',
    title: 'Kubernetes cho người mới bắt đầu: Từ 0 đến deploy thực tế',
    excerpt: 'Hướng dẫn toàn diện về Kubernetes từ concepts cơ bản đến deploy ứng dụng production-ready với best practices.',
    author: authors[2],
    category: 'DevOps',
    tags: ['Kubernetes', 'Docker', 'DevOps', 'Cloud'],
    readTime: 15,
    date: '2026-06-01',
    views: 8923,
    likes: 687,
    featured: true,
    coverColor: 'from-cyan-500 to-blue-600',
    coverIcon: '☸️',
  },
  {
    id: 4,
    slug: 'golang-microservices-thuc-chien',
    title: 'Golang Microservices: Xây dựng hệ thống xử lý 1 triệu request/ngày',
    excerpt: 'Case study thực tế về cách thiết kế và tối ưu hệ thống microservices với Go, từ design patterns đến monitoring.',
    author: authors[3],
    category: 'Backend',
    tags: ['Golang', 'Microservices', 'Performance', 'System Design'],
    readTime: 18,
    date: '2026-05-28',
    views: 5621,
    likes: 445,
    featured: false,
    coverColor: 'from-emerald-500 to-teal-600',
    coverIcon: '🐹',
  },
  {
    id: 5,
    slug: 'flutter-vs-react-native-2026',
    title: 'Flutter vs React Native 2026: Đâu là lựa chọn tốt hơn?',
    excerpt: 'So sánh chi tiết hai framework phát triển ứng dụng đa nền tảng phổ biến nhất hiện nay dựa trên kinh nghiệm thực chiến.',
    author: authors[4],
    category: 'Mobile',
    tags: ['Flutter', 'React Native', 'Mobile', 'Cross-platform'],
    readTime: 10,
    date: '2026-05-25',
    views: 7234,
    likes: 598,
    featured: false,
    coverColor: 'from-orange-500 to-red-500',
    coverIcon: '📱',
  },
  {
    id: 6,
    slug: 'web-security-10-lo-hong-pho-bien-nhat',
    title: '10 Lỗ hổng bảo mật web phổ biến nhất và cách phòng tránh',
    excerpt: 'OWASP Top 10 trong thực tế: phân tích từng loại tấn công, demo code vulnerable và hướng dẫn fix chi tiết.',
    author: authors[5],
    category: 'Security',
    tags: ['Security', 'OWASP', 'Web', 'Pentesting'],
    readTime: 14,
    date: '2026-05-22',
    views: 9102,
    likes: 723,
    featured: false,
    coverColor: 'from-red-500 to-rose-600',
    coverIcon: '🔒',
  },
  {
    id: 7,
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript Advanced Patterns: Những kỹ thuật bạn chưa biết',
    excerpt: 'Khám phá các pattern TypeScript nâng cao như conditional types, template literal types và mapped types để viết code type-safe hơn.',
    author: authors[0],
    category: 'Frontend',
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    readTime: 11,
    date: '2026-05-20',
    views: 3891,
    likes: 302,
    featured: false,
    coverColor: 'from-blue-400 to-violet-500',
    coverIcon: '🔷',
  },
  {
    id: 8,
    slug: 'rag-architecture-viet-nam-use-cases',
    title: 'RAG Architecture: Ứng dụng thực tế cho thị trường Việt Nam',
    excerpt: 'Retrieval Augmented Generation (RAG) đang được ứng dụng thế nào tại các công ty Việt Nam? Case study từ fintech đến e-commerce.',
    author: authors[1],
    category: 'AI/ML',
    tags: ['RAG', 'LLM', 'AI', 'Vietnam'],
    readTime: 16,
    date: '2026-05-18',
    views: 5430,
    likes: 412,
    featured: false,
    coverColor: 'from-violet-500 to-purple-600',
    coverIcon: '🧠',
  },
  {
    id: 9,
    slug: 'ci-cd-pipeline-best-practices',
    title: 'CI/CD Pipeline: Best Practices từ team DevOps 100+ người',
    excerpt: 'Những bài học quý giá từ việc vận hành CI/CD pipeline cho hệ thống quy mô lớn: từ tốc độ deploy đến rollback strategy.',
    author: authors[2],
    category: 'DevOps',
    tags: ['CI/CD', 'GitOps', 'DevOps', 'Automation'],
    readTime: 13,
    date: '2026-05-15',
    views: 6231,
    likes: 501,
    featured: false,
    coverColor: 'from-teal-500 to-cyan-600',
    coverIcon: '🚀',
  },
];

// ── Events ────────────────────────────────────────────────────────────────────

export const events: Event[] = [
  {
    id: 1,
    slug: 'vietnam-tech-summit-2026',
    title: 'Vietnam Tech Summit 2026',
    description: 'Hội nghị công nghệ lớn nhất Việt Nam năm 2026 với sự tham gia của 50+ diễn giả trong nước và quốc tế. Các chủ đề chính: AI/ML, Cloud Computing, Fintech, Cybersecurity.',
    type: 'conference',
    date: '2026-07-15',
    endDate: '2026-07-16',
    time: '08:00',
    location: 'Hà Nội',
    venue: 'Trung tâm Hội nghị Quốc gia',
    isOnline: false,
    speakers: [
      { name: 'Nguyễn Minh Khôi', role: 'Frontend Lead @ VNG', avatar: 'NM' },
      { name: 'Trần Thị Lan Anh', role: 'AI Engineer @ FPT', avatar: 'TL' },
      { name: 'Lê Quang Hưng', role: 'DevOps Lead @ Tiki', avatar: 'LQ' },
    ],
    registeredCount: 1243,
    capacity: 2000,
    price: 'paid',
    priceAmount: 500000,
    tags: ['AI', 'Cloud', 'Fintech', 'Security'],
    coverColor: 'from-indigo-600 to-purple-700',
    organizer: 'Vietnam IT Community',
  },
  {
    id: 2,
    slug: 'workshop-ai-cho-lap-trinh-vien-viet-nam',
    title: 'Workshop: Ứng dụng AI vào phát triển phần mềm',
    description: 'Workshop thực hành 1 ngày về cách tích hợp AI tools (GitHub Copilot, Cursor, Claude) vào workflow phát triển phần mềm. Học qua thực hành với dự án thực tế.',
    type: 'workshop',
    date: '2026-06-20',
    time: '09:00',
    location: 'TP. Hồ Chí Minh',
    venue: 'Coworking Space Toong Võ Văn Tần',
    isOnline: false,
    speakers: [
      { name: 'Phạm Bảo Trung', role: 'Backend Engineer @ MoMo', avatar: 'PT' },
    ],
    registeredCount: 47,
    capacity: 60,
    price: 'free',
    tags: ['AI', 'Workshop', 'Productivity', 'Tools'],
    coverColor: 'from-emerald-500 to-teal-600',
    organizer: 'Vietnam IT Community',
  },
  {
    id: 3,
    slug: 'hcm-tech-meetup-june-2026',
    title: 'HCM Tech Meetup - Tháng 6/2026',
    description: 'Buổi meetup hàng tháng của cộng đồng IT Sài Gòn. Lần này với chủ đề "Microservices & Event-Driven Architecture". Networking, sharing và pizza!',
    type: 'meetup',
    date: '2026-06-25',
    time: '18:30',
    location: 'TP. Hồ Chí Minh',
    venue: 'Grab Vietnam Office, Bitexco Financial Tower',
    isOnline: false,
    speakers: [
      { name: 'Lê Quang Hưng', role: 'DevOps Lead @ Tiki', avatar: 'LQ' },
      { name: 'Phạm Bảo Trung', role: 'Backend Engineer @ MoMo', avatar: 'PT' },
    ],
    registeredCount: 89,
    capacity: 120,
    price: 'free',
    tags: ['Meetup', 'Backend', 'Microservices', 'Networking'],
    coverColor: 'from-orange-500 to-amber-600',
    organizer: 'Vietnam IT Community',
  },
  {
    id: 4,
    slug: 'webinar-security-2026',
    title: 'Webinar: Bảo mật ứng dụng web trong 2026',
    description: 'Phiên webinar trực tuyến về các xu hướng bảo mật mới nhất, cách phòng thủ trước các tấn công AI-powered và DevSecOps practices.',
    type: 'webinar',
    date: '2026-06-18',
    time: '20:00',
    location: 'Online',
    isOnline: true,
    speakers: [
      { name: 'Vũ Đức Thành', role: 'Security Engineer', avatar: 'VD' },
    ],
    registeredCount: 312,
    capacity: 1000,
    price: 'free',
    tags: ['Security', 'Webinar', 'Online', 'DevSecOps'],
    coverColor: 'from-red-500 to-rose-600',
    organizer: 'Vietnam IT Community',
  },
  {
    id: 5,
    slug: 'hackathon-giai-phap-cong-nghe-cho-giao-duc',
    title: 'Hackathon: Giải pháp công nghệ cho Giáo dục',
    description: '48 giờ hackathon với chủ đề ứng dụng công nghệ AI và EdTech vào cải thiện chất lượng giáo dục Việt Nam. Giải thưởng tổng cộng 100 triệu VND.',
    type: 'hackathon',
    date: '2026-08-01',
    endDate: '2026-08-03',
    time: '08:00',
    location: 'Đà Nẵng',
    venue: 'ĐH Đà Nẵng',
    isOnline: false,
    speakers: [],
    registeredCount: 156,
    capacity: 300,
    price: 'free',
    tags: ['Hackathon', 'EdTech', 'AI', 'Education'],
    coverColor: 'from-yellow-500 to-orange-500',
    organizer: 'Vietnam IT Community & Bộ GD&ĐT',
  },
  {
    id: 6,
    slug: 'sharing-flutter-mobile-dev',
    title: 'Sharing: Từ 0 đến App Store với Flutter',
    description: 'Chia sẻ hành trình thực tế xây dựng và publish một ứng dụng Flutter lên App Store & Google Play, kèm bài học rút ra và những lỗi cần tránh.',
    type: 'sharing',
    date: '2026-07-05',
    time: '10:00',
    location: 'Online (Zoom)',
    isOnline: true,
    speakers: [
      { name: 'Hoàng Thu Thảo', role: 'Mobile Dev @ Shopee', avatar: 'HT' },
    ],
    registeredCount: 234,
    capacity: 500,
    price: 'free',
    tags: ['Flutter', 'Mobile', 'App Store', 'Sharing'],
    coverColor: 'from-sky-500 to-blue-600',
    organizer: 'Vietnam IT Community',
  },
];

// ── Courses ───────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  {
    id: 1,
    slug: 'react-nextjs-tu-zero-den-hero',
    title: 'React & Next.js: Từ Zero đến Hero',
    description: 'Khóa học toàn diện về React 19 và Next.js 15+. Từ cơ bản đến nâng cao, xây dựng 3 dự án thực tế đưa lên production.',
    instructor: authors[0],
    category: 'Frontend',
    level: 'Beginner',
    duration: '40 giờ',
    lessons: 82,
    students: 3421,
    rating: 4.9,
    price: 'free',
    tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    coverColor: 'from-blue-500 to-indigo-600',
    updatedAt: '2026-05-10',
  },
  {
    id: 2,
    slug: 'machine-learning-co-ban-cho-lap-trinh-vien',
    title: 'Machine Learning cơ bản cho Lập trình viên',
    description: 'Không cần nền tảng toán học chuyên sâu. Học ML thông qua code Python thực tế, từ linear regression đến neural networks cơ bản.',
    instructor: authors[1],
    category: 'AI/ML',
    level: 'Intermediate',
    duration: '35 giờ',
    lessons: 67,
    students: 2156,
    rating: 4.8,
    price: 'free',
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    coverColor: 'from-purple-500 to-pink-600',
    updatedAt: '2026-04-20',
  },
  {
    id: 3,
    slug: 'devops-kubernetes-aws-thuc-chien',
    title: 'DevOps Thực chiến: Kubernetes & AWS',
    description: 'Khóa học thực hành về DevOps hiện đại. Setup Kubernetes cluster, CI/CD với GitHub Actions, deploy trên AWS với Terraform.',
    instructor: authors[2],
    category: 'DevOps',
    level: 'Advanced',
    duration: '50 giờ',
    lessons: 95,
    students: 1876,
    rating: 4.9,
    price: 'paid',
    priceAmount: 699000,
    tags: ['Kubernetes', 'AWS', 'Terraform', 'GitOps'],
    coverColor: 'from-cyan-500 to-teal-600',
    updatedAt: '2026-05-25',
  },
  {
    id: 4,
    slug: 'golang-backend-xay-dung-api-the-nao',
    title: 'Golang Backend: Xây dựng API scalable',
    description: 'Học Golang từ đầu và xây dựng REST API + gRPC với Go. Clean architecture, testing, deployment production-ready.',
    instructor: authors[3],
    category: 'Backend',
    level: 'Intermediate',
    duration: '30 giờ',
    lessons: 58,
    students: 1234,
    rating: 4.7,
    price: 'free',
    tags: ['Golang', 'API', 'Backend', 'gRPC'],
    coverColor: 'from-emerald-500 to-green-600',
    updatedAt: '2026-03-15',
  },
  {
    id: 5,
    slug: 'flutter-app-tu-design-den-publish',
    title: 'Flutter: Từ Design đến Publish App',
    description: 'Xây dựng ứng dụng Flutter hoàn chỉnh từ design Figma đến publish App Store & Google Play. State management, animations, integrations.',
    instructor: authors[4],
    category: 'Mobile',
    level: 'Intermediate',
    duration: '45 giờ',
    lessons: 88,
    students: 1654,
    rating: 4.8,
    price: 'paid',
    priceAmount: 499000,
    tags: ['Flutter', 'Dart', 'Mobile', 'UI/UX'],
    coverColor: 'from-sky-400 to-blue-500',
    updatedAt: '2026-05-01',
  },
  {
    id: 6,
    slug: 'web-security-pentest-co-ban',
    title: 'Web Security & Pentest Cơ bản',
    description: 'Tìm hiểu OWASP Top 10, học cách pentest web application trong môi trường lab an toàn, viết báo cáo vulnerability.',
    instructor: authors[5],
    category: 'Security',
    level: 'Beginner',
    duration: '28 giờ',
    lessons: 52,
    students: 2301,
    rating: 4.9,
    price: 'free',
    tags: ['Security', 'Pentest', 'OWASP', 'Ethical Hacking'],
    coverColor: 'from-red-500 to-rose-600',
    updatedAt: '2026-04-10',
  },
];

// ── Charity Projects ───────────────────────────────────────────────────────────

export const charityProjects: CharityProject[] = [
  {
    id: 1,
    title: 'Học bổng IT cho sinh viên vùng xa',
    description: 'Tặng học bổng và laptop cho 50 sinh viên ngành CNTT ở vùng nông thôn, giúp các bạn có điều kiện học tập tốt hơn.',
    target: 150_000_000,
    raised: 127_500_000,
    beneficiaries: '50 sinh viên tại 5 tỉnh miền núi phía Bắc',
    status: 'active',
    coverColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    title: 'Phòng máy tính cho trường tiểu học',
    description: 'Trang bị phòng máy tính với 30 máy tính cho Trường Tiểu học Vùng Cao Lào Cai.',
    target: 200_000_000,
    raised: 200_000_000,
    beneficiaries: '600 học sinh Trường TH Số 1 Bản Phiệt, Lào Cai',
    completedAt: '2025-12-20',
    status: 'completed',
    coverColor: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    title: 'Chương trình Code dạy trẻ em',
    description: 'Dạy lập trình miễn phí cho 200 trẻ em 8-15 tuổi tại các nhà văn hóa thiếu nhi ở TP.HCM và Hà Nội.',
    target: 80_000_000,
    raised: 80_000_000,
    beneficiaries: '200 trẻ em tại TP.HCM và Hà Nội',
    completedAt: '2025-09-01',
    status: 'completed',
    coverColor: 'from-orange-500 to-amber-600',
  },
  {
    id: 4,
    title: 'Internet cho bản làng miền núi',
    description: 'Hỗ trợ chi phí internet và thiết bị kết nối cho 10 bản làng vùng sâu để học sinh có thể học online.',
    target: 120_000_000,
    raised: 45_000_000,
    beneficiaries: '~1000 học sinh tại 10 bản làng',
    status: 'active',
    coverColor: 'from-violet-500 to-purple-600',
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────

export const communityStats = {
  members: 12453,
  articles: 847,
  events: 124,
  courses: 38,
  charityRaised: 550_000_000,
  cities: 63,
};

// ── Categories ────────────────────────────────────────────────────────────────

export const articleCategories = [
  { name: 'Frontend', count: 187, color: 'bg-blue-100 text-blue-700' },
  { name: 'Backend', count: 143, color: 'bg-emerald-100 text-emerald-700' },
  { name: 'AI/ML', count: 124, color: 'bg-purple-100 text-purple-700' },
  { name: 'DevOps', count: 98, color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Mobile', count: 76, color: 'bg-orange-100 text-orange-700' },
  { name: 'Security', count: 65, color: 'bg-red-100 text-red-700' },
  { name: 'Database', count: 54, color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Career', count: 100, color: 'bg-pink-100 text-pink-700' },
];
