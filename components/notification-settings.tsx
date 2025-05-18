"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { updateNotificationSettings } from "@/lib/actions/user-actions"

interface NotificationSettingsProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  settings: any
}

export function NotificationSettings({ user, settings }: NotificationSettingsProps) {
  const t = useTranslations("Settings.notifications")
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    emailNotifications: z.boolean().default(true),
    newContent: z.boolean().default(true),
    contentUpdates: z.boolean().default(true),
    comments: z.boolean().default(true),
    mentions: z.boolean().default(true),
    newsletter: z.boolean().default(true),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailNotifications: settings?.notifications?.emailNotifications !== false,
      newContent: settings?.notifications?.newContent !== false,
      contentUpdates: settings?.notifications?.contentUpdates !== false,
      comments: settings?.notifications?.comments !== false,
      mentions: settings?.notifications?.mentions !== false,
      newsletter: settings?.notifications?.newsletter !== false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await updateNotificationSettings(user.email as string, values)

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
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-medium">{t("emailNotificationsLabel")}</FormLabel>
                <FormDescription>{t("emailNotificationsDescription")}</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="ml-6 space-y-4">
          <FormField
            control={form.control}
            name="newContent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>{t("newContentLabel")}</FormLabel>
                  <FormDescription>{t("newContentDescription")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!form.watch("emailNotifications")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentUpdates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>{t("contentUpdatesLabel")}</FormLabel>
                  <FormDescription>{t("contentUpdatesDescription")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!form.watch("emailNotifications")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>{t("commentsLabel")}</FormLabel>
                  <FormDescription>{t("commentsDescription")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!form.watch("emailNotifications")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mentions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>{t("mentionsLabel")}</FormLabel>
                  <FormDescription>{t("mentionsDescription")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!form.watch("emailNotifications")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-medium">{t("newsletterLabel")}</FormLabel>
                <FormDescription>{t("newsletterDescription")}</FormDescription>
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
