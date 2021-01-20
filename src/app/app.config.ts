export class AppConfig {

    public static APP_VERSION = 1.0

    public static API_BASE_URL = 'https://stockbag.herokuapp.com/';

    public static API_SERVICE = {
        LOGIN: 'api/login',
        FUND: 'api/fund',
        FUND_ADD_WITHDRAW: 'api/fund/add_withdraw',
        HOLDING_LIST: 'api/holding_list',
        HOLDING: 'api/holding',
        HOLDING_ADD_EXIT: 'api/holding/add_exit',
        HOLDING_NOTE: 'api/holding/<holding_id>/note',
    }

    public static TRADE_CONFIG = {
        PERIOd: {
            'S': { return: 1, days: 7 },
            'M': { return: 4, days: 30 },
            'L': { return: 40, days: 365 },
        },
        EXTRA_CHARGES: 20
    }
}