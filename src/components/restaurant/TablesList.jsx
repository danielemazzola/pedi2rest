import { useTranslation } from 'react-i18next'
import useRestaurant from '../../hooks/useRestaurant'
import useTable from '../../hooks/useTable'
import Tables from '../../components/restaurant/Tables'
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import Loading from '../../components/Loading'
import triste from '../../img/dano.png'
const TablesList = () => {
    const [t] = useTranslation('global')
  const {loading, msg} = useTable()
  const {getTable} = useRestaurant()
  return (
    <div className='my-10 px-4'>
        <HeadTitleDescription title={t('tableList.title')} description={t('tableList.description')} />
        <div className=''>
        { loading ? 
            <Loading />
            :
            <>
            { msg ? 
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-xl text-rose-500 my-5'>{msg}</p>
                    <img src={triste} alt='sad heart' className='w-40  my-5' />
                </div>
                :
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-10'>
                    { getTable.map( (tables) => tables &&
                        <Tables
                            key={tables._id}
                            tables={tables}
                        />
                    ) }
                </div>
            }
            </>
        }
        </div>
        </div>
  )
}
export default TablesList