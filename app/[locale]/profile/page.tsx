import { getDictionary } from "@/lib/i18n/server"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserProfile } from "@/lib/actions/user-actions"
import { ProfileForm } from "@/components/profile-form"
import { ProfileHeader } from "@/components/profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityFeed } from "@/components/activity-feed"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const dictionary = await getDictionary(locale)
  const profileDict = dictionary.Profile || { meta: { title: "Profile", description: "Your profile." }, tabs: { profile: "Profile", activity: "Activity" }, profileForm: { title: "Edit Profile", description: "Update your profile info." }, activity: { title: "Activity", description: "Your recent activity." }, title: "Profile" }
  return {
    title: profileDict.meta?.title || profileDict.title,
    description: profileDict.meta?.description || profileDict.description,
  }
}

export default async function ProfilePage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/auth/signin")
  }
  const dictionary = await getDictionary(params.locale)
  const profileDict = dictionary.Profile || { tabs: { profile: "Profile", activity: "Activity" }, profileForm: { title: "Edit Profile", description: "Update your profile info." }, activity: { title: "Activity", description: "Your recent activity." }, title: "Profile" }
  const profile = await getUserProfile(session.user.email as string)
  return (
    <div className="container max-w-6xl py-8">
      <ProfileHeader user={session.user} profile={profile} />
      <Tabs defaultValue="profile" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">{profileDict.tabs.profile}</TabsTrigger>
          <TabsTrigger value="activity">{profileDict.tabs.activity}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{profileDict.profileForm.title}</CardTitle>
              <CardDescription>{profileDict.profileForm.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={session.user} profile={profile} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>{profileDict.activity.title}</CardTitle>
              <CardDescription>{profileDict.activity.description}</CardDescription>
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
