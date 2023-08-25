import { useGlobalContext } from "../context/globalContext"
import { Exchange, Wallet } from "../types"
import { ChangeEvent, useEffect, useState } from "react"
import './wallet.css'
import WalletIcon from "../icons/wallet"
import StarIcon from "../icons/star"
import { STATUS } from "../constants"
import Spinner from "./spinner"
import EditIcon from "../icons/edit"

type WalletProps = {
  wallet: Wallet,
  exchangeRates: Exchange[],
}

const WalletComponent = ({ wallet, exchangeRates, }: WalletProps) => {
  const [exchangeRate, setExchangeRate] = useState<Exchange>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [balance, setBalance] = useState<string | number>(wallet.balance)

  const { globalWalletState: { status }, updateWallet } = useGlobalContext()

  useEffect(() => {
    if(exchangeRates.length && !exchangeRate) setExchangeRate(exchangeRates[0])
  }, [exchangeRates])

  const handleSetWalletBalance = (value: string) => {
    if (isNaN(value as any)) return

    setBalance(value)
  }

  const handleCancelEdit = () => {
    setBalance(wallet.balance)
    setIsEditing(false)
  }

  const handleAcceptEdit = async () => {
    if (isNaN(parseFloat(balance as any))) return
  
    await updateWallet({
      ...wallet,
      balance: parseFloat(balance as any),
    })

    setBalance(parseFloat(balance as any).toFixed(10))
    setIsEditing(false)
  }

  const handleSetWalletFavorite = async () => {
    await updateWallet({
      ...wallet,
      favorite: !wallet.favorite,
    })
  }

  const handleChangeExchangeRate = (evt: ChangeEvent<HTMLSelectElement>) => {
    let value = evt?.currentTarget?.value
    if (isNaN(value as any)) return
    const selectedId = parseInt(value)

    const selectedExchangeRate = exchangeRates.find(er => er.id === selectedId)
    if (selectedExchangeRate) setExchangeRate(selectedExchangeRate)
  }

  const getBalanceForExchange = (balance: number | string, rate: number | string) => {
    if (!balance || !rate) return 0
    const balanceForExchange = parseFloat(balance as any) / parseFloat(rate as any) || 0
    const truncatedValue = Math.floor(balanceForExchange * 100) / 100
    const numberFormat = new Intl.NumberFormat('en-US')

    return(numberFormat.format(truncatedValue))
  }

  return (
    <div className="flex flex-col w-full h-full min-h-[180px]">
      <div className="flex items-center w-full flex bg-blue-500 py-2 px-4 relative">
        <WalletIcon />
        <label className='text-center text-white ml-2'>{wallet?.address}</label>
        <div className="absolute right-3 cursor-pointer">
          {
            status === STATUS.UPDATING_WALLET ? (
              <Spinner size="xs" />
            ) : (
              <StarIcon filled={wallet?.favorite} onClick={handleSetWalletFavorite} />
            )
          }
        </div>
      </div>

      {
        !!wallet?.isOld && (
          <div className="w-full bg-[#f2d6d9] py-1 px-4 mt-1 rounded-sm warning">
            <label className='text-xs text-center text-white text-[#60272a]'>Wallet is old!</label>
          </div>
        )
      }

      <div className="grid grid-cols-2 gap-1 w-full h-full box-border mt-1">
        <div className="relative flex items-center justify-center w-full h-full border border-b rounded-md border-gray-300 p-4 bg-gray-100 ">
          <div className="absolute right-1 top-1 cursor-pointer">
            {
              !isEditing ? (
                <EditIcon onClick={() => setIsEditing(true)} />
              ) : (
                <div className="flex">
                  <div className="cancel px-1 mr-2" onClick={handleCancelEdit} />
                  <div className="accept px-1 mr-1" onClick={handleAcceptEdit} />
                </div>
              )
            }
          </div>
          {
            isEditing ? (
              <input
                onChange={(e) => handleSetWalletBalance(e.target.value)}
                value={balance}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <label className="font-bold">{balance || 0}</label>
            )
          }
        </div>
        <div className="flex flex-col items-centrer justify-center w-full h-full border border-b rounded-md border-gray-300 p-4 bg-gray-100 ">
          <select
            className="py-3 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 mb-3 cursor-pointer"
            onChange={handleChangeExchangeRate}
            value={exchangeRate?.id}
          >
            {
              exchangeRates?.map(er => <option key={er.id} value={er.id}>{er.currencyDescription}</option>)
            }
          </select>
          <label className="font-bold">
            {`${exchangeRate?.currencySymbol} ${getBalanceForExchange(wallet?.balance, exchangeRate?.rate || 0)}`}
          </label>
        </div>
      </div>
    </div>
  )
}

export default WalletComponent
