"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, FileText, BookOpen, Code } from "lucide-react"
import Link from "next/link"

export function ContributionGuide() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-muted p-2 mb-4">
            <Github className="h-6 w-6 text-primary" />
          </div>
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Contribute to the Knowledge Library
          </motion.h1>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join our community of contributors and help build the most comprehensive Next.js learning resource.
          </motion.p>
          <motion.div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button size="lg" asChild>
              <Link href="https://github.com/nextjs-knowledge-library" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repository
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <FileText className="mr-2 h-4 w-4" />
              Contribution Guidelines
            </Button>
          </motion.div>
        </motion.div>

        <div className="mx-auto max-w-4xl mt-16">
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contributing Content</CardTitle>
                  <CardDescription>Help us expand our library of tutorials, guides, and explanations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Content Types</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Step-by-step tutorials</li>
                        <li>Conceptual explanations</li>
                        <li>API references</li>
                        <li>Code snippets</li>
                        <li>Video transcripts</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Content Format</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>MDX with frontmatter</li>
                        <li>GitHub-based workflow</li>
                        <li>Multiple language versions</li>
                        <li>Embedded code examples</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/contribute/content">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Contributing Content
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="code" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contributing Code</CardTitle>
                  <CardDescription>Help improve the platform's features and functionality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Code Areas</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Frontend components</li>
                        <li>Backend API routes</li>
                        <li>Database models</li>
                        <li>Authentication flows</li>
                        <li>Testing and CI/CD</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Development Process</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Fork the repository</li>
                        <li>Create a feature branch</li>
                        <li>Submit a pull request</li>
                        <li>Code review process</li>
                        <li>Merge and deployment</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/contribute/code">
                      <Code className="mr-2 h-4 w-4" />
                      Start Contributing Code
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="prompts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contributing AI Prompts</CardTitle>
                  <CardDescription>Help create effective AI prompts for Next.js learning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Prompt Categories</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Debugging assistance</li>
                        <li>Feature extension</li>
                        <li>Practice exercises</li>
                        <li>Concept explanation</li>
                        <li>Code generation</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Prompt Structure</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Clear intent and context</li>
                        <li>Specific input format</li>
                        <li>Expected output format</li>
                        <li>Versioning for AI models</li>
                        <li>Multiple language versions</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/contribute/prompts">
                      <Github className="mr-2 h-4 w-4" />
                      Start Contributing Prompts
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
