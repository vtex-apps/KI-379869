import {
  ClientsConfig,
  LRUCache,
  method,
  Service,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'

import { Clients } from './clients'
import { someStates } from './middlewares/someStates'
import { validate } from './middlewares/validate'
import { checkStatus } from './middlewares/checkStatus'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      id: string
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
    body: {
      html_url: string
      orderId: string
      status: string
      retry: number
      id: string
      accountId: string
      accountName: string
      dataEntityId: string
      createdBy: string
      createdIn: string
      updatedBy: string
      updatedIn: string
      lastInteractionBy: string
      lastInteractionIn: string
      followers: []
      tags: []
      auto_filter: string
    }
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  events: {
    someStates,
  },
  routes: {
    checkCancelOrder: method({
      POST: [validate, checkStatus],
    }),
  },
})
