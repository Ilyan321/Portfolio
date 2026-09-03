import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Intercept aegis.ilyankhan.tech
  if (hostname.includes('aegis.ilyankhan.tech')) {
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    if (userAgent.includes('curl') || userAgent.includes('wget')) {
      return NextResponse.redirect('https://raw.githubusercontent.com/Ilyan321/aegis-cli/main/install.sh', 302);
    }
    // For browsers: return 404 - DO NOT SHOW PORTFOLIO
    return new NextResponse('404 Not Found', {
      status: 404,
      headers: { 'content-type': 'text/plain' },
    });
  }

  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('sb-access-token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Cryptographically verify the session token
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        const loginUrl = new URL('/admin/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('sb-access-token');
        response.cookies.delete('sb-refresh-token');
        return response;
      }
    } else {
      // Fail closed if environment variables are missing
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
