import { IOContext, LogLevel } from "@vtex/api";

export interface Log {
  code?: number;
  nameSpace: string;
  method: string;
  message: string;
  type: LogLevel;
  detail: any; 
}

export class LogUtil {
  static showLog(params: Log, context: IOContext) {
    const data = {
      message: `[${params.type}]:[${params.nameSpace}:${params.method}:${params.code}]:${params.message}`,
      detail: params.detail,
    };
    context.logger[params.type](data);
  }
}
