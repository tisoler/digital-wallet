import { ACTIONS, STATUS } from "../constants"
import { GlobalAction, GlobalExchangeRateState } from "../context/globalContext"

export function exchangeRateReducer(globalState: GlobalExchangeRateState, action: GlobalAction) {
  switch (action.type) {
    case ACTIONS.GET_EXCHANGERATES_SUCCESS: {
      return {
        ...globalState,
        exchangeRates: action.exchangeRates ?? globalState.exchangeRates,
        status: STATUS.READY,
        hasError: false,
      }
    }
    case ACTIONS.EXCHANGE_RATE_UPDATE_STARTED: {
      return {
        ...globalState,
        status: STATUS.SAVING_EXCHANGE_RATE,
        hasError: false,
      }
    }
    case ACTIONS.EXCHANGE_RATE_UPDATED: {
      const exchangeRate = action.exchangeRate
      if (!exchangeRate) return globalState

      return {
        ...globalState,
        exchangeRates: globalState.exchangeRates?.map(er => {
          if (er.id === exchangeRate.id) {
            // It only updates rate, this is the only field that can be modified. Currency description needs to be maintained.
            return {
              ...er,
              rate: exchangeRate.rate,
            }
          } else {
            return er
          }
        }),
        status: STATUS.READY,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
