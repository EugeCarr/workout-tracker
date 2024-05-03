"use server"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
 
// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest): NextResponse =>  {
    const currentPath = request.nextUrl.pathname;
    if(currentPath.startsWith("/_next")) return NextResponse.next();

    const refreshToken: (RequestCookie| undefined)  = cookies().get("refreshToken");    
    if(request.nextUrl.pathname.startsWith("/api")){
        return NextResponse.next()
    }
    if(request.nextUrl.pathname === "/signup"){
        return NextResponse.next()
    } else if(request.nextUrl.pathname !== "/login"){
        if( !refreshToken?.value){
            return NextResponse.redirect(new URL('/login', request.url));    
        }

    } else{
        if( refreshToken?.value){
            
            return NextResponse.redirect(new URL('/', request.url));
    
        }
        
    }

    return NextResponse.next()

  
};
