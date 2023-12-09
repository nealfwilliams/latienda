import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  const orders = await client.order.findMany({
    where: {
      hasBeenDelivered: true,
      fulfilled: false,
    },
    select: {
      id: true,
      vendor: {
        select: {
          account: true
        }
      },
      total: true
    }
  })

  response.status(200).json({ orders })
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await GET(req, res)
  }
}