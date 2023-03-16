import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import {
  ApprovedAuthorization,
  CancellationResponse,
} from '@vtex/payment-provider'

export default class Transactions extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`http://${ctx.account}.vtexpayments.com.br`, ctx, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        VtexIdclientAutCookie: ctx.authToken,
        'Proxy-Authorization': ctx.authToken,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public getTransaction = (transactionId: string): Promise<TransactionInfo> =>
    this.http.get(`/api/pvt/transactions/${transactionId}`)

  public sendAdditionalData = (
    transactionId: string,
    { name, value }: { name: string; value: string }
  ) =>
    this.http.post(`/api/pvt/transactions/${transactionId}/additional-data`, [
      {
        name,
        value,
      },
    ])

  public updatePaymentStatus = (
    transactionId: string,
    paymentId: string,
    transactionData: TransactionInfo
  ): Promise<ApprovedAuthorization | CancellationResponse> =>
    this.http.post(
      `/payment-provider/transactions/${transactionId}/payments/${paymentId}/retry`,
      transactionData
    )

  public cancelTransaction = (
    transactionId: string,
    value: number
  ): Promise<CancellationResponse> =>
    this.http.post(
      `/api/pvt/transactions/${transactionId}/cancellation-request`,
      {
        value,
      }
    )
}
