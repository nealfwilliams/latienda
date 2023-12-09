import { client } from '@/utils/client'
import { verifyUser } from '@/utils/verifyUser'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  const account = request.query['account'] as string

  if (account) {
    const user = await prisma.user.findFirst({
      where: {
        account,
      }
    })

    if (!user) {
      response.status(401).json({
        status: 401,
        statusText: 'Unauthorized',
      })
    }

    response.status(200).json({ user })
  }

  response.status(400).json({
    status: 400,
    statusText: 'Bad Request',
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await GET(req, res)
  }
}