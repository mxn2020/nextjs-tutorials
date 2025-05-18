import Link from "next/link"

interface NavigationProps {
  locale: string
  dictionary: {
    home: string
    profile: string
    about: string
  }
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  return (
    <nav className="flex gap-4">
      <Link href={`/${locale}`} className="text-sm font-medium hover:underline underline-offset-4">
        home
      </Link>
      <Link href={`/${locale}/profile`} className="text-sm font-medium hover:underline underline-offset-4">
        profile
      </Link>
      <Link href={`/${locale}/about`} className="text-sm font-medium hover:underline underline-offset-4">
        about
      </Link>
    </nav>
  )
}
