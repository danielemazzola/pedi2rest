import { useState } from 'react'
import {useTranslation} from 'react-i18next'
import useTable from '../../hooks/useTable'
import useRestaurant from '../../hooks/useRestaurant'
import Pending from './modalsOrders/Pending'
import Process from './modalsOrders/Process'
const TablesShop = ({table}) => {
    const {handleChangeAvailable} = useTable()
    const {pending, process} = useRestaurant()
    const {num, stateTable, available, _id, customers} = table
    const [t] = useTranslation('global')
    const [open, setOpen] = useState(false)
    const ordersLength = pending.filter(p => p.table._id === _id)
    const ordersLengthProcess = process.filter(p => p.table._id === _id)
    return (
    <div key={_id} className='flex flex-col m-3 mb-10 text-xl justify-center items-center'>
        <div className={`${ordersLength.length + ordersLengthProcess.length >= 1 ? 'bg-gradient-to-t from-green-300 to-sky-900 opacity-90':'bg-gradient-to-t from-sky-300 to-sky-600 opacity-90' } opacity-70 rounded-lg  px-4 py-7 w-64 shadow-xl`}>
            <div className="mb-2">
                <h2 className='text-sky-100 text-sm capitalize opacity-100'>{t('tableList.tableNumber')} 
                    <span className='font-bold mx-2 text-lg'>{num}</span>
                </h2>
                {ordersLength.length >= 1 &&
                    <div className='absolute translate-x-52 -translate-y-10'>
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                        </span>
                    </div>
                }
            </div>
            <div className="text-center bg-white rounded my-2">
                <p className='text-sm'>
                    <span className='font-semibold text-gray-600 capitalize'>{stateTable ? t('tableList.stateTableTrue') : t('tableList.stateTableFalse')}</span>
                </p>
            </div>
            <div>
                <button className='bg-white w-full rounded text-sm cursor-pointer font-semibold text-gray-600' onClick={e => handleChangeAvailable(_id)}>
                    {available ? t('tableList.availableTrue') : t('tableList.availableFalse')}
                </button>
            </div>
            <div className="flex mt-3">
                <button className='bg-white w-full rounded mr-1 text-sm text-gray-600'>
                    {t('tableList.customers')}
                    <span className='font-semibold ml-2'>{customers}</span>
                </button>
            </div>
            <div className="flex mt-3">
                <button className={`${ordersLength.length + ordersLengthProcess.length >= 1 ? 'bg-green-400 text-white' : 'bg-white'} py-1 w-full rounded mr-1 text-sm`}>
                    {t('tableList.orders')}
                    <span className='font-semibold ml-2'>{ordersLength.length + ordersLengthProcess.length}</span>
                </button>
            </div>
            {ordersLength.length + ordersLengthProcess.length >= 1 &&
                <div>
                    <div>
                        <button 
                            className='w-full font-bold rounded-lg text-center mt-2 bg-white px-2 py-1 text-sm'
                            onClick={e => setOpen(!open)}
                        >
                            {`Orders list ${!open ? '+' : '(Close)'}`}
                        </button>
                    </div>
                    <div>
                        { open && 
                            <>
                                {pending.map((pending, index) => pending.table._id ===  _id && (
                                    <div key={index}>
                                        <Pending pending={pending} />
                                    </div>
                                ))}
                                {process.map((process, index) => process.table._id ===  _id && (
                                    <div key={index}>
                                        <Process processes={process} />
                                    </div>
                                ))}        
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    </div>
    )
}
export default TablesShop