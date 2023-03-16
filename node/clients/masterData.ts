import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const entityAcronym = 'CO'
const urlDoc = `/api/dataentities/${entityAcronym}/documents`

export class MasterData extends JanusClient {
    constructor(ctx: IOContext, options?: InstanceOptions) {
        super(ctx, {
            ...options,
            headers: {
                ...options?.headers,
                VtexIdclientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken ?? '',
                'Content-Type': 'application/json',
                'X-Vtex-Use-Https': 'true',
            },
        })
    }

    public async searchByDocId(docId: string): Promise<[OrderType]> {
        const urlSearch = `/api/dataentities/${entityAcronym}/search`
        return this.http.get(`${urlSearch}?_where=id=${docId}&_fields=id,orderId,status,retry`);
    }

    public async searchByOrderId(orderId: string): Promise<[OrderType]> {
        const urlSearch = `/api/dataentities/${entityAcronym}/search`
        return this.http.get(`${urlSearch}?_where=orderId=${orderId}&_fields=id,orderId,status,retry`);
    }

    public async createNewDocument(body: OrderType): Promise<ResponseDocument> {
        return this.http.post(`${urlDoc}`, body);
    }

    public async updateDocument(body: OrderType): Promise<ResponseDocument> {
        return this.http.patch(`${urlDoc}`, body);
    }

    public async delete(docId: string): Promise<IOResponse<void>> {
        return this.http.delete(`${urlDoc}/${docId}`);
    }
}
