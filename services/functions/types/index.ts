export type Alert = {
    order: string
    contracts: string
    ticker: string
    position: 'sell' | 'buy',
    message: string
    comment: string
    prev_position: string
    quote_asset: string
    instrument: string
}

export type RichAlert = Alert & {
    pair: string
}

export type Bot = {
    config: {
        bot_id: number
        email_token: string
    }
    quote: string
    pairs: string[]
}

export enum BotActions {
    CANCEL = 'cancel',
    CANCEL_ALL = 'cancel_all',
    CANCEL_ALL_OPERATIONS_AND_STOP = 'cancel_all_and_stop_bot',
    CLOSE = 'close_at_market_price',
    CLOSE_ALL_OPERATIONS = 'close_at_market_price_all',
    CLOSE_ALL_OPERATIONS_AND_STOP = 'close_at_market_price_all_stop_bot',
    START = 'start_bot',
    START_BOT_AND_START_DEAL = 'start_bot_and_start_deal',
    START_TRAILING = 'start_trailing',
    STOP = 'stop_bot',

}

export type BotMessage = Bot['config'] & {
    message_type: 'bot',
    delay_seconds?: number
    action?: BotActions
}