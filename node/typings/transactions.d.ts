type TransactionInfo = {
  id: string
  transactionId: string
  referenceKey: string
  interactions: {
    href: string
  }
  settlements: {
    href: string
  }
  payments: {
    href: string
  }
  refunds: {
    href: string
  }
  cancellations: {
    href: string
  }
  capabilities: {
    href: string
  }
  timeoutStatus: number
  totalRefunds: number
  status: string
  value: number
  receiverUri: string
  startDate: string
  authorizationToken: string
  authorizationDate: string
  commitmentToken: string
  commitmentDate: string
  refundingToken: string
  refundingDate: string
  cancelationToken: string
  cancelationDate: string
  fields: [
    {
      name: string
      value: string
    }
  ]
  shopperInteraction: string
  ipAddress: string
  sessionId: string
  macId: string
  vtexFingerprint: string
  chargeback: string
  whiteSignature: string
  owner: string
  orderId: string
  userAgent: string
  acceptHeader: string
  antifraudTid: string
  antifraudResponse: string
  antifraudReference: string
  antifraudAffiliationId: string
  channel: string
  salesChannel: string
  urn: string
  softDescriptor: string
  markedForRecurrence: boolean
  buyer: string
}
