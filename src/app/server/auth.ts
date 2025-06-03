// import { Environments, Languages, Pages, Routes, UserRole } from "@/constants/enums";
// import { LanguageType } from "@/i18n.config";
// import { DefaultSession, User, type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { db } from "@/lib/prisma";
// import { login } from "./_actions/auth";
// import { JWT } from "next-auth/jwt";

// /* =====================
//    Module Declarations
// ===================== */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: User & {
//       id?: string;
//       name?: string;
//       email?: string;
//       role?: UserRole;
//       image?: string;
//       phone?: string;
//       country?: string;
//       city?: string;
//       postalCode?: string;
//       streetAddress?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends Partial<User> {
//     id: string;
//     name: string;
//     email: string;
//     role: UserRole;
//   }
// }

// /* =====================
//    Auth Options
// ===================== */
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@email.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials, req) {
//         if (!credentials) throw new Error("No credentials provided");

//         const response = await login(credentials, Languages.ENGLISH as LanguageType);

//         if (response.status === 200 && response.user) {
//           return response.user;
//         }

//         throw new Error(
//           JSON.stringify({
//             validationError: response.error,
//             responseError: response.message,
//           })
//         );
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token }) {
//       if (!token.email) return token;

//       const user = await db.user.findUnique({
//         where: { email: token.email },
//       });

//       if (!user) return token;

//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role as UserRole,
//         image: user.image,
//         phone: user.phone,
//         country: user.country,
//         city: user.city,
//         postalCode: user.postalCode,
//         streetAddress: user.streetAddress,
//       };
//     },
//     session({ session, token }) {
//       if (token) {
//         session.user = {
//           ...session.user,
//           id: token.id,
//           name: token.name,
//           email: token.email,
//           role: token.role,
//           image: token.image as string,
//           phone: token.phone as string,
//           country: token.country as string,
//           city: token.city as string,
//           postalCode: token.postalCode as string,
//           streetAddress: token.streetAddress as string,
//         };
//       }
//       return session;
//     },
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 7 * 24 * 60 * 60, // 7 days
//     updateAge: 24 * 60 * 60, // 1 day
//   },
//   pages: {
//     signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === Environments.DEV,
// };


// src/app/server/auth.ts
import { Environments, Languages, Pages, Routes, UserRole } from "@/constants/enums";
import { LanguageType } from "@/i18n.config";
import { DefaultSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { JWT } from "next-auth/jwt";

// Module Declarations for Type Safety
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      image?: string | null;
      phone?: string | null;
      country?: string | null;
      city?: string | null;
      postalCode?: string | null;
      streetAddress?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    image?: string | null;
    phone?: string | null;
    country?: string | null;
    city?: string | null;
    postalCode?: string | null;
    streetAddress?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    image?: string | null;
    phone?: string | null;
    country?: string | null;
    city?: string | null;
    postalCode?: string | null;
    streetAddress?: string | null;
  }
}

// NextAuth.js Configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db), // Use Prisma with Neon
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        const response = await login(credentials, Languages.ENGLISH as LanguageType);

        if (response.status === 200 && response.user) {
          return {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role as UserRole,
            image: undefined,
            phone: undefined,
            country: undefined,
            city: undefined,
            postalCode: undefined,
            streetAddress: undefined,
          };
        }

        throw new Error(
          JSON.stringify({
            validationError: response.error,
            responseError: response.message,
          })
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Initial sign in
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          phone: user.phone,
          country: user.country,
          city: user.city,
          postalCode: user.postalCode,
          streetAddress: user.streetAddress,
        } as JWT;
      }

      // Return previous token if the user data has not changed
      if (!token.email) return token;

      // Fetch fresh user data
      const dbUser = await db.user.findUnique({
        where: { email: token.email },
      });

      if (!dbUser) return token;

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
        phone: dbUser.phone,
        country: dbUser.country,
        city: dbUser.city,
        postalCode: dbUser.postalCode,
        streetAddress: dbUser.streetAddress,
      } as JWT;
    },
    session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
          phone: token.phone,
          country: token.country,
          city: token.city,
          postalCode: token.postalCode,
          streetAddress: token.streetAddress,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.DEV,
};