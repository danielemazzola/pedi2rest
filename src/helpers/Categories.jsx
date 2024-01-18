import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import useProducts from '../hooks/useProducts'
import Animated from 'react-select/animated'
const Categories = ({getCategories, category}) => {
  const [t] = useTranslation('global')
  const {handleSelectCategory}= useProducts()
  return (
    <Select 
      options={getCategories} 
      getOptionValue={(options) => options._id} 
      getOptionLabel={(options) => options.name} 
      placeholder={t('products.getCategoryPlaceHolder')} 
      components={Animated()}
      className='text-center'
      onChange={handleSelectCategory}
      value={category}
    />
  )
}
export default Categories