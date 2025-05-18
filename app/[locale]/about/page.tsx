import { getDictionary } from "@/lib/i18n/server"
import type { Metadata } from "next"
import Image from "next/image"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  const aboutDict = dictionary.About || { title: "About", description: "About this project." }
  return {
    title: aboutDict.title,
    description: aboutDict.description,
  }
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale)
  const aboutDict = dictionary.About || { title: "About", description: "About this project." }
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{aboutDict.title}</h1>
      <p className="text-xl text-muted-foreground mb-10">{aboutDict.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Next.js Knowledge Library aims to be the most comprehensive and accessible resource for learning
              Next.js. Our mission is to help developers of all skill levels build better web applications by providing
              high-quality tutorials, references, and examples.
            </p>
            <p>We believe in the power of community-driven knowledge sharing. That's why our content is:</p>
            <ul>
              <li>
                <strong>Open Source:</strong> All of our content is available on GitHub.
              </li>
              <li>
                <strong>Multilingual:</strong> We strive to make our content accessible in multiple languages.
              </li>
              <li>
                <strong>Comprehensive:</strong> From beginner tutorials to advanced guides.
              </li>
              <li>
                <strong>Up-to-date:</strong> We keep our content updated with the latest Next.js features.
              </li>
            </ul>
            <p>
              Whether you're just getting started with Next.js or you're an experienced developer looking for advanced
              techniques, the Next.js Knowledge Library has something for you.
            </p>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/nextjs-team-collaboration.png"
              alt="Team collaborating"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">The Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="text-center">
              <div className="rounded-full overflow-hidden mb-3 mx-auto w-32 h-32">
                <Image
                  src={`/diverse-group.png?height=128&width=128&query=person ${i}`}
                  alt={`Team Member ${i}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Team Member {i}</h3>
              <p className="text-muted-foreground">Role {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
