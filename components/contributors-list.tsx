"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Globe } from "lucide-react"
import Link from "next/link"

export function ContributorsList() {
  // Mock data for contributors
  const contributors = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/diverse-avatars.png",
      role: "Core Team",
      contributions: 156,
      github: "johndoe",
      twitter: "johndoe",
      website: "https://johndoe.com",
      bio: "Full-stack developer specializing in Next.js and React. Core contributor to the Next.js Knowledge Library.",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/diverse-avatars.png",
      role: "Content Creator",
      contributions: 89,
      github: "janesmith",
      twitter: "janesmith",
      website: "https://janesmith.dev",
      bio: "Technical writer and educator. Focuses on creating beginner-friendly tutorials and documentation.",
    },
    {
      id: "3",
      name: "Alex Johnson",
      avatar: "/diverse-avatars.png",
      role: "AI Prompt Engineer",
      contributions: 42,
      github: "alexj",
      twitter: "alexj",
      website: null,
      bio: "AI researcher and prompt engineer. Specializes in creating effective prompts for learning and development.",
    },
    {
      id: "4",
      name: "Sarah Williams",
      avatar: "/diverse-avatars.png",
      role: "Translator",
      contributions: 67,
      github: "sarahw",
      twitter: null,
      website: "https://sarahwilliams.io",
      bio: "Multilingual developer and translator. Helps make content accessible in multiple languages.",
    },
    {
      id: "5",
      name: "Michael Brown",
      avatar: "/diverse-avatars.png",
      role: "Core Team",
      contributions: 124,
      github: "michaelb",
      twitter: "michaelb",
      website: "https://michaelbrown.dev",
      bio: "Backend developer with expertise in MongoDB and authentication systems. Maintains the platform infrastructure.",
    },
    {
      id: "6",
      name: "Emily Chen",
      avatar: "/diverse-avatars.png",
      role: "Content Creator",
      contributions: 53,
      github: "emilyc",
      twitter: "emilyc",
      website: null,
      bio: "Frontend developer and UX designer. Creates tutorials focused on accessibility and responsive design.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Top Contributors</h2>
        <p className="text-muted-foreground">Meet the amazing people who make the Next.js Knowledge Library possible</p>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {contributors.map((contributor) => (
          <motion.div key={contributor.id} variants={item}>
            <Card className="h-full overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{contributor.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{contributor.role}</Badge>
                      <Badge variant="secondary">{contributor.contributions} contributions</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <CardDescription className="line-clamp-3 mb-4">{contributor.bio}</CardDescription>
                <div className="flex gap-2">
                  {contributor.github && (
                    <Link
                      href={`https://github.com/${contributor.github}`}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  )}
                  {contributor.twitter && (
                    <Link
                      href={`https://twitter.com/${contributor.twitter}`}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  )}
                  {contributor.website && (
                    <Link
                      href={contributor.website}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">Website</span>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
