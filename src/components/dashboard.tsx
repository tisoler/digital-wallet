'use client'

import { useGlobalContext } from "../context/globalContext"
import ExchangeRate from "./exchangeRate"
import NewWallet from "./newWallet"
import WalletGrid from "./walletGrid"

const Dashboard = () => {
  const { globalExchangeRateState: { exchangeRates, } } = useGlobalContext()

  return (
    <section className="z-10 w-full h-full max-w-5xl flex flex-col items-center justify-between text-sm lg:flex">
      <div className="w-full flex flex-col md:flex-row">
        <NewWallet />
        <ExchangeRate exchangeRates={exchangeRates} />
      </div>
      <WalletGrid />
    </section>
  )
}

export default Dashboard
