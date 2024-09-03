import { NextResponse } from 'next/server';

export function middleware(request) {
	// console.log(request);

	// return NextResponse.redirect()
	return NextResponse.next();
}

export const config = {
	matcher: '/news' // run middleware only for matched routes
};
