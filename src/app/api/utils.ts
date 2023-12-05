import { client } from "./client"
import crypto from 'crypto'

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
