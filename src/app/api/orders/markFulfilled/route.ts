import { client } from "../../client"
import { JsonResponse } from "../../utils"

export async function POST(
  request: Request,
) {
  // Get order id from request body
  // Mark order as fulfilled
  // Return success
  const fields = await request.json()

  const order = await client.order.update({
    where: {
      id: fields.orderId
    },
    data: {
      fulfilled: true
    }
  })

  return JsonResponse({
    order
  })
}