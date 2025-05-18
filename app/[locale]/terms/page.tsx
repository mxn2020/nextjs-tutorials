import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Terms" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function TermsPage() {
  const t = await getTranslations("Terms")

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-muted-foreground mb-10">Last Updated: May 18, 2024</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Next.js Knowledge Library website ("the Website"), you accept and agree to be bound
          by these Terms of Service ("Terms"). If you do not agree to these Terms, you should not use the Website.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide
          at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be
          determined at our sole discretion.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features of the Website, you may be required to register for an account. You agree to
          provide accurate, current, and complete information during the registration process. You are responsible for
          safeguarding your password and for all activities that occur under your account.
        </p>

        <h2>4. User Content</h2>
        <p>
          Our Website allows you to contribute content, including tutorials, code snippets, comments, and other
          materials ("User Content"). You retain all rights to your User Content, but by posting it on our Website, you
          grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish,
          translate, and distribute it.
        </p>
        <p>
          You are solely responsible for your User Content and the consequences of posting it. We reserve the right to
          remove any User Content that violates these Terms or that we find objectionable for any reason.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          The Website and its original content (excluding User Content) are and will remain the exclusive property of
          Next.js Knowledge Library and its licensors. The Website is protected by copyright, trademark, and other laws
          of both the United States and foreign countries.
        </p>

        <h2>6. Links to Other Websites</h2>
        <p>
          Our Website may contain links to third-party websites that are not owned or controlled by us. We have no
          control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party
          websites.
        </p>

        <h2>7. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Website immediately, without prior notice or
          liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach
          the Terms.
        </p>

        <h2>8. Disclaimer of Warranties</h2>
        <p>
          The Website is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied,
          regarding the operation or availability of the Website.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          In no event shall Next.js Knowledge Library be liable for any indirect, incidental, special, consequential, or
          punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
          losses.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the United States, without respect to its conflict of laws
          principles.
        </p>

        <h2>11. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>Email: terms@next-js-knowledge-library.com</p>
      </div>
    </div>
  )
}
