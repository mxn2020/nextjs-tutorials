import { getDictionary } from "@/lib/i18n/server"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserSettings } from "@/lib/actions/user-actions"
import { SettingsForm } from "@/components/settings-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationSettings } from "@/components/notification-settings"
import { AccountSettings } from "@/components/account-settings"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const dictionary = await getDictionary(locale)
  const settingsDict = dictionary.Settings || { meta: { title: "Settings", description: "Your settings." }, tabs: { general: "General", notifications: "Notifications", account: "Account" }, general: { title: "General Settings", description: "Update your general settings." }, notifications: { title: "Notification Settings", description: "Manage your notifications." }, account: { title: "Account Settings", description: "Manage your account." }, title: "Settings" }
  return {
    title: settingsDict.meta?.title || settingsDict.title,
    description: settingsDict.meta?.description || settingsDict.description,
  }
}

export default async function SettingsPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/auth/signin")
  }
  const dictionary = await getDictionary(params.locale)
  const settingsDict = dictionary.Settings || { tabs: { general: "General", notifications: "Notifications", account: "Account" }, general: { title: "General Settings", description: "Update your general settings." }, notifications: { title: "Notification Settings", description: "Manage your notifications." }, account: { title: "Account Settings", description: "Manage your account." }, title: "Settings" }
  const settings = await getUserSettings(session.user.email as string)
  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-6">{settingsDict.title}</h1>
      <Tabs defaultValue="general" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="general">{settingsDict.tabs.general}</TabsTrigger>
          <TabsTrigger value="notifications">{settingsDict.tabs.notifications}</TabsTrigger>
          <TabsTrigger value="account">{settingsDict.tabs.account}</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{settingsDict.general.title}</CardTitle>
              <CardDescription>{settingsDict.general.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm user={session.user} settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{settingsDict.notifications.title}</CardTitle>
              <CardDescription>{settingsDict.notifications.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings user={session.user} settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{settingsDict.account.title}</CardTitle>
              <CardDescription>{settingsDict.account.description}</CardDescription>
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
