import { client } from "@/app/api/client"
import { checkKey } from "@/app/api/utils"
import { OrderStatus } from "@prisma/client"

export async function POST(
  request: Request,
  { params }: { params: { id: string, apiKey: string } }
) {
  const { id, apiKey } = params

  const order = await client.order.findUnique({
    where: {
      id
    }
  }) 

  if (!order) {
    return new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const apiKeyFound = await checkKey(apiKey)

  if (!apiKeyFound) {
    return new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  await client.order.update({
    where: {
      id
    },
    data: {
      status: OrderStatus.DELIVERED
    }
  })
}
