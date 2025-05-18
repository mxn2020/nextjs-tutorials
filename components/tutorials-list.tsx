"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookmarkButton } from "@/components/bookmark-button"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  description: string
  slug: string
  type: string
  difficulty: string
  tags: string[]
  author: {
    name: string
    image?: string
  }
  publishedAt: string
}

interface TutorialsListProps {
  tutorials: ContentItem[]
}

export function TutorialsList({ tutorials }: TutorialsListProps) {
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
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {tutorials.map((tutorial) => (
        <motion.div key={tutorial.id} variants={item}>
          <Card className="h-full overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <Badge variant="outline" className="capitalize">
                  {tutorial.type}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {tutorial.difficulty}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2 mt-2">
                <Link href={`/tutorials/${tutorial.slug}`} className="hover:underline">
                  {tutorial.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-2">
                {tutorial.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={tutorial.author.image || "/placeholder.svg"} alt={tutorial.author.name} />
                    <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{formatDate(tutorial.publishedAt)}</span>
                </div>
                <BookmarkButton id={tutorial.id} />
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
