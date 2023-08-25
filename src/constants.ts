export enum ACTIONS {
  GET_DATA_STARTED = 'getDataStarted',
  GET_EXCHANGERATES_SUCCESS = 'getExchangeRatesSuccess',
  EXCHANGE_RATE_UPDATE_STARTED = 'exhangeRateUpdateStarted',
  EXCHANGE_RATE_UPDATED = 'exhangeRateUpdated',
  GET_WALLETS_SUCCESS = 'getWalletsSuccess',
  WALLET_ADD_STARTED = 'walletAddStarted',
  WALLET_UPDATE_STARTED = 'walletUpdateStarted',
  WALLET_ADDED = 'walletAdded',
  WALLET_UPDATED = 'walletUpdated',
  GET_CURRENCIES_SUCCESS = 'getCurrenciesSuccess',
  GET_DATA_FAILED = 'getDataFailed',
}

export enum STATUS {
  READY = 'ready',
  LOADING = 'loading',
  ADDING_WALLET = 'addingWallet',
  UPDATING_WALLET = 'updatingWallet',
  SAVING_EXCHANGE_RATE = 'savingExchangeRate',
}
