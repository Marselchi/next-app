"use client"

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { authClient } from "@/lib/authclient";



export default function Navbar () {
    const { 
        data: session, 
    } = authClient.useSession()
    return (
        <header className="bg-accent sticky top-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center gap-8 py-7">
            <div className="flex flex-1 justify-center items-center gap-8">
                <Link href="/kudato" className="hover:bg-amber-400">КУДАТО</Link>
                <Link href="/kudato">КУДАТО</Link>
                <Link href="/kudato">КУДАТО</Link>
                <Link href="/kudato">КУДАТО</Link>
                <Link href="/kudato">КУДАТО</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarFallback>{session?.user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <span className="text-sm">Почта: {session?.user.email}</span>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </div>
        </header>
    )
}