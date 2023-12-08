import { parseAuthHeader } from '@/middleware'
import { OrderStatus, PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

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

  await prisma.order.create({
    data: {
      buyerId: user.id,
      status: OrderStatus.IN_PROGRESS,
      summary: fields.summary,
      vendorId: fields.vendorId,
      total: fields.total,
    }
  })
}