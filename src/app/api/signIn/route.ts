import { SIGN_IN_MESSAGE } from '@/constants';
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { PrismaClient } from '@prisma/client'
import { JsonResponse } from '../utils';

const prisma = new PrismaClient()

export async function POST(
  request: Request,
) {
  const fields = await request.json()

  const account = fields.account
  const signature = fields.signature

  const recoveredAccount = await recoverPersonalSignature({
    data: SIGN_IN_MESSAGE,
    signature,
  })

  if (account !== recoveredAccount) {
    return new Response('Unauthorized', {
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
    return JsonResponse({
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

    return JsonResponse({
      user: {
        username: 'temp-username',
        account
      }
    })
  }
}