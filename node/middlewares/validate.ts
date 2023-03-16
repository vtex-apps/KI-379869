import { UserInputError } from '@vtex/api'
import { json } from 'co-body'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const { req } = ctx
  const body = await json(req)

  if (!body.orderId) {
    throw new UserInputError('Order ID is required') // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }

  ctx.state.body = body

  await next()
}
