"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function AIPromptsIntro() {
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
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            AI Prompts for Next.js Development
          </motion.h1>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Enhance your learning experience with our curated collection of AI prompts designed to help you debug,
            extend, and practice Next.js concepts.
          </motion.p>
          <motion.div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button size="lg">Browse Prompts</Button>
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
