import { MasterData } from './masterData';
import { Orders } from './orders';
import { IOClients } from "@vtex/api";
import Transactions from './transactions';

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {

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
