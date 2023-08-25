import { useGlobalContext } from "../context/globalContext"
import { Exchange } from "../types"
import { ChangeEvent, useEffect, useState } from "react"
import Spinner from "./spinner"
import { STATUS } from "../constants"

type ExchangeRateProps = {
  exchangeRates: Exchange[]
}

const ExchangeRate = ({ exchangeRates }: ExchangeRateProps) => {
  const [exchangeRate, setExchangeRate] = useState<Exchange | null>(null)

  const { globalExchangeRateState: { status, }, updateExchange, } = useGlobalContext()

  useEffect(() => {
    if(exchangeRates.length && !exchangeRate) setExchangeRate(exchangeRates[0])
  }, [exchangeRates])

  const handleSetRate = (rate: string) => {
    if (isNaN(rate as any) || !exchangeRate) return 

    setExchangeRate({
      ...exchangeRate,
      rate,
    })
  }

  const handleChangeExchange = async (evt: ChangeEvent<HTMLSelectElement>) => {
    let value = evt?.currentTarget?.value
    if (isNaN(value as any)) return
    const selectedId = parseInt(value)

    const selectedExchangeRate = exchangeRates.find(er => er.id === selectedId)
    if (selectedExchangeRate) setExchangeRate(selectedExchangeRate)
  }

  const handleUpdateExchangeRate = async () => {
    if (!exchangeRate?.rate || isNaN(parseFloat(exchangeRate.rate as any))) return

    await updateExchange(exchangeRate)
  }

  const isButtonDisabled = !exchangeRate?.rate || status === STATUS.SAVING_EXCHANGE_RATE
  const buttonColor = isButtonDisabled ? 'gray' : 'blue'

  return (
    <div className="grid gap-y-2 w-full md:w-6/12 border border-b rounded-xl border-gray-300 p-4 bg-gray-100 m-1">
      {
        status === STATUS.LOADING || !exchangeRate ? (
          <Spinner />
        ) : (
          <>
            <label className='font-bold text-center'>Exchange rate</label>
            <div className="flex flex-col w-full">
              <select
                className="py-3 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 cursor-pointer"
                onChange={handleChangeExchange}
                value={exchangeRate.id}
              >
                {
                  exchangeRates?.map(er => <option key={er.id} value={er.id}>{`${er.currencyDescription} to ETH`}</option>)
                }
              </select>
            </div>
            <div className="flex w-full justify-between items-end">
              <div className="w-2/5">
                <label>Rate:</label>
                <input
                  onChange={(e) => handleSetRate(e.target.value)}
                  value={exchangeRate.rate}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-700 active:bg-${buttonColor}-500 text-white font-bold py-2 px-4 rounded w-3/5 h-12 mt-2 ml-2`}
                onClick={handleUpdateExchangeRate}
                disabled={isButtonDisabled}
              >
                {status === STATUS.SAVING_EXCHANGE_RATE ? <Spinner size="sm" /> : 'Update'}
              </button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ExchangeRate
