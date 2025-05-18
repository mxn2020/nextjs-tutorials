"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateUserProfile } from "@/lib/actions/user-actions"

interface ProfileFormProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  profile: any
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const t = useTranslations("Profile.profileForm")
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    name: z.string().min(2, t("nameRequired")),
    bio: z.string().max(160, t("bioTooLong")).optional(),
    location: z.string().max(100, t("locationTooLong")).optional(),
    website: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      website: profile?.website || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await updateUserProfile(user.email as string, values)

      toast({
        title: t("updateSuccess"),
        description: t("profileUpdated"),
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("namePlaceholder")} {...field} />
              </FormControl>
              <FormDescription>{t("nameDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bioLabel")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("bioPlaceholder")} {...field} />
              </FormControl>
              <FormDescription>{t("bioDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("locationLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("locationPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("websiteLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("websitePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
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
