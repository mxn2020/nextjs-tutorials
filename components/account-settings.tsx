"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { AlertTriangle, Download, LogOut, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "next-auth/react"
import { deleteUserAccount, exportUserData } from "@/lib/actions/user-actions"

interface AccountSettingsProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const t = useTranslations("Settings.account")
  const router = useRouter()
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleExportData = async () => {
    setIsExporting(true)

    try {
      const data = await exportUserData(user.email as string)

      // Create a download link for the JSON data
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `nextjs-knowledge-library-data-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: t("exportSuccess"),
        description: t("dataExported"),
      })
    } catch (error) {
      toast({
        title: t("exportError"),
        description: t("errorExporting"),
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirmEmail !== user.email) {
      toast({
        title: t("emailMismatch"),
        description: t("emailMismatchDescription"),
        variant: "destructive",
      })
      return
    }

    setIsDeleting(true)

    try {
      await deleteUserAccount(user.email as string)

      toast({
        title: t("accountDeleted"),
        description: t("accountDeletedDescription"),
      })

      await signOut({ callbackUrl: "/" })
    } catch (error) {
      toast({
        title: t("deleteError"),
        description: t("errorDeleting"),
        variant: "destructive",
      })
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("exportDataTitle")}</CardTitle>
          <CardDescription>{t("exportDataDescription")}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleExportData} disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? t("exporting") : t("exportData")}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("signOutTitle")}</CardTitle>
          <CardDescription>{t("signOutDescription")}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            {t("signOut")}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">{t("dangerZoneTitle")}</CardTitle>
          <CardDescription>{t("dangerZoneDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t("deleteAccountWarningTitle")}</AlertTitle>
            <AlertDescription>{t("deleteAccountWarningDescription")}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("deleteAccount")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("confirmDeleteTitle")}</DialogTitle>
                <DialogDescription>{t("confirmDeleteDescription")}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">{t("typeEmailToConfirm", { email: user.email })}</p>
                <div className="space-y-2">
                  <Label htmlFor="confirm-email">{t("emailLabel")}</Label>
                  <Input
                    id="confirm-email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder={user.email || ""}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  {t("cancel")}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || confirmEmail !== user.email}
                >
                  {isDeleting ? t("deleting") : t("confirmDelete")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
