import { useGlobalContext } from "../context/globalContext"
import { Wallet } from "../types"
import { useState } from "react"
import { STATUS } from "../constants"
import Spinner from "./spinner"

const INITIAL_WALLET: Wallet = {
  balance: '',
  address: '',
  favorite: false,
  isOld: false,
}

const AddWallet = () => {
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET)

  const { globalWalletState: { status },  addWallet } = useGlobalContext()

  const handleSetWalletAddress = (address: string) => {
    setWallet({
      ...wallet,
      address,
    })
  }

  const handleSetWalletBalance = (value: string) => {
    if (isNaN(value as any)) return 

    setWallet({
      ...wallet,
      balance: value,
    })
  }

  const handleAddWallet = async () => {
    if (!wallet.address || !wallet.balance || isNaN(parseFloat(wallet.balance as any))) return

    await addWallet(wallet)
    setWallet(INITIAL_WALLET)
  }

  const isButtonDisabled = !wallet.address || !wallet.balance || status === STATUS.ADDING_WALLET
  const buttonColor = isButtonDisabled ? 'gray' : 'blue'

  return (
    <div className="grid gap-y-2 w-full md:w-6/12 border border-b rounded-xl border-gray-300 p-4 bg-gray-100 m-1">
      <label className='font-bold text-center'>Add wallet</label>
      <div className="flex flex-col w-full">
        <label>Address</label>
        <input
          onChange={(e) => handleSetWalletAddress(e.target.value)}
          value={wallet?.address}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex w-full justify-between items-end">
        <div className="w-2/5">
          <label>Balance:</label>
          <input
            onChange={(e) => handleSetWalletBalance(e.target.value)}
            value={wallet?.balance}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-700 active:bg-${buttonColor}-500 text-white font-bold py-2 px-4 rounded w-3/5 h-12 mt-2 ml-2`}
          onClick={handleAddWallet}
          disabled={isButtonDisabled}
        >
          {status === STATUS.ADDING_WALLET ? <Spinner  size="sm" /> : 'Add'}
        </button>
      </div>
    </div>
  )
}

export default AddWallet
