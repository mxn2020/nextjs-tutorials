"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { ProfileHeaderSkeleton } from "@/components/skeletons/profile-skeleton"

interface ProfileHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  profile: any
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const t = useTranslations("Profile")
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    return <ProfileHeaderSkeleton />
  }

  const coverImage = profile?.coverImage || "/abstract-banner.png"

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={user.name || "User profile"}
          fill
          className="object-cover"
          priority
        />
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-4 right-4"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          {t("editProfile")}
        </Button>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-end relative">
        <motion.div
          className="absolute -top-16 left-6 rounded-full border-4 border-background"
          whileHover={{ scale: 1.05 }}
        >
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="text-2xl">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="mt-10 md:mt-0 md:ml-24">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="mt-2">{profile?.bio || t("noBio")}</p>
        </div>
      </div>
    </Card>
  )
}
