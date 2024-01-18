import { useState } from 'react'
import {useTranslation} from 'react-i18next'
import useTable from '../../hooks/useTable'
import Process from './modalsOrders/Process'
const TablesShopProcess = ({table, process}) => {
    const [t] = useTranslation('global')
    const {num, stateTable, available, _id, customers} = table
    const [open, setOpen] = useState(false)
    const {handleChangeAvailable} = useTable()
    const tableStateProcess = process.filter(p => p.table._id === _id && p).some(p => p.process = true)
    const ordersLength = process.filter(p => p.table._id === _id && p)
    return (
    <div key={_id} className='flex flex-col m-3 mb-10 text-xl justify-center items-center'>
        <div className={`${tableStateProcess ? 'bg-gradient-to-t from-emerald-400 to-emerald-600 opacity-90':'bg-gradient-to-t from-sky-400 to-sky-500 opacity-90' } opacity-70 rounded-lg  px-4 py-7 w-64 shadow-xl`}>
            <div className="mb-2">
                <h2 className='text-sky-100 text-sm capitalize opacity-100'>{t('tableList.tableNumber')} 
                    <span className='font-bold mx-2 text-lg'>{num}</span>
                </h2>
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
                <button className='bg-white w-full rounded mr-1 text-sm text-gray-600'>
                    {t('tableList.orders')}
                    <span className='font-semibold ml-2'>{ordersLength.length}</span>
                </button>
            </div>
            {tableStateProcess &&
            <div>
                <div>
                    <button 
                        className='w-full text-emerald-500 font-bold rounded-lg text-center mt-2 bg-white px-2 py-1 text-sm'
                        onClick={e => setOpen(!open)}
                    >
                        {`Orders in Process ${!open ? '(show)' : '(no show)'}`}
                    </button>
                </div>
                <div>
                    { open && 
                        <>
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
export default TablesShopProcess