import { Wallet } from '../types'

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

export const getWallets = async (): Promise<Wallet[] | null> => {
  try {
    const res = await fetch(`${API_URL}/wallet`)
    if (res.status !== 200) {
      return null
    }
    const wallets = await res.json()

    return wallets
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const createWallet = async (payload: Wallet): Promise<Wallet | null> => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await fetch(`${API_URL}/wallet`, requestOptions)
    if (res.status !== 200) {
      return null
    }
    const wallet = await res.json()

    return wallet
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const updateWallet = async (payload: Wallet): Promise<Wallet | null> => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await fetch(`${API_URL}/wallet`, requestOptions)
    if (res.status !== 200) {
      return null
    }
    const wallet = await res.json()

    return wallet
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
