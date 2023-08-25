export interface Wallet {
  id?: number,
  address: string,
  balance: number | string,
  favorite: boolean,
  isOld: boolean,
}

export interface Exchange {
  id: number,
  idCurrency: number,
  currencyDescription?: string,
  currencySymbol?: string,
  rate: number | string,
}
