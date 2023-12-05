import { parseAuthHeader } from '@/middleware'
import { OrderStatus, PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { client } from '../client'
import { createKey } from '../utils'

export async function POST(
  request: Request,
) {
  const headersList = headers()

  const user = await parseAuthHeader(headersList)

  if (!user || !user.isAdmin)  {
    return new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    })
  } else {
    try {
      const key = await createKey()
      return Response.json({
        key
      })

    } catch(e) {
      console.error(e)

      return new Response('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      })
    }
  }



}