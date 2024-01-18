import useOrders from '../../hooks/useOrders'
import useRestaurant from '../../hooks/useRestaurant'
import { useTranslation } from 'react-i18next'
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import {motion} from 'framer-motion'
import Loading from '../../components/Loading'
import TablesShop from '../../components/restaurant/TablesShop'
const Sales = () => {
    const [t] = useTranslation('global')
    const {getTable,
        process,
        pending
    } = useRestaurant()
    const {
        loadingOrders
     } = useOrders()
    
    return (
    <section className='my-10 px-4'>
        <HeadTitleDescription title={t('purchases.title')} description={t('purchases.description')} />
        <div className='my-10'>
            {<div className='flex justify-start'>
                {pending.map((o, index) => o.account && !o.paid ?
                    <div className='bg-sky-800 mx-2 p-2 rounded-lg'>
                        <div className=' text-white'>
                            <p className=''>The bill, please</p>
                        </div>
                        <div className='p-1 text-sky-800 bg-white rounded'>
                            <p key={index} className='flex items-center justify-center text-xl font-bold'>Table: {o.table.num}</p>
                        </div>
                        <div className='my-2'>
                        <p className='text-xs text-white'>Customer:</p>
                            <p className='text-sm text-white'>{o.user.user}</p>
                            <p className='text-sm bg-white text-center font-bold rounded'>{o.totalCart}€</p>
                        </div>
                    </div>
                : null)}
                {process.map((o, index) => o.account && !o.paid ? 
                    <div className='bg-sky-800 mx-2 p-2 rounded-lg'>
                        <div className=' text-white'>
                            <p className=''>The bill, please</p>
                        </div>
                        <div className='p-1 text-sky-800 bg-white rounded'>
                            <p key={index} className='flex items-center justify-center text-xl font-bold'>Table: {o.table.num}</p>
                        </div>
                        <div className='my-2'>
                        <p className='text-xs text-white'>Customer:</p>
                            <p className='text-sm text-white'>{o.user.user}</p>
                            <p className='text-sm bg-white text-center font-bold rounded'>{o.totalCart}€</p>
                        </div>
                    </div>
                : null)}
            </div>}
        </div>
        <div>
            <div className='flex flex-col justify-center items-center my-10'>
                <p id='pending' className='text-4xl uppercase text-gray-500'>Pending list</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                <>
                    {getTable.map((table, index) => table && (
                        <div key={index}>
                            {loadingOrders ? <Loading /> :
                                <TablesShop table={table} />
                            }
                        </div>
                    ))}
                </>
            </div>
        </div>   
    </section>
    )
}
export default Sales