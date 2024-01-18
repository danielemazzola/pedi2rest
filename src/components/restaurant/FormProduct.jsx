import { useTranslation } from 'react-i18next'
import useCategories from '../../hooks/useCategories'
import useProducts from '../../hooks/useProducts'
import {options} from '../../helpers/allergensValues'
import { motion } from 'framer-motion'
import Allergens from '../../helpers/Allergens'
import Categories from '../../helpers/Categories'
import Loading from '../../components/Loading'
const FormProduct = () => {
    const [t] = useTranslation('global') 
    const {
      handleNewProduct,
      handleEditOneProduct,
      edit,
      editProduct,
      handleImage,
      loadingImage,
      handleCancelEditProduct
    } = useProducts()
    const {
      getCategories,
      productId, setProductId,
      plateName, setPlateName,
      plateDescription, setPlateDescription,
      show, setShow,
      category, setCategory,
      allergens, setAllergens,
      price, setPrice,
      uploadImage, setUploadImage,
    } = useCategories()
  const list = {
    visible: ({
        opacity: 1,
        transition: {
          delay:  0.5,
        },
      }),
    hidden: { opacity: 0 },
  }
  const item = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.6} },
    hidden: { opacity: 0, y: -100 },
  }
    return (
        <motion.div className='my-10 w-full lg:w-1/2' key={edit && editProduct._id}  initial='hidden' animate='visible' variants={list}>
          <div className='flex items-center justify-center bg-gray-200 rounded-t-lg'>
            <p className='my-2 text-2xl'>{ edit ? t('products.edit_Product') : t('products.new_Product') }</p>
          </div>
          <div className='flex flex-col-reverse sm:flex-row sm:justify-between w-full'>
            <form className='flex flex-col w-full sm:w-1/2' onSubmit={!edit ? handleNewProduct : handleEditOneProduct}>
              <motion.label variants={item} className='px-2 py-2 my-1 bg-gray-300 text-white font-bold text-center rounded'>
                {t('products.formCategories')}
              </motion.label>
              <Categories getCategories={getCategories} category={category} />
              <motion.input variants={item} value={plateName} onChange={e => setPlateName(e.target.value)} type='text' className='p-2 my-1' placeholder={t('products.formPlateName')}  />
              <motion.textarea variants={item} value={plateDescription} onChange={e => setPlateDescription(e.target.value)} type='text' className='p-2 my-1' placeholder={t('products.formDescription')} />
              { show ? 
                <motion.button 
                  variants={item} 
                  value={show}
                  onClick={e=> setShow(!show)}
                  type='button' 
                  className='bg-amber-400 py-2 text-white font-semibold'>
                    {t('products.formShowTrue')}
                </motion.button>
                :
                <motion.button 
                  variants={item} 
                  value={show}
                  onClick={e => setShow(!show)}
                  type='button' 
                  className='bg-emerald-400 py-2 text-white font-semibold'>
                    {t('products.formShowFalse')}
                </motion.button>
              }
              <motion.label variants={item} className='px-2 py-2 my-1 bg-gray-300 text-white font-bold text-center rounded'>
                {t('products.formAllergens')}
              </motion.label>
              <Allergens options={options} allergens={allergens} />
              <motion.input variants={item} value={price} onChange={e => setPrice(e.target.value)} type='number' className='p-2 my-1' placeholder={t('products.formPrice')}  />
              { !edit ?
                <motion.input variants={item} whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }} type='submit' value={t('products.formImputCreate')} className='mt-2 rounded-lg py-2 bg-sky-400 text-white font-semibold hover:bg-sky-500 cursor-pointer'/>
                :
                <>
                  <motion.input variants={item} whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }} type='submit' value={t('products.formImputEdit')} className='mt-2 rounded-lg py-2 bg-sky-400 text-white font-semibold hover:bg-sky-500 cursor-pointer'/>
                  <motion.button variants={item} whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }} type='button' onClick={handleCancelEditProduct} className='mt-2 rounded-lg py-2 bg-rose-400 text-white font-semibold hover:bg-rose-500 cursor-pointer'>{t('products.formImputCancel')}</motion.button>
                </>
              }
            </form>
            <div className='w-full sm:w-1/2 flex items-center justify-center my-2 sm:my-0 sm:mt-1 sm:ml-1'>
              <div className='w-full sm:bg-slate-300 rounded-b-lg min-h-full flex justify-center rounded'>                
                <input type='file' name='file' id='file' onChange={handleImage} className='hidden' accept='.jpg, .jpeg, .png' />
                { loadingImage ? 
                  <div className='flex flex-col justify-center items-center sm:w-full'>
                    <Loading /> 
                  </div>
                  : 
                  <>
                  { uploadImage === '' ? 
                      <div className='flex flex-col justify-center items-center sm:w-full'>
                        <label className='bg-white cursor-pointer rounded-lg text-gray-500 text-xl px-2 py-2 hover:bg-gray-100' htmlFor='file'>{t('products.formImputImageSelect')}</label>
                      </div>
                      : 
                      <div className='flex flex-col justify-start items-center sm:w-full'>
                        <img className='w-full h-52 bg-cover bg-center opacity-50' src={uploadImage} />
                        <label className='relative bg-yellow-200 hover:bg-gray-100 cursor-pointer px-2 py-2 rounded-lg text-gray-500 text-xl mt-4
                        ' htmlFor='file'>{t('products.formImputImageEdit')}</label>
                      </div>
                      }
                  </>
                }
              </div>
            </div>
          </div>
        </motion.div>
      )
}
export default FormProduct