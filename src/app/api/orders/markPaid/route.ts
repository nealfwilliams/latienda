import { client } from "../../client"
import { JsonResponse } from "../../utils"

export async function POST(
  request: Request,
) {
  // Get order id from request body
  // Get payment amount from request body


  // If payment amount is greater or equal to the order total
  // Mark order as paid
  // Return success
  const fields = await request.json()

  const order = await client.order.findFirst({
    where: {
      id: fields.orderId
    },
  })

  if (order && fields.paymentAmount >= order.total) {
    await client.order.update({
      where: {
        id: fields.orderId
      },
      data: {
        hasBeenPaid: true
      }
    })
  }

  return JsonResponse({
    order
  })
}