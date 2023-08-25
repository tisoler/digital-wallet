import { useGlobalContext } from "../context/globalContext"
import { STATUS } from "../constants"
import Spinner from "./spinner"
import WalletComponent from "./wallet"


const WalletGrid = () => {
  const {
    globalWalletState: { wallets, status: statusWallet, }, 
    globalExchangeRateState: { exchangeRates, status: statusExchangeRate }
  } = useGlobalContext()

  return (
    <>
      <label className='font-bold text-center mt-3 mb-2'>Wallets</label>
      <div className="w-full h-full relative">
        <div className="flex flex-col w-full h-full min-h-[5rem] border border-b border-gray-300 md:absolute">
          {
            statusWallet === STATUS.LOADING || statusExchangeRate === STATUS.LOADING ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-full md:overflow-y-auto py-2 pl-2 pr-3">
                {
                  wallets?.map(wallet => (
                    <WalletComponent key={wallet.id} wallet={wallet} exchangeRates={exchangeRates} />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default WalletGrid
