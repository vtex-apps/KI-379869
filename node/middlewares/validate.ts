import { LogLevel } from '@vtex/api';
import { LogUtil } from './../utils/loggerUtil';
import { LoggerConstants } from './../utils/loggerConstants';
import { UserInputError } from '@vtex/api'
import { json } from 'co-body'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const { req } = ctx
  const body = await json(req)

  if (!body.orderId) {
    const statuscodeError = 400;
    const logException: any = {
      error: LoggerConstants.ORDER_ID_REQUIRED,
      detail: {
        accountName: ctx.vtex.account,
        body: body
      },
    };

    LogUtil.showLog(
      {
        message: `${logException.error}`,
        method: validate.name,
        nameSpace: '',
        type: LogLevel.Info,
        code: statuscodeError,
        detail: logException.detail,
      },
      ctx.vtex
    );

    throw new UserInputError(LoggerConstants.ORDER_ID_REQUIRED) // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }

  ctx.state.body = body

  await next()
}
