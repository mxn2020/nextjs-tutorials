import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserSettings } from "@/lib/actions/user-actions"
import { SettingsForm } from "@/components/settings-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationSettings } from "@/components/notification-settings"
import { AccountSettings } from "@/components/account-settings"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Settings" })

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  }
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations("Settings")

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const settings = await getUserSettings(session.user.email as string)

  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <Tabs defaultValue="general" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="general">{t("tabs.general")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("tabs.notifications")}</TabsTrigger>
          <TabsTrigger value="account">{t("tabs.account")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t("general.title")}</CardTitle>
              <CardDescription>{t("general.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm user={session.user} settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("notifications.title")}</CardTitle>
              <CardDescription>{t("notifications.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings user={session.user} settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{t("account.title")}</CardTitle>
              <CardDescription>{t("account.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountSettings user={session.user} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
