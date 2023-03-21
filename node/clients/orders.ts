import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { MSG_CANCELED } from "../typings/constants";

export class Orders extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken ?? ctx.adminUserAuthToken ?? '',
        'Proxy-Authorization': ctx.authToken ?? ctx.adminUserAuthToken ?? '',
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async getOrder(orderId: string): Promise<OrderInfo> {
    return this.http.get(`/api/oms/pvt/orders/${orderId}`)
  }

  public async cancelOrder(orderId: string): Promise<OrderCancelResponse> {
    return this.http.post(`/api/oms/pvt/orders/${orderId}/cancel`, { "reason": MSG_CANCELED }
    )
  }
}
