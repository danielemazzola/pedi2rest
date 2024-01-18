import { useTranslation } from 'react-i18next'
import useCategories from '../../hooks/useCategories'
import LoadingCat from '../../components/LoadingCat'
import date from '../../helpers/date'
const CategoriesList = ({cat}) => {
    const [t] = useTranslation('global') 
    const {loading, handleEditCategory} = useCategories()
    const {name, description, image, open, close, create, _id} = cat
  return (
    <div key={_id} onClick={e => handleEditCategory(_id)} className='flex flex-col md:flex-row rounded-lg m-3 text-xl justify-center items-center cursor-pointer'>
        { loading ? <LoadingCat /> : 
            <>
                <div className="hover:opacity-50 transition-all delay-50 duration-200 hover:animate-wiggle">
                    <img src={image} alt='Image' className='w-96 h-64 bg-cover rounded-lg opacity-80' />
                </div>
                <div className="absolute bg-black opacity-70 rounded-lg px-7 py-7 w-56">
                    <div className="text-center">
                        <h2 className='text-white text-xl font-bold uppercase opacity-100'>{name}</h2>
                        <h2 className='text-white text-sm text-start my-1'>{description}</h2>
                    </div>
                    <div className="text-center bg-gray-200 rounded">
                        <p className='text-sm opacity-100'>{t('myCategories.open')} <span className='font-bold'>{open}h.</span></p>
                        <p className='text-sm opacity-100'>{t('myCategories.close')} <span className='font-bold'>{close}h.</span></p>
                    </div>
                    <div className='text-end mt-4'>
                        <p className='text-white text-xs opacity-100'>{t('myCategories.created')} {date(create)}</p>
                    </div>
                </div>
            </>
        }  
    </div>
  )
}
export default CategoriesList