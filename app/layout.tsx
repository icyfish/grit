import './globals.css'
import headerNavLinks from "@/data/headerNavLinks"
import siteMetadata from "@/data/siteMetadata"
import Link from '@/components/Link'
import LayoutContainer from '@/components/LayoutContainer'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
// import ThemeSwitch from '@/components/ThemeSwitch'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <LayoutContainer>
          <div className="flex h-screen flex-col justify-between">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </LayoutContainer>
      </body>
    </html>
  )
}

function Header() {
  return <header className="flex items-center justify-between py-10">
    <SiteInfo />
    <HeaderNav />
    {/* <ThemeSwitch /> */}
    <MobileNav />
  </header>
}

function SiteInfo() {
  return <div>
    <Link href="/" aria-label={siteMetadata.headerTitle}>
      <div className="flex items-center justify-between">
        <div className="mr-3">
          {/* <Logo /> */}
        </div>
        {typeof siteMetadata.headerTitle === 'string' ? (
          <div className="hidden h-6 text-2xl font-semibold sm:block">
            {siteMetadata.headerTitle}
          </div>
        ) : (
          siteMetadata.headerTitle
        )}
      </div>
    </Link>
  </div>
}

function HeaderNav() {
  return <div className="flex items-center text-base leading-5">
    <div className="hidden sm:block">
      {headerNavLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
        >
          {link.title}
        </Link>
      ))}
    </div></div>
}