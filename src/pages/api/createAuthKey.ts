import { createKey } from "@/utils/authKeys"
import { verifyUser } from "@/utils/verifyUser"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await verifyUser(req)

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
}