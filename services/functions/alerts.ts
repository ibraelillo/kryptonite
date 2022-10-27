import {EventBridgeHandler} from 'aws-lambda'
import {Alert} from "./types";
import fetch from 'node-fetch'

const bots = {
    long: {
        quote: 'USD',
        config: {
            "message_type": "bot",
            "bot_id": 9735910,
            "email_token": "384a0ebe-69d6-4d10-a3fb-6175000f6dc9",
            "delay_seconds": 0,
            "pair": null
        }
    },
    babyAssistant: {
        quote: 'USD',
        config: {
            "message_type": "bot",
            "bot_id": 9951485,
            "email_token": "384a0ebe-69d6-4d10-a3fb-6175000f6dc9",
            "delay_seconds": 0
        }
    },
    short: {
        quote: 'USD',
        config: {
            "message_type": "bot",
            "bot_id": 9735914,
            "email_token": "384a0ebe-69d6-4d10-a3fb-6175000f6dc9",
            "delay_seconds": 0,
        }
    },
    bitcoiner: {
        quote: 'BTC',
        config: {
            "message_type": "bot",
            "bot_id": 9791489,
            "email_token": "384a0ebe-69d6-4d10-a3fb-6175000f6dc9",
            "delay_seconds": 0,
        }
    },
    bitFucker: {
        quote: 'BTC',
        config: {
            "message_type": "bot",
            "bot_id": 9938015,
            "email_token": "384a0ebe-69d6-4d10-a3fb-6175000f6dc9",
            "delay_seconds": 0
        }
    }
}

const commas3Url = 'https://3commas.io/trade_signal/trading_view'

export const handler: EventBridgeHandler<'tv_alert', Alert, {}> = async (event, ctx) => {
    console.log(event)

    // By default, the callback waits until the runtime event loop is empty
    // before freezing the process and returning the results to the caller.
    // Setting this property to false requests that AWS Lambda freeze the
    // process soon after the callback is invoked, even if there are events
    // in the event loop.
    ctx.callbackWaitsForEmptyEventLoop = false;


    console.log({bots})

    const alert = event.detail

    let messages = []

    const pair = `${alert.quote_asset}_${alert.instrument}`

    switch (alert.quote_asset) {
        case 'USD': {
            if (alert.order === 'sell') {
                messages.push({
                    ...bots.short.config,
                    pair,
                    delay_seconds: 0,
                    // action: "close_at_market_price",
                })
            }

            if (alert.order === 'buy') {
                messages.push({
                    ...bots.long.config,
                    pair,
                    delay_seconds: 0
                })

                messages.push({
                    ...bots.babyAssistant.config,
                    pair,
                    delay_seconds: 0
                })
            }

            break;
        }
        case 'BTC': {
            if (alert.order === 'buy') {
                messages.push({
                    ...bots.bitcoiner.config,
                    pair,
                    delay_seconds: 0
                })

                messages.push({
                    ...bots.bitFucker.config,
                    pair,
                    delay_seconds: 0
                })
            }
        }
    }

    console.log(messages)

    const res = await fetch(commas3Url, {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(messages),
        method: 'post'
    })

    console.log(await res.text())

    return {}
}