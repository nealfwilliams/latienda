import { checkKey, verifyRequestKey } from "@/utils/authKeys"
import { client } from "@/utils/client"
import { OrderStatus } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const id = request.body['orderId'] as string

  const order = await client.order.findUnique({
    where: {
      id
    }
  }) 

  if (!order) {
    response.status(404).json({
      status: 404,
      statusText: 'Not Found',
    })

    return
  }

  // const apiKeyFound = await verifyRequestKey(request)

  // if (!apiKeyFound) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //     statusText: 'Unauthorized',
  //   })
  // }

  await client.order.update({
    where: {
      id
    },
    data: {
      hasBeenDelivered: true,
    }
  })

  response.status(200).json({
    status: 200,
    statusText: 'OK',
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await POST(req, res)
  }
}