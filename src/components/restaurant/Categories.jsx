import { useTranslation } from 'react-i18next'
import useCategories from '../../hooks/useCategories'
import triste from '../../img/dano.png'
import CategoriesList from './CategoriesList'
const Categories = () => {
  const [t] = useTranslation('global')
  const {getCategories, msg} = useCategories()
  return (
    <div className='my-10 px-4'>
      <div className='flex flex-col justify-start'>
        <h3 className='text-4xl text-gray-600 uppercase'>{t('myCategories.yourCategories')}</h3>
        <p className='text-sm text-gray-600 pl-5 mt-3'>{t('myCategories.yourCategoriesDescription')}</p>
      </div>
      <div className=''>
        { msg != '' ? 
            <div className='flex flex-col justify-center items-center'>
                <p className='text-xl text-rose-500 my-5'>{msg}</p>
                <img src={triste} alt='sad heart' className='w-40  my-5' />
            </div>
            :
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10'>
                {
                  getCategories.map( (cat) => cat && (
                      <CategoriesList
                          key={cat._id}
                          cat={cat}
                      />
                  ))
                }
            </div>
        }
      </div>
    </div>
  )
}
export default Categories