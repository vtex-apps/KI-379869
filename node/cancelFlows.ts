import { validateDaysPassed } from './utils/validations';
import { MAX_NUMBER_RETRY, MSG_CANCELED, MSG_NOT_CANCELED } from './typings/constants';


export async function cancelFlowOne(ctx: Context, order: OrderInfo) {
    const {
        state: { body },
        clients: { orders, transactions, masterData },
    } = ctx

    const doc: OrderType = {
        id: body.id,
        orderId: body.orderId,
        status: body.status,
        retry: Number(body.retry) + 1,
    }

    const transactionId = order.paymentData.transactions[0]?.transactionId
    const transactionResponse = await transactions.getTransaction(
        transactionId
    )

    if (transactionResponse.status.toLowerCase() === 'cancelled') {
        await orders.cancelOrder(order.orderId)
        masterData.updateDocument({ ...doc, status: MSG_CANCELED })
    } else if (body.retry < MAX_NUMBER_RETRY) {
        // Order in progress. We check again with retry + 1
        masterData.updateDocument({ ...doc, status: order.status })
    } else if (order.allowCancellation) {
        let message = ''
        const creationDate = new Date(order.creationDate)
        const now = new Date()

        if (validateDaysPassed(creationDate, now, 7)) {
            await orders.cancelOrder(order.orderId)
            message = MSG_CANCELED
        } else {
            message = MSG_NOT_CANCELED
        }

        masterData.updateDocument({
            ...doc,
            status: message,
            retry: doc.retry + 1,
        })
    }

}

export async function cancelFlowTwo(ctx: Context) {
    const {
        state: { body },
        clients: { masterData },
    } = ctx

    const orderMD = await masterData.searchByOrderId(body.orderId)
    if (orderMD.length > 0){
        masterData.delete(orderMD[0].id)
    }
}
