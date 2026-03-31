import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";


const dataRoutes = [
	{
		route: '/dashboard',
		subRoutes: ['/rooms','/reports','/extras']
	}
]


export const protectedRoutes:string[] = [];

for (const { route, subRoutes } of dataRoutes) {
  for (const subRoute of subRoutes) {
    protectedRoutes.push(route + subRoute);
  }
}

export async function proxy(request: NextRequest) {
		const proxyHeaders = await headers()
		const session = await auth.api.getSession({
			headers: proxyHeaders
		})
		
		if(!session) return NextResponse.redirect(new URL("/login", request.url));
		
		const { user } = session
		
		if( user.role === 'user'){
			const { pathname } = request.nextUrl
			const accessUser = protectedRoutes.some( route => pathname.startsWith(route))

			if(accessUser) return NextResponse.redirect(new URL('/dashboard',request.url))
		}
		
		return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'], 
};