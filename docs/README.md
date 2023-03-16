# Orders canceled validator

App implementing an event handler receiving status updates from OMS Feed. 
This is the method for using [Feed v3 Hook](https://developers.vtex.com/reference/feed-v3) inside VTEX IO.



Crear tabla
dar permisos de lectura y escritura en tabla y campos 
    Is searchable? Is filterable? 
    para orderId, status


## How to Use

### Configurations 
1. You need to create a new Data Entity with Acronym "CO" and name you prefer with fields orderId, retry ,status
   ```json
   {
      "orderId" : "Varchar50",
      "retry": "integer",
      "status": "Varchar50",
      }
    ``` 
2. Assign permissions Search and filter settings to true. (Is searchable? and Is filterable?) Without this configuration, execution errors will be generated 
3. [Create two trigger in Master Data v1 with Sending an HTTP request](https://help.vtex.com/en/tutorial/creating-trigger-in-master-data--tutorials_1270#sending-an-http-request) 
   1. Create a trigger with name **cancel_order_verify**
      1. Trigger rule => **Um registro for alterado**
      2. Schedule => Schedule on dynamic date with CURRENT DATE plus 4 Hour(s)
      3. if positive => send an HTTP request with 
         1. URL : https://{{account}}.myvtex.com/_v/check/cancel_order
         2. method: POST
         3. content as JSON: 
         4. and select your Data Entity
         5. save 
   2. Create a trigger with name **create_order_verify**
      1. Trigger rule => **Um registro for inserido**
      2. Schedule => Schedule on dynamic date with CURRENT DATE plus 10 minute(s)
      3. if positive => send an HTTP request with 
         1. URL : https://{{account}}.myvtex.com/_v/check/cancel_order
         2. method: POST
         3. content as JSON: 
         4. and select your Data Entity
         5. save 

    This is a body configuration JSON  on triggers content as JSON
    ```json
        {
          "html_url": "{=UrlRegistro}",
          "orderId": "{!orderId}",
          "retry": "{!retry}",
          "status": "{!status}",
          "id": "{!id}",
          "accountId": "{!accountId}",
          "accountName": "{!accountName}",
          "dataEntityId": "{!dataEntityId}",
          "createdBy": "{!createdBy}",
          "createdIn": "{!createdIn}",
          "updatedBy": "{!updatedBy}",
          "updatedIn": "{!updatedIn}",
          "lastInteractionBy": "{!lastInteractionBy}",
          "lastInteractionIn": "{!lastInteractionIn}",
          "followers": "{!followers}",
          "tags": "{!tags}",
          "auto_filter": "{!auto_filter}",
        }
    ```

## Order Feed v3

This app handles events sent by the app `vtex.orders-broadcast`, as you can see by looking at `node/service.json`.

```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "workers": 1,
  "events": {
    "someStates": {
      "sender": "vtex.orders-broadcast",
      "topics": ["order-created"]
    }
  }
}
```

Orders canceled validator starts with consuming changes in status using Feed v3:

1. Receive a selection of status changes where the `order-created`. 

Normally `vtex.orders-broadcast` sends events only in `master` workspace. If you want to use it in a developer workspace, do the following:

1. Create your development workspace by running `vtex use {workspaceName}`
2. Go to `https://{accountName}.myvtex.com/admin/apps/vtex.orders-broadcast/setup`
3. Change the `Target Workspace` variable to the name of the workspace you have created previously.
4. Now you can link this app (`vtex.orders-validator`) in your desired workspace and receive order status updates.

Here is an example body that you can expect to receive:

```json
{
  "recorder": {
    "_record": {
      "x-vtex-meta": {},
      "x-vtex-meta-bucket": {}
    }
  },
  "domain": "Marketplace",
  "orderId": "v69305315atmc-01",
  "currentState": "invoice",
  "lastState": "payment-approved",
  "currentChangeDate": "2020-07-13T20:25:13.2304508Z",
  "lastChangeDate": "2020-07-13T20:25:03.9527532Z"
}
```

If you want to understand further how Feed v3 works, check out [this documentation](https://help.vtex.com/tutorial/orders-management-feed-v3-setup--5qDml3cQypWDRTgw69s4C1).
