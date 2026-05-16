'use client'

import DesktopLayout from '@/components/desktop/DesktopLayout'
import MobileLayout from '@/components/mobile/MobileLayout'

export default function Home() {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:block">
        <DesktopLayout />
      </div>

      {/* MOBILE */}
      <div className="block lg:hidden">
        <MobileLayout />
      </div>
    </>
  )
}