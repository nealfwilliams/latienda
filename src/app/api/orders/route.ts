import { parseAuthHeader } from '@/middleware'
import { OrderStatus, PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { client } from '../client'

export async function GET(
  request: Request,
) {
  // const order = await client.order.create({
  //   data: {
  //     total: 1,
  //     summary: 'test',
  //     buyerId: "6572a38aec6790651360f611",
  //     vendorId: "6572a38aec6790651360f611",
  //     status: OrderStatus.IN_PROGRESS,
  //   }
  // })

  // return new Response(JSON.stringify(order), {
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  // })

  const orders = await client.order.findMany()
  return Response.json({
    orders: orders
  })
}


export async function POST(
  request: Request,
) {
  const headersList = headers()
  const fields = await request.json()

  const user = await parseAuthHeader(headersList)

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  await client.order.create({
    data: {
      buyerId: user.id,
      status: OrderStatus.IN_PROGRESS,
      summary: fields.summary,
      vendorId: fields.vendorId,
      total: fields.total,
    }
  })
}