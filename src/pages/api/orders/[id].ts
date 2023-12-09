import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    if (id) {
      const order = await client.order.findMany({
        where: {
          id: id as string
        }
      })

      res.status(200).json({ order })
    }
  }
}