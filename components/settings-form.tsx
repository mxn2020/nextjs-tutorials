"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { updateUserSettings } from "@/lib/actions/user-actions"

interface SettingsFormProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  settings: any
}

export function SettingsForm({ user, settings }: SettingsFormProps) {
  const t = useTranslations("Settings.general")
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    language: z.string(),
    theme: z.string(),
    autoplayVideos: z.boolean().default(false),
    showCodeLineNumbers: z.boolean().default(true),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: settings?.language || "en",
      theme: settings?.theme || "system",
      autoplayVideos: settings?.autoplayVideos || false,
      showCodeLineNumbers: settings?.showCodeLineNumbers !== false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await updateUserSettings(user.email as string, values)

      toast({
        title: t("updateSuccess"),
        description: t("settingsUpdated"),
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t("updateError"),
        description: t("errorOccurred"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("languageLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectLanguage")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="nl">Nederlands</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="el">Ελληνικά</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>{t("languageDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("themeLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectTheme")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">{t("lightTheme")}</SelectItem>
                  <SelectItem value="dark">{t("darkTheme")}</SelectItem>
                  <SelectItem value="system">{t("systemTheme")}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>{t("themeDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoplayVideos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">{t("autoplayVideosLabel")}</FormLabel>
                <FormDescription>{t("autoplayVideosDescription")}</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="showCodeLineNumbers"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">{t("showCodeLineNumbersLabel")}</FormLabel>
                <FormDescription>{t("showCodeLineNumbersDescription")}</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("saving") : t("saveChanges")}
        </Button>
      </form>
    </Form>
  )
}
