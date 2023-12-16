import { SIGN_IN_MESSAGE } from '@/constants';
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const fields = await request.body

  const account = fields.account
  const signature = fields.signature

  const recoveredAccount = await recoverPersonalSignature({
    data: SIGN_IN_MESSAGE,
    signature,
  })

  if (account !== recoveredAccount) {
    response.status(401).json({
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  // if user exists, return error
  const user = await prisma.user.findFirst({
    where: {
      account: fields.account,
    }
  })

  if (user) {
    response.status(200).json({
      user: {
        username: user.username,
        account: user.account
      }
    })

  } else {
    await prisma.user.create({
      data: {
        account,
        isAdmin: false,
        username: 'temp-username'
      }
    })

    response.status(200).json({
      user: {
        username: 'temp-username',
        account
      }
    })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await POST(req, res)
  }
}