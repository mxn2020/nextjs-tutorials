"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

interface ContentMatrixProps {
  className?: string
}

export function ContentMatrix({ className }: ContentMatrixProps) {
  const t = useTranslations("ContentMatrix")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for the content matrix
  const topics = [
    "App Router",
    "Pages Router",
    "Data Fetching",
    "Routing",
    "API Routes",
    "Authentication",
    "Deployment",
    "Styling",
    "Testing",
    "Internationalization",
  ]

  const difficulties = ["Beginner", "Intermediate", "Advanced"]

  const formats = ["Tutorial", "Reference", "Explanation", "Snippet", "Video"]

  // Generate mock matrix data
  const generateMatrixData = () => {
    const data: Record<string, Record<string, string>> = {}

    topics.forEach((topic) => {
      data[topic] = {}
      difficulties.forEach((difficulty) => {
        // Randomly assign a status
        const rand = Math.random()
        if (rand < 0.6) {
          data[topic][difficulty] = "available"
        } else if (rand < 0.8) {
          data[topic][difficulty] = "in-progress"
        } else {
          data[topic][difficulty] = "not-available"
        }
      })
    })

    return data
  }

  const matrixData = generateMatrixData()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "not-available":
        return <XCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return t("available")
      case "in-progress":
        return t("inProgress")
      case "not-available":
        return t("notAvailable")
      default:
        return ""
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-5">
          <TabsTrigger value="all">{t("all")}</TabsTrigger>
          {formats.map((format) => (
            <TabsTrigger key={format} value={format.toLowerCase()}>
              {format}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <motion.div className="min-w-max" variants={container} initial="hidden" animate="show">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">{t("topic")}</th>
                      {difficulties.map((difficulty) => (
                        <th key={difficulty} className="text-center p-2">
                          {difficulty}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topics.map((topic, index) => (
                      <motion.tr key={topic} variants={item} className="border-t">
                        <td className="p-2 font-medium">{topic}</td>
                        {difficulties.map((difficulty) => {
                          const status = matrixData[topic][difficulty]
                          return (
                            <td key={`${topic}-${difficulty}`} className="text-center p-2">
                              {status === "available" ? (
                                <Link
                                  href={`/tutorials/${topic.toLowerCase().replace(/\s+/g, "-")}?difficulty=${difficulty.toLowerCase()}`}
                                >
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    {getStatusIcon(status)}
                                    <span className="sr-only">{getStatusLabel(status)}</span>
                                  </Button>
                                </Link>
                              ) : (
                                <div className="flex justify-center">{getStatusIcon(status)}</div>
                              )}
                            </td>
                          )
                        })}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-xs">{t("available")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-xs">{t("inProgress")}</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs">{t("notAvailable")}</span>
              </div>
            </div>
          </Card>
        </TabsContent>
        {formats.map((format) => (
          <TabsContent key={format} value={format.toLowerCase()} className="mt-4">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">
                {format} {t("content")}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topics.slice(0, 6).map((topic) => (
                  <Link
                    key={topic}
                    href={`/tutorials/${topic.toLowerCase().replace(/\s+/g, "-")}?format=${format.toLowerCase()}`}
                  >
                    <Card className="p-4 hover:bg-muted/50 transition-colors">
                      <h4 className="font-medium">{topic}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{format}</Badge>
                        <Badge variant="secondary">Beginner</Badge>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
