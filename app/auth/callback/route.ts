import { createMiddlewareClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
import { Database } from '@/lib/database.types';

export async function GET(request: NextRequest) {
    // URL取得
    const requestUrl = new URL(request.url)

    // 認証コード取得
    const code = requestUrl.searchParams.get('code')
    
    if (code) {
        // Supabaseのクライアントインスタンスを作成
        const supabase = createRouteHandlerClient<Database>({ cookies })

        // 認証コードをセッショントークンに交換
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)
}
