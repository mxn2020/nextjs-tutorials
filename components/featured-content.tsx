"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookmarkButton } from "@/components/bookmark-button"
import { formatDate } from "@/lib/utils"

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

interface FeaturedContentProps {
  content: ContentItem[]
}

export function FeaturedContent({ content }: FeaturedContentProps) {
  const t = useTranslations("FeaturedContent")

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
    <section className="container py-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <Link href="/tutorials" className="text-sm font-medium text-primary hover:underline">
            {t("viewAll")}
          </Link>
        </div>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {content.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContentCard({ item }: { item: ContentItem }) {
  const t = useTranslations("ContentCard")

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const difficultyColor =
    {
      beginner: "bg-green-500",
      intermediate: "bg-yellow-500",
      advanced: "bg-red-500",
    }[item.difficulty.toLowerCase()] || "bg-blue-500"

  return (
    <motion.div variants={cardVariants} whileHover="hover">
      <Card className="h-full overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <Badge variant="outline" className="capitalize">
              {item.type}
            </Badge>
            <div className={`h-2 w-2 rounded-full ${difficultyColor}`} title={item.difficulty} />
          </div>
          <CardTitle className="line-clamp-2 mt-2">
            <Link href={`/tutorials/${item.slug}`} className="hover:underline">
              {item.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={item.author.image || "/placeholder.svg"} alt={item.author.name} />
                <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{formatDate(item.publishedAt)}</span>
            </div>
            <BookmarkButton id={item.id} />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
