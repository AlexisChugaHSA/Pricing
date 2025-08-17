import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes/*
   matcher: [/*
    '/',
    '/executive',
    '/financial',
    '/analytics',
    '/logistics/:path*',

    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',*/
 
  ],
};
//    '/ecommerce/:path*',    '/forms/profile-settings/:path*',