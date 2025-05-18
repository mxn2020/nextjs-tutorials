"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("Hero")
  const [email, setEmail] = useState("")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="flex flex-col justify-center space-y-4" variants={item}>
            <div className="space-y-2">
              <motion.h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none" variants={item}>
                {t("title")}
              </motion.h1>
              <motion.p className="max-w-[600px] text-muted-foreground md:text-xl" variants={item}>
                {t("description")}
              </motion.p>
            </div>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={item}>
              <Button asChild size="lg">
                <Link href="/tutorials">{t("browseButton")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contribute">{t("contributeButton")}</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg shadow-lg"
            variants={item}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{t("newsletterTitle")}</h2>
              <p className="text-sm text-muted-foreground">{t("newsletterDescription")}</p>
            </div>
            <div className="space-y-2">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {t("subscribeButton")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("privacyNotice")}{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                {t("privacyLink")}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
