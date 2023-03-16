type ClientProfileData = {
  userProfileId: string
}

type OrderCancelResponse = {
  orderId: string
  receipt: string
  date: string
}

type transactionOrder = {
  isActive: boolean
  transactionId: string
  merchantName: string
  payments: [
    {
      id: string
      paymentSystem: string
      paymentSystemName: string
      value: string
      installments: string
      referenceValue: string
      cardHolder: string
      cardNumber: string
      firstDigits: string
      lastDigits: string
      cvv2: string
      expireMonth: string
      expireYear: string
      url: string
      giftCardId: string
      giftCardName: string
      giftCardCaption: string
      redemptionCode: string
      group: creditCard
      tid: string
      dueDate: string
      connectorResponses: {
        Tid: string
        ReturnCode: string
        Message: string
      }
      giftCardProvider: string
      giftCardAsDiscount: string
      koinUrl: string
      accountId: string
      parentAccountId: string
      bankIssuedInvoiceIdentificationNumber: string
      bankIssuedInvoiceIdentificationNumberFormatted: string
      bankIssuedInvoiceBarCodeNumber: string
      bankIssuedInvoiceBarCodeType: string
      billingAddress: {
        postalCode: string
        city: string
        state: string
        country: string
        street: string
        number: string
        neighborhood: string
        complement: string
        reference: string
        geoCoordinates: []
      }
    }
  ]
}

type OrderInfo = {
  orderId: string
  sequence: string
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  sellerOrderId: string
  origin: Marketplace
  affiliateId: string
  salesChannel: number
  merchantName: string
  status: string
  statusDescription: string
  value: number
  creationDate: string
  lastChange: string
  orderGroup: string
  paymentData: {
    giftCards: []
    transactions: [transactionOrder]
  }
  callCenterOperatorData: string
  followUpEmail: string
  lastMessage: string
  invoiceData: string
  changesAttachment: string
  openTextField: string
  roundingError: number
  orderFormId: string
  isCompleted: boolean
  allowCancellation: boolean
  allowEdition: boolean
  isCheckedIn: boolean
  marketplace: string
  authorizedDate: string
  invoicedDate: string
  cancelReason: string
  cancellationData: {
    RequestedByUser: boolean
    RequestedBySystem: boolean
    RequestedBySellerNotification: boolean
    RequestedByPaymentNotification: boolean
    Reason: string
    CancellationDate: string
  }
}
