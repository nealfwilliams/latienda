import { client } from '@/utils/client'
import { verifyUser } from '@/utils/verifyUser'
import { OrderStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  const orders = await client.order.findMany()

  response.status(200).json({ orders })
}

type SummaryItem = {
  productId: string;
  quantity: number;
}

const POST = async (request: NextApiRequest, response: NextApiResponse) => {
  const fields = request.body

  if (typeof fields !== 'object') {
    response.status(400).json({
      status: 400,
      statusText: 'Bad Request',
    })

    return
  }

  // const fields = await JSON.parse(request.body)
  const user = await verifyUser(request)

  if (!user) {
    response.status(401).json({
      status: 401,
      statusText: 'Unauthorized',
    })
  } else {
    const summary = fields.summary;
    let total = 0
    let vendorId: string = ''

    summary.items.forEach(async (item: SummaryItem) => {
      const product = await client.product.findUnique({
        where: {
          id: item.productId
        }
      })

      if (!product) {
        throw new Error('Product not found')
      }

      if (vendorId && vendorId !== product.vendorId) {
        throw new Error('Cannot order from multiple vendors')
      }

      vendorId = product.vendorId
      total += product.price * item.quantity
    })

    const order = await client.order.create({
      data: {
        vendorId: vendorId,
        buyerId: user.id,
        total: total,
        summary: fields.summary,
        status: OrderStatus.IN_PROGRESS,
      }
    })

    response.status(200).json({ order })
  }
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await POST(req, res)
  } else if (req.method === 'GET') {
    await GET(req, res)
  }

}