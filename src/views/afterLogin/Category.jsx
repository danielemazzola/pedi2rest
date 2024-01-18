import { useTranslation } from 'react-i18next'
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import FormCategory from '../../components/restaurant/FormCategory'
import Categories from '../../components/restaurant/Categories'
import useCategories from '../../hooks/useCategories'
import Loading from '../../components/Loading'
const Caregory = () => {
  const [t] = useTranslation('global')
  const {loadingCategories, loadingNewCategories, handleOpenCategory, createCategory}=useCategories()
  return (
    <section className="my-10 px-4">
      <HeadTitleDescription title={t('category.title')} description={t('category.description')} />
      <button className={`${createCategory ? 'bg-rose-400 hover:bgrose-500 translate-x-56':'bg-sky-400 hover:bg-sky-500 translate-x-0' } mt-3 cursor-pointer px-2 py-1 text-white rounded-lg font-bold transition-all delay-200 duration-300 ease-in-out`} onClick={handleOpenCategory}>{createCategory ? t('category.close') : t('category.create')}</button>
      <div className="flex justify-center">
        {loadingNewCategories ? <Loading /> : 
          <>
            { createCategory && <FormCategory /> }
          </>
        }
      </div>
      <div className="">
        { loadingCategories ? <Loading /> : 
          <Categories />
        }
      </div>
    </section>
  )
}
export default Caregory