import { LogLevel } from '@vtex/api';
import { LogUtil } from './../utils/loggerUtil';
import { LoggerConstants } from './../utils/loggerConstants';
export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const {
    clients: { masterData },
  } = ctx

  const { body } = ctx

  const logInfo: any = {
    info: LoggerConstants.EVENT_CALLED,
    detail: {
      accountName: ctx.vtex.account,
      success: 200,
      body: body
    },
  };

  LogUtil.showLog(
    {
      message: `${logInfo.error}`,
      method: someStates.name,
      nameSpace: '',
      type: LogLevel.Info,
      code: 200,
      detail: logInfo.detail,
    },
    ctx.vtex
  );


  try {
    const orderMD = await masterData.searchByOrderId(body.orderId)

    if (orderMD && orderMD.length < 1) {
      masterData.createNewDocument({
        id: body.id,
        orderId: body.orderId,
        status: body.currentState,
        retry: 1,
      })
    }

  } catch (error) {
    const statuscodeError: number =
      error.response !== undefined ? error.response.status : 400;

    const logException: any = {
      error: LoggerConstants.ERROR_FEED,
      detail: {
        accountName: ctx.vtex.account,
        error: error,
        body: body
      },
    };

    LogUtil.showLog(
      {
        message: `${logException.error}`,
        method: someStates.name,
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
