import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 uses Turbopack by default; the pdf-parse API route runs in
  // nodejs runtime so no bundler alias is needed for the optional canvas dep.
  turbopack: {},
};

export default nextConfig;
