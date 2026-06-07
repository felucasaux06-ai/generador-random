'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function EzoicSPA() {
  const pathname = usePathname()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ez = (window as any).ezstandalone
    if (!ez) return
    ez.cmd.push(function () {
      if (ez.initialized) {
        ez.destroyAll()
        ez.showAds()
      } else {
        ez.showAds()
      }
    })
  }, [pathname])

  return null
}
