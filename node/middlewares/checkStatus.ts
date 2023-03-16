import { cancelFlowOne, cancelFlowTwo } from "../cancelFlows"

export async function checkStatus(ctx: Context, next: () => Promise<any>) {
  const {
    state: { body },
    clients: { orders },
  } = ctx
  try {
    const order: OrderInfo = await orders.getOrder(body.orderId)

    if (order.status === 'payment-pending' || order.status === '') {
      cancelFlowOne(ctx, order)
    } else {
      if (!order.status.toLowerCase().includes("cancel")
        || order.status.toLowerCase() === 'window-to-cancel') {
        cancelFlowTwo(ctx)
      }
    }

    ctx.request.response.status = 200
  } catch (error) {
  }

  await next()
}
