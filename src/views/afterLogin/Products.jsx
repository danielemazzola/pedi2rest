import { useTranslation } from 'react-i18next'
import useProducts from '../../hooks/useProducts'
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import FormProduct from '../../components/restaurant/FormProduct'
import ProductsList from '../../components/restaurant/ProductsList'
import Loading from '../../components/Loading'
const Products = () => {
  const [t] = useTranslation('global')
  const {loading, createProduct, handleOpenProduct} = useProducts()
  return (
    <section className="my-10 px-4">
      <HeadTitleDescription title={t('products.title')} description={t('products.description')} />
      <button className={`${createProduct ? 'bg-rose-400 hover:bgrose-500 translate-x-56':'bg-sky-400 hover:bg-sky-500 translate-x-0'} mt-3 cursor-pointer px-2 py-1 text-white rounded-lg font-bold transition-all delay-200 duration-300 ease-in-out`} onClick={handleOpenProduct}>{createProduct ? t('products.close') : t('products.create')}</button>
      <div className="flex justify-center">
        {loading ? <Loading /> : 
          <>
            { createProduct && <FormProduct /> }
          </>
        }
      </div>
      <div className="">
        <ProductsList />
      </div>
    </section>
  )
}
export default Products