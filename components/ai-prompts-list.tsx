"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clipboard, Code, FileQuestion, Wrench } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AIPromptsList() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
      duration: 3000,
    })
  }

  // Mock data for AI prompts
  const prompts = [
    {
      id: "1",
      title: "Debug a Next.js API Route",
      description: "Get help debugging common issues with Next.js API routes",
      category: "debug",
      prompt:
        "I'm building a Next.js API route and getting the following error: [DESCRIBE ERROR]. Here's my code: [PASTE CODE]. Can you help me debug this issue?",
      icon: Wrench,
    },
    {
      id: "2",
      title: "Extend a Server Component",
      description: "Get suggestions for extending a Server Component with additional functionality",
      category: "extend",
      prompt:
        "I have a Next.js Server Component that [DESCRIBE CURRENT FUNCTIONALITY]. I want to extend it to also [DESCRIBE DESIRED FUNCTIONALITY]. Here's my current code: [PASTE CODE]. How can I implement this?",
      icon: Code,
    },
    {
      id: "3",
      title: "Practice Data Fetching Patterns",
      description: "Get exercises to practice different data fetching patterns in Next.js",
      category: "practice",
      prompt:
        "I want to practice data fetching in Next.js. Can you create a practice exercise for me that involves [SPECIFIC PATTERN OR CONCEPT]? Please include requirements and hints.",
      icon: FileQuestion,
    },
    {
      id: "4",
      title: "Optimize Image Loading",
      description: "Get recommendations for optimizing image loading in your Next.js application",
      category: "debug",
      prompt:
        "I'm using Next.js Image component but my images are [DESCRIBE ISSUE - loading slowly/not optimized/etc]. Here's how I'm implementing it: [PASTE CODE]. How can I optimize this?",
      icon: Wrench,
    },
    {
      id: "5",
      title: "Implement Authentication Flow",
      description: "Get guidance on implementing authentication in your Next.js application",
      category: "extend",
      prompt:
        "I want to implement authentication in my Next.js app using [AUTH PROVIDER]. I need to [SPECIFIC REQUIREMENTS]. Can you provide a step-by-step guide or code example?",
      icon: Code,
    },
    {
      id: "6",
      title: "Create a Custom Hook",
      description: "Get help creating a custom React hook for your Next.js application",
      category: "practice",
      prompt:
        "I need to create a custom React hook for [SPECIFIC FUNCTIONALITY] in my Next.js application. The hook should [REQUIREMENTS]. Can you help me implement this?",
      icon: FileQuestion,
    },
  ]

  const filteredPrompts = activeTab === "all" ? prompts : prompts.filter((prompt) => prompt.category === activeTab)

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
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Prompts</TabsTrigger>
          <TabsTrigger value="debug">Debug</TabsTrigger>
          <TabsTrigger value="extend">Extend</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPrompts.map((prompt) => (
              <motion.div key={prompt.id} variants={item}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <prompt.icon className="h-4 w-4 text-primary" />
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {prompt.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{prompt.title}</CardTitle>
                    <CardDescription>{prompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="rounded-md bg-muted p-3 text-sm">
                      <p className="line-clamp-4">{prompt.prompt}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full" onClick={() => handleCopyPrompt(prompt.prompt)}>
                      <Clipboard className="mr-2 h-4 w-4" />
                      Copy Prompt
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
