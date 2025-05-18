// app/[locale]/page.tsx (or any other page)
import { getDictionary } from "@/lib/i18n/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  // Ensure your dictionary has a 'home' section or adjust accordingly
  const homeDictionary = dictionary.Home || {
    title: "Welcome",
    welcome: "Explore Our Content",
    description: "Find amazing articles and tutorials here."
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{homeDictionary.title}</h1>
        <p className="text-xl text-muted-foreground">{homeDictionary.welcome}</p>
      </div>
      <div className="max-w-[600px] text-muted-foreground">
        <p>{homeDictionary.description}</p>
      </div>
    </div>
  );
}