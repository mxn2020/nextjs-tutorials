// Mock function to get latest content
export async function getLatestContent(limit = 6) {
  // In a real app, this would fetch from MongoDB
  return [
    {
      id: "1",
      title: "Getting Started with Next.js App Router",
      description: "Learn how to build modern web applications with Next.js App Router",
      slug: "getting-started-with-nextjs-app-router",
      type: "tutorial",
      difficulty: "beginner",
      tags: ["Next.js", "App Router", "React"],
      author: {
        name: "John Doe",
        image: "/diverse-avatars.png",
      },
      publishedAt: "2023-05-15T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Server Components vs. Client Components",
      description: "Understanding the differences and when to use each type of component",
      slug: "server-components-vs-client-components",
      type: "explanation",
      difficulty: "intermediate",
      tags: ["Next.js", "React", "Server Components"],
      author: {
        name: "Jane Smith",
        image: "/diverse-avatars.png",
      },
      publishedAt: "2023-06-22T00:00:00.000Z",
    },
    {
      id: "3",
      title: "Building a Full-Stack App with Next.js and MongoDB",
      description: "Step-by-step guide to creating a full-stack application",
      slug: "building-full-stack-app-nextjs-mongodb",
      type: "tutorial",
      difficulty: "advanced",
      tags: ["Next.js", "MongoDB", "Full-Stack"],
      author: {
        name: "Alex Johnson",
        image: "/diverse-avatars.png",
      },
      publishedAt: "2023-07-10T00:00:00.000Z",
    },
    {
      id: "4",
      title: "Optimizing Images in Next.js",
      description: "Best practices for image optimization in Next.js applications",
      slug: "optimizing-images-nextjs",
      type: "tutorial",
      difficulty: "intermediate",
      tags: ["Next.js", "Performance", "Images"],
      author: {
        name: "Sarah Williams",
        image: "/diverse-avatars.png",
      },
      publishedAt: "2023-08-05T00:00:00.000Z",
    },
    {
      id: "5",
      title: "Authentication with NextAuth.js",
      description: "Implementing authentication in your Next.js application",
      slug: "authentication-with-nextauth",
      type: "tutorial",
      difficulty: "intermediate",
      tags: ["Next.js", "Authentication", "NextAuth.js"],
      author: {
        name: "Michael Brown",
        image: "/diverse-avatars.png",
      },
      publishedAt: "2023-09-18T00:00:00.000Z",
    },
    {
      id: "6",
      title: "Internationalization in Next.js",
      description: "Adding multi-language support to your Next.js application",
      slug: "internationalization-nextjs",
      type: "tutorial",
      difficulty: "intermediate",
      tags: ["Next.js", "i18n", "Localization"],
      author: {
        name: "Emily Chen",
        image: "/diverse-avatars.png",
      },
      publishedAt: "2023-10-30T00:00:00.000Z",
    },
  ].slice(0, limit)
}
