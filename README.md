paths:
  /trades/historical:
    get:
      summary: Get historical trades for given crypto symbol, with or without start/end date
      parameters:
        - name: key
          required: true
          type: string
        - name: startTime
          required: false
          type: number
        - name: endTime
          required: false
          type: number
      responses:
        200:
          description: Array of historical trades
          content:
            application/json:
              schema:
                type: object
                properties:
                  symbol:
                    type: string
                  id:
                    type: number
                  price:
                    type: number
                  qty:
                    type: number
                  firstTradeId:
                    type: number
                  lastTradeId:
                    type: string
                  timestamp:
                    type: number
                  isBuyerMaker:
                    type: boolean
                  isBestMatch:
                    type: boolean
  /trades/analyze:
    get:
      summary: Get historical trades for given crypto symbol, with or without start/end date
      parameters:
        - name: key
          required: true
          type: string
        - name: startTime
          required: true
          type: number
        - name: endTime
          required: true
          type: number
      responses:
        200:
          description: Array of historical trades
          content:
            application/json:
              schema:
                type: object
                properties:
                  symbol:
                    type: string
                  trend:
                    type: string
                  percentChange:
                    type: number
