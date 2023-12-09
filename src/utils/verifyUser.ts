import { SIGN_IN_MESSAGE } from "@/constants"
import { recoverPersonalSignature } from "@metamask/eth-sig-util"
import { NextApiRequest } from "next"
import { client } from "./client"

export const verifyUser = async (request: NextApiRequest) => {
  const headersList = request.headers
  const account = headersList['x-account']
  const signature = headersList['x-signature']

  if (!account || !signature) {
    return false
  }

  const recoveredAccount = await recoverPersonalSignature({
    data: SIGN_IN_MESSAGE,
    signature: signature as string,
  })

  if (account !== recoveredAccount) {
    return false
  }

  const user = await client.user.findFirst({
    where: {
      account: account as string
    }
  })

  return user
}