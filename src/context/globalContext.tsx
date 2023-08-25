'use client'

import React, { createContext, useEffect, useContext, ReactNode, useReducer } from "react"
import { getExchangeRates, updateExchangeRate } from "../services/exchange"
import { ACTIONS, STATUS } from "../constants"
import { Exchange, Wallet } from "../types"
import { exchangeRateReducer } from "../reducers/exchangeRateReducer"
import { walletReducer } from "../reducers/walletReducer"
import { createWallet, getWallets, updateWallet as updateWalletService } from "../services/wallets"

export interface GlobalWalletState {
  wallets: Wallet[] | [],
  status: STATUS,
  hasError: boolean,
}

export interface GlobalExchangeRateState {
  exchangeRates: Exchange[] | [],
  status: STATUS,
  hasError: boolean,
}

export interface GlobalAction {
  type: string,
  exchangeRates?: Exchange[],
  exchangeRate?: Exchange,
  wallets?: Wallet[],
  wallet?: Wallet,
}

const INITIAL_WALLET_STATE: GlobalWalletState = {
  wallets: [],
  status: STATUS.LOADING,
  hasError: false,
}

const INITIAL_EXCHANGE_RATE_STATE: GlobalExchangeRateState = {
  exchangeRates: [],
  status: STATUS.LOADING,
  hasError: false,
}

interface GlobalContextProps {
  globalWalletState: GlobalWalletState,
  globalExchangeRateState: GlobalExchangeRateState,
  addWallet: (wallet: Wallet) => Promise<void>,
  updateExchange: (exchangeRate: Exchange) => Promise<void>,
  updateWallet: (wallet: Wallet) => Promise<void>,
}

const GlobalContext = createContext<GlobalContextProps>(undefined as any)

export const useGlobalContext = (): GlobalContextProps => useContext(GlobalContext)

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalWalletState, dispatchWallet] = useReducer(walletReducer, INITIAL_WALLET_STATE)
  const [globalExchangeRateState, dispatchExchangeRate] = useReducer(exchangeRateReducer, INITIAL_EXCHANGE_RATE_STATE)

  const getExchangeData = async () => {
    const exchangeRates = await getExchangeRates()

    dispatchExchangeRate({
      type: ACTIONS.GET_EXCHANGERATES_SUCCESS,
      ...(exchangeRates && { exchangeRates }),
    })
  }

  const getWalletsData = async () => {
    const wallets = await getWallets()

    dispatchWallet({
      type: ACTIONS.GET_WALLETS_SUCCESS,
      ...(wallets && { wallets }),
    })
  }

  useEffect(() => {
    try {
      dispatchWallet({
        type: ACTIONS.GET_DATA_STARTED,
      })
      // fetch exchanges
      getExchangeData()
      // fetch wallets
      getWalletsData()
    } catch (e) {
      dispatchWallet({
        type: ACTIONS.GET_DATA_FAILED,
      })
    }
  }, [])

  const addWallet = async (newWallet: Wallet) => {
    dispatchWallet({
      type: ACTIONS.WALLET_ADD_STARTED,
    })
    // server
    const wallet = await createWallet(newWallet)
    if (!wallet) return
    // global state
    dispatchWallet({
      type: ACTIONS.WALLET_ADDED,
      wallet,
    })
  }

  const updateExchange = async (exchangeRate: Exchange) => {
    dispatchExchangeRate({
      type: ACTIONS.EXCHANGE_RATE_UPDATE_STARTED,
    })
    // server
    const exchangeRateUpdated = await updateExchangeRate(exchangeRate)
    if (!exchangeRateUpdated) return
    // global state
    dispatchExchangeRate({
      type: ACTIONS.EXCHANGE_RATE_UPDATED,
      exchangeRate: exchangeRateUpdated,
    })
  }

  const updateWallet = async (wallet: Wallet) => {
    dispatchWallet({
      type: ACTIONS.WALLET_UPDATE_STARTED,
    })
    // server
    const walletUpdated = await updateWalletService(wallet)
    if (!walletUpdated) return
    // global state
    dispatchWallet({
      type: ACTIONS.WALLET_UPDATED,
      wallet: walletUpdated,
    })
  }

  return (
    <GlobalContext.Provider value={{ globalWalletState, globalExchangeRateState, addWallet, updateExchange, updateWallet, }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
