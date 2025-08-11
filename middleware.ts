import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { isAuthenticated } = getKindeServerSession();
    
    if(!await isAuthenticated()) {
       // Get the current URL to use as the redirect URL
       const currentUrl = request.nextUrl.origin + request.nextUrl.pathname;
       const loginUrl = new URL('/api/auth/login', request.url);
       loginUrl.searchParams.set('post_login_redirect_url', currentUrl);
       
       return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.next();
}
 
export const config = {
  matcher: ['/dashboard/:path*'],
}