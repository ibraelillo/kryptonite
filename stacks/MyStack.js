import {Api, Config, EventBus} from "@serverless-stack/resources";

export function MyStack({stack}) {


    const password = new Config.Secret(stack, 'DB_PASS')
    const username = new Config.Parameter(stack, 'DB_USER', {
        value: 'krypto'
    })
    const dbUrl = new Config.Parameter(stack, 'DB_URL', {
        value: 'krypto0.2hqvt.mongodb.net/?retryWrites=true&w=majority'
    })

    const bus = new EventBus(stack, 'bus', {
        rules: {
            alerts: {
                pattern: {
                    detailType: ['tv_alert'],
                    source: ['tradingview']
                },
                targets: {
                    alerts: 'functions/alerts.handler'
                }
            }
        },
        defaults: {
            function: {
                config: [username, password, dbUrl]
            }
        }
    })

    const api = new Api(stack, "api", {
        routes: {
            "GET /": "functions/tv-alert-receiver.handler",
            "POST /": "functions/tv-alert-receiver.handler",
        },
        defaults: {
            function: {
                environment: {
                    bus: bus.eventBusName
                }
            }
        }
    });

    api.attachPermissions([bus])

    stack.addOutputs({
        ApiEndpoint: api.url
    });
}
