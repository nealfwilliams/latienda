import { headers } from 'next/headers'
import { client } from '../client'
import { JsonResponse, verifyRequest } from '../utils'

export async function POST(
  request: Request,
) {
  const headersList = headers()

  const fields = await request.json()

  const user = await verifyRequest()

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  const product = await client.product.create({
    data: {
      vendorId: user.id,
      name: fields.name,
      price: fields.price,
      description: fields.description,
      quantity: 0
    }
  })

  return JsonResponse({
    product
  }) 
}

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''

  const products = await client.product.findMany({
    where: query ? {
      name: {
        contains: query 
      }
    } : undefined,
  })

  return JsonResponse({
    products
  })
}