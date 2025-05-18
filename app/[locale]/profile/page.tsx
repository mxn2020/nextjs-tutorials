import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserProfile } from "@/lib/actions/user-actions"
import { ProfileForm } from "@/components/profile-form"
import { ProfileHeader } from "@/components/profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityFeed } from "@/components/activity-feed"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Profile" })

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations("Profile")

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const profile = await getUserProfile(session.user.email as string)

  return (
    <div className="container max-w-6xl py-8">
      <ProfileHeader user={session.user} profile={profile} />

      <Tabs defaultValue="profile" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">{t("tabs.profile")}</TabsTrigger>
          <TabsTrigger value="activity">{t("tabs.activity")}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t("profileForm.title")}</CardTitle>
              <CardDescription>{t("profileForm.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={session.user} profile={profile} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>{t("activity.title")}</CardTitle>
              <CardDescription>{t("activity.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed userId={session.user.email as string} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
