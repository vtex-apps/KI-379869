import { LogLevel } from '@vtex/api';
import { LoggerConstants } from './../utils/loggerConstants';
import { LogUtil } from './../utils/loggerUtil';
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
    const statuscodeError: number =
      error.response !== undefined ? error.response.status : 400;

    const logException = {
      error: LoggerConstants.CHECK_STATUS_ERROR,
      detail: {
        accountName: ctx.vtex.account,
        error: error,
        body: body
      },
    };

    LogUtil.showLog(
      {
        message: `${logException.error}`,
        method: checkStatus.name,
        nameSpace: '',
        type: LogLevel.Error,
        code: statuscodeError,
        detail: logException.detail,
      },
      ctx.vtex
    );
  }

  await next()
}
