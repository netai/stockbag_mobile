export class AppConfig {

    public static APP_VERSION = 1.0

    public static API_BASE_URL = 'https://stockbag.herokuapp.com/';

    public static API_SERVICE = {
        LOGIN: 'api/login',
        FUND: 'api/fund',
        HOLDING_LIST: 'api/holding_list',
        HOLDING: 'api/holding',
        HOLDING_ADD_EXIT: 'api/holding/add_exit',
        HOLDING_NOTE: 'api/holding/<holding_id>/note'
    }

    public static TRADE_CONFIG = {
        DP_CHARGES: 20,
        TARGET_DAY_PERCENTAGE: .17
    }

    public static TRADE_PERIOD = {
        'S': 7,
        'M': 30,
        'L': 365
    }
}