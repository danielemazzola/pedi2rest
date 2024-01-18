import {useTranslation} from 'react-i18next'
import HeadTitleDescription from '../restaurant/HeadTitleDescription'
import useProducts from '../../hooks/useProducts'
import Product from '../../components/restaurant/Product'
import Loading from '../../components/Loading'
import triste from '../../img/dano.png'
const ProductsList = () => {
  const [t] = useTranslation('global')
  const {msg, loadingProducts, getProducts, loading} = useProducts()
  return (
    <div className='my-10 px-4'>
      <HeadTitleDescription title={t('productList.title')} description={t('productList.description')} />
      <div className=''>
      { loadingProducts ? 
        <Loading />
        :
        <>
          { msg ? 
              <div className='flex flex-col justify-center items-center'>
                  <p className='text-xl text-rose-500 my-5'>{msg}</p>
                  <img src={triste} alt='sad heart' className='w-40  my-5' />
              </div>
              :
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10'>
                  { getProducts.map( (products, index) => products &&
                    <Product
                      key={index}
                      products={products}
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
export default ProductsList