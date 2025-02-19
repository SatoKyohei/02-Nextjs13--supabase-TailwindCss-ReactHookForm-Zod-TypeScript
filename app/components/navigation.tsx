'use client'

import Link from "next/link"
import Image from "next/image"
import { Session } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/lib/database.types"
import useStore from "@/store"
import { useEffect } from "react"

type ProfileType = Database['public']['Tables']['profiles']['Row']


// ナビゲーション
const Navigation = ({
    session,
    profile
}: {
    session: Session | null
    profile: ProfileType | null
}) => {
    const { setUser } = useStore()
    useEffect(() => {
        setUser({
            id: session ? session.user.id : '',
            email: session ? session.user.email! : '',
            name: session && profile ? profile.name : '',
            introduce: session && profile ? profile.introduce : '',
            avatar_url: session && profile ? profile.avatar_url : '',
        })
    }, [session, setUser, profile])

    return (
        <header className="shadow-lg shadow-gray-100">
            <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
                <Link href={"/"} className="font-bold text-xl cursor-pointer">FullStackChannel</Link>

                <div className="text-sm font-bold">
                    {session ? (
                        <div className="flex items-center space-x-5">
                            <Link href={"/settings/profile"}>
                                <div className="relative w-10 h-10">
                                    <Image 
                                        src={profile && profile.avatar_url ? profile.avatar_url : '/default.png'}
                                        className="rounded-full object-cover"
                                        alt="avatar"
                                        fill
                                    />
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-5">
                            <Link href={"/auth/login"}>ログイン</Link>
                            <Link href={"/auth/signup"}>サインアップ</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navigation
