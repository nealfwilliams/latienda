import { NextRequest } from "next/server";
import { headers } from 'next/headers'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { client } from "./app/api/client";

const authRequiredRoutes = [
  '/api/auth/login',
]

const JWT_SECRET = process.env.JWT_SECRET!

export const parseAuthHeader = async (headersList: {
  get(key: string): string | null
}): Promise<User | null> => {
  const authHeader = headersList.get('Authorization')
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'string' || !decoded.userId) {
      return null
    }

    if (!('userId' in decoded)) {
      return null
    }

    try {
      const user = await client.user.findUniqueOrThrow({
        where: {
          id: decoded.userId
        }
      })

      return user
    } catch (e) {
      return null
    }
  }


  return null
}

export const middleware = async (request: NextRequest) => {
  const authRequired = authRequiredRoutes.includes(request.nextUrl.pathname)

  if (authRequired) {
    const headersList = headers()
    const user = await parseAuthHeader(headersList)

    if (!user) {
      return new Response('Unauthorized', {
        status: 401,
        statusText: 'Unauthorized',
      })
    }
  }
}