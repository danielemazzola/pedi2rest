import {useTranslation} from 'react-i18next'
import useCategories from '../../hooks/useCategories'
import useProducts from '../../hooks/useProducts'
import AllergensMap from '../../helpers/AllergensMap'
import date from '../../helpers/date'
import Loading from '../Loading'
const Product = ({products}) => {
    const [t] = useTranslation('global')
    const {visible, create, name, description, image, categories, allergens, price, _id}=products
    const {loadingImage, handleEditProduct, loading} = useProducts()
    const {getCategories} = useCategories()
    
  return (
    <>
      { loadingImage ? <Loading /> : 
            <div key={_id} className='flex flex-col md:flex-row rounded-lg m-3 mb-10 text-xl justify-center items-center cursor-pointer' onClick={e => handleEditProduct(_id)}>
                <div className="hover:opacity-50 transition-all delay-50 duration-200 hover:animate-wiggle">
                    <img src={image} alt='Image' className='w-96 h-64 bg-cover rounded-lg opacity-80'  />
                </div>
                <div className="absolute bg-black opacity-70 rounded-lg py-7 w-64">
                    <div className="mb-2 px-4">
                        <h2 className='text-yellow-200 text-lg font-bold uppercase opacity-100 text-center'>{getCategories.map((categories) => categories._id === products.categories && <p key={categories._id} className='flex flex-col'>{categories.name}</p>)}</h2>
                        <h3 className='text-sky-200 text-sm font-bold uppercase opacity-100'>{name}</h3>
                        <p className='text-rose-200 text-xs text-start my-1'>{description}</p>
                    </div>
                    <div className="text-center bg-gray-200 rounded mx-4">
                        <p className='text-sm opacity-100'><span className='font-bold'>{visible ? t('productList.visibleTrue') : t('productList.visibleFalse')}</span></p>
                    </div>
                    <div className="flex items-center mt-1 px-4">
                        {allergens.length <= 0 ? null : 
                            <>
                                <h2 className='text-red-100 capitalize text-xs opacity-100'>{allergens.length <= 1 ? t('productList.allergen') : t('productList.allergens')}</h2>
                                <p className='text-white text-xs font-bold capitalize opacity-100 px-1'>{AllergensMap(allergens)}</p>
                            </>
                        }
                    </div>
                    <div className="w-full flex justify-end mt-4">
                        <p className="bg-yellow-400 text-lg text-black px-2 py-0.5 rounded-l-lg flex items-center justify-start ">{price}€</p>
                    </div>
                    <div className='text-end mt-4 px-4'>
                        <p className='text-white text-xs opacity-100'>{t('productList.createDateProduct') +' : '+ date(create)}</p>
                    </div>
                </div>
            </div>
        }  
    </>
  )
}
export default Product