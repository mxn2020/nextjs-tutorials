import { getDictionary } from "@/lib/i18n/server"
import type { Metadata } from "next"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  const privacyDict = dictionary.Privacy || { title: "Privacy Policy", description: "Read our privacy policy." }
  return {
    title: privacyDict.title,
    description: privacyDict.description,
  }
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale)
  const privacyDict = dictionary.Privacy || { title: "Privacy Policy", description: "Read our privacy policy." }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{privacyDict.title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-muted-foreground mb-10">Effective Date: May 18, 2024</p>

        <h2>Introduction</h2>
        <p>
          At Next.js Knowledge Library, we respect your privacy and are committed to protecting your personal data. This
          privacy policy will inform you about how we look after your personal data when you visit our website and tell
          you about your privacy rights and how the law protects you.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            <strong>Account Information:</strong> When you create an account, we collect your name, email address, and
            password.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our website, including pages visited and time
            spent on each page.
          </li>
          <li>
            <strong>Preferences:</strong> Your language preferences, bookmarked content, and other customization
            options.
          </li>
          <li>
            <strong>Contributions:</strong> If you contribute content to our platform, we collect that content and
            associate it with your account.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Personalize your experience</li>
          <li>Send you updates about new content that might interest you</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        </ul>

        <h2>Cookies</h2>
        <p>We use cookies and similar technologies to provide and improve our services, including:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for the operation of our website
          </li>
          <li>
            <strong>Analytical Cookies:</strong> Allow us to recognize and count visitors and see how they move around
            our website
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Used to recognize you when you return to our website
          </li>
        </ul>
        <p>
          You can set your browser to refuse all or some browser cookies. If you do this, some parts of the website may
          not function properly.
        </p>

        <h2>Data Security</h2>
        <p>
          We have implemented appropriate security measures to protect your personal data from being accidentally lost,
          used, or accessed in an unauthorized way. We limit access to your personal data to those employees and third
          parties who have a business need to know.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Withdraw consent</li>
        </ul>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new
          privacy policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
        <p>Email: privacy@next-js-knowledge-library.com</p>
      </div>
    </div>
  )
}
