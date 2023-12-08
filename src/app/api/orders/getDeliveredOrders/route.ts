import { client } from "../../client"
import { JsonResponse } from "../../utils"

export async function GET(
  request: Request,
) {
  // Find all orders that have been delivered and are not yet fulfilled
  const orders = await client.order.findMany({
    where: {
      status: 'DELIVERED',
      fulfilled: false
    }
  })

  return JsonResponse({
    orders
  })
}