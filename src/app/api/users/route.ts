import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
) {
  // Gets users by username
  const { searchParams } = new URL(request.url)

  const username = searchParams.get('username') || ''
  const account = searchParams.get('account') || ''

  if (username || account) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{
          username,
        }, {
          account,
        }]
      }
    })

    if (!user) {
      return new Response('Unauthorized', {
        status: 401,
        statusText: 'Unauthorized',
      })
    }

    return Response.json({
      user
    })
  }

  // Gets all users
  const users = await prisma.user.findMany()

  return Response.json({
    users
  })
}