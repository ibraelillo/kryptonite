import fetch from 'node-fetch'
import * as AWS from 'aws-sdk'
import {APIGatewayProxyHandlerV2} from 'aws-lambda'
import {Alert} from "./types";

const client = new AWS.EventBridge()





/**
 * 3commas proxy
 *
 * @param event
 * @returns {Promise<{headers: {"Content-Type": string}, body: string, statusCode: number}>}
 */
export const handler: APIGatewayProxyHandlerV2<{ status: string }> = async (event) => {

    const alert = JSON.parse(event.body) as Alert

    await client.putEvents({
        Entries: [
            {
                Detail: JSON.stringify(alert),
                DetailType: 'tv_alert',
                EventBusName: process.env.bus,
                Source:'tradingview'
            }
        ]
    }).promise()

    /*const messages = []

    const pair = `${alert.quote_asset}_${alert.instrument}`

    if (alert.order === 'sell') {
        /*if(alert.prev_position) {
            messages.push({
                ...bots.long,
                action: "close_at_market_price",
                pair
            })
        }

        messages.push({
            ...bots.short,
            pair,
            delay_seconds: 0
        })
    }

    if (alert.order === 'buy') {
        /*if(alert.prev_position) {
            messages.push({
                ...bots.long,
                action: "close_at_market_price",
                pair
            })
        }

        messages.push({
            ...bots.long,
            pair,
            delay_seconds: 0
        })
    }

    console.log(messages)

    const res = await fetch(commas3Url, {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(messages),
        method: 'post'
    })

    console.log(await res.text())*/

    return { status: 'ok'}
};
