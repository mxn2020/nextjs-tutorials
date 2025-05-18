"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Github, Twitter } from "lucide-react"

export function SiteFooter() {
  const t = useTranslations("Footer")

  return (
    <footer className="border-t py-6 md:py-0 flex justify-center items-center">
      <div className="container max-w-2xl mx-auto bg-background rounded-lg shadow p-6 flex flex-col items-center justify-center gap-4 md:h-24">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/nextjs-knowledge-library"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/nextjs_knowledge"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <nav className="flex gap-4 text-sm justify-center">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              {t("terms")}
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground">
              {t("contact")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
