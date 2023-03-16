import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
import { MySchema } from 'vtex.orders-validator'

import { Orders } from './orders'
import { MasterData } from './masterData'
import Transactions from './transactions'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get entity() {
    return this.getOrSet('entity', masterDataFor<MySchema>('entity'))
  }

  public get orders() {
    return this.getOrSet('orders', Orders)
  }

  public get masterData() {
    return this.getOrSet('masterData', MasterData)
  }

  public get transactions() {
    return this.getOrSet('transactions', Transactions)
  }
}
