"use client"

import Navbar from "@/components/navigation"

export default function ViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
