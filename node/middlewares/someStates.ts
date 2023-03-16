export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const {
    clients: { masterData },
  } = ctx

  const { body } = ctx
  const orderMD = await masterData.searchByOrderId(body.orderId)

  try {
    if (orderMD && orderMD.length < 1) {
      masterData.createNewDocument({
        id: body.id,
        orderId: body.orderId,
        status: body.currentState,
        retry: 1,
      })
    }
  } catch (error) {
    console.log('Hola error ', error)
  }
  await next()
}
