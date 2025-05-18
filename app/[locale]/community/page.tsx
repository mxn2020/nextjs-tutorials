import { getDictionary } from "@/lib/i18n/server"
import type { Metadata } from "next"
import Image from "next/image"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  const communityDict = dictionary.Community || { title: "Community", description: "Join our community." }
  return {
    title: communityDict.title,
    description: communityDict.description,
  }
}

export default async function CommunityPage({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale)
  const communityDict = dictionary.Community || { title: "Community", description: "Join our community." }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{communityDict.title}</h1>
      <p className="text-xl text-muted-foreground mb-10">{communityDict.description}</p>

      <div className="grid grid-cols-1 gap-10">
        <section>
          <h2 className="text-3xl font-semibold mb-4">Join the Conversation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://github.com/nextjs-knowledge-library"
              target="_blank"
              rel="noreferrer"
              className="border rounded-lg p-6 bg-card hover:bg-accent transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-2">GitHub</h3>
              <p className="text-muted-foreground">
                Contribute to the project, report issues, or suggest improvements.
              </p>
            </a>
            <a
              href="https://discord.gg/nextjs"
              target="_blank"
              rel="noreferrer"
              className="border rounded-lg p-6 bg-card hover:bg-accent transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-2">Discord</h3>
              <p className="text-muted-foreground">
                Join our Discord server to chat with other members of the community.
              </p>
            </a>
            <a
              href="https://twitter.com/nextjs_knowledge"
              target="_blank"
              rel="noreferrer"
              className="border rounded-lg p-6 bg-card hover:bg-accent transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-2">Twitter</h3>
              <p className="text-muted-foreground">Follow us on Twitter for the latest updates and announcements.</p>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Top Contributors</h2>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Image
                  src={`/diverse-group-avatars.png?height=80&width=80&query=avatar ${i}`}
                  alt={`Contributor ${i}`}
                  width={80}
                  height={80}
                  className="rounded-full mb-2"
                />
                <p className="font-medium">Contributor {i}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">How to Contribute</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>We welcome contributions from everyone! Here's how you can help:</p>
            <ul>
              <li>Report bugs and suggest features</li>
              <li>Contribute code by submitting pull requests</li>
              <li>Improve documentation</li>
              <li>Share your knowledge by creating tutorials</li>
              <li>Translate content to other languages</li>
            </ul>
            <p>
              Check out our <a href="/en/contribute">contribution guidelines</a> to get started.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
