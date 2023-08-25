import { Exchange } from '../types'

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

export const getExchangeRates = async (): Promise<Exchange[] | null> => {
  try {
    const res = await fetch(`${API_URL}/exchangerate`)
    if (res.status !== 200) {
      return null
    }
    const exchanges = await res.json()

    return exchanges
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const updateExchangeRate = async (payload: Exchange): Promise<Exchange | null> => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await fetch(`${API_URL}/exchangerate`, requestOptions)
    if (res.status !== 200) {
      return null
    }
    const exchange = await res.json()

    return exchange
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
