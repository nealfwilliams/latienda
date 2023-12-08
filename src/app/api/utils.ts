import { headers } from "next/headers"
import { client } from "./client"
import crypto from 'crypto'
import { recoverPersonalSignature } from "@metamask/eth-sig-util"
import { SIGN_IN_MESSAGE } from "@/constants"

export const JsonResponse = (data: any) => {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const verifyRequest = async () => {
  const headersList = headers()

  const account = headersList.get('x-account')
  const signature = headersList.get('x-signature')
  console.log(Array.from(headersList.keys()), account, signature)


  if (!account || !signature) {
    return false
  }

  const recoveredAccount = await recoverPersonalSignature({
    data: SIGN_IN_MESSAGE,
    signature,
  })

  if (account !== recoveredAccount) {
    return false
  }

  const user = await client.user.findFirst({
    where: {
      account
    }
  })

  return user
}


// Creates a signed hash of key using secret key 
export const hashKey = (key: string) => {
  const secret = process.env.SECRET_KEY!
  const hash = crypto.createHmac('sha256', secret)
    .update(key)
    .digest('hex')
  return hash
}

export const createKey = async () => {
  // Randomly generate a key in hex format
  const key = crypto.randomBytes(32).toString('hex')

  // store hash in database
  const hash = hashKey(key)
  await client.authKey.create({
    data: {
      hash
    }
  })

  return key
}

export const checkKey = async (key: string) => {
  const hash = hashKey(key)
  try {
    await client.authKey.findFirstOrThrow({
      where: {
        hash
      }
    })

    return true
  } catch (e) {
    return false
  }
}
