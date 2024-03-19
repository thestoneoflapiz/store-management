import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import { adminAccess, staffAccess } from './helpers/auth';

export async function middleware(req: any) {
  const session = await getToken({ req });

  const rawPathname = req.nextUrl?.pathname;
  const splitPathname = rawPathname.split("/");
    let pathname = "";
  if( splitPathname.length > 3 ){
    const removedPathname = splitPathname.slice(0,3);
    pathname = removedPathname.join("/");
  }else{
    pathname = splitPathname.join("/");
  }

  const user: any = session?.user ?? {};
  if(session && user){
    switch (user?.role) {
      case "admin":
        if(adminAccess.includes(pathname)){
          return;
        }else{
          return NextResponse.json({ message: 'ADMIN have no access here' }, { status: 404 })
        }
      break;

      case "staff":
        if(staffAccess.includes(pathname)){
          return;
        }else{
          return NextResponse.json({ message: 'STAFF have no access here' }, { status: 404 })
        }
      break;
    }

    return;
  } 
  
  return NextResponse.redirect(new URL('/', req.url))
  return;
}
 
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}