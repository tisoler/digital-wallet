import { Wallet } from "../types"
import { ACTIONS, STATUS } from "../constants"
import { GlobalAction, GlobalWalletState } from "../context/globalContext"

const sortByFavoriteAndAddress = (a: Wallet, b: Wallet) => (Number(b.favorite) - Number(a.favorite) || a.address.localeCompare(b.address))

export function walletReducer(globalState: GlobalWalletState, action: GlobalAction) {
  switch (action.type) {
    case ACTIONS.GET_DATA_STARTED: {
      return {
        ...globalState,
        status: STATUS.LOADING,
        hasError: false,
      }
    }
    case ACTIONS.GET_DATA_FAILED: {
      return {
        ...globalState,
        status: STATUS.READY,
        hasError: true,
      }
    }
    case ACTIONS.GET_WALLETS_SUCCESS: {
      return {
        ...globalState,
        wallets: action.wallets ?? globalState.wallets,
        status: STATUS.READY,
        hasError: false,
      }
    }
    case ACTIONS.WALLET_ADD_STARTED: {
      return {
        ...globalState,
        status: STATUS.ADDING_WALLET,
        hasError: false,
      }
    }
    case ACTIONS.WALLET_ADDED: {
      const wallet = action.wallet
      if (!wallet) return globalState

      return {
        ...globalState,
        wallets: [...globalState.wallets, wallet].sort(sortByFavoriteAndAddress),
        status: STATUS.READY,
      }
    }
    case ACTIONS.WALLET_UPDATE_STARTED: {
      return {
        ...globalState,
        status: STATUS.UPDATING_WALLET,
        hasError: false,
      }
    }
    case ACTIONS.WALLET_UPDATED: {
      const wallet = action.wallet
      if (!wallet) return globalState

      return {
        ...globalState,
        wallets: globalState.wallets?.map(w => {
          if (w.id === wallet.id) {
            // It only updates balance and favorite, these are the only fields that can be modified. isOld needs to be maintained.
            return {
              ...w,
              balance: wallet.balance,
              favorite: wallet.favorite,
            }
          } else {
            return w
          }
        }).sort(sortByFavoriteAndAddress),
        status: STATUS.READY,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
