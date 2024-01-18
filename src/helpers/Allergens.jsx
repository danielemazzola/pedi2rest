import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import useProducts from '../hooks/useProducts'
import Animated from 'react-select/animated'
const Allergens = ({options, allergens}) => {
  const [t] = useTranslation('global')
  const {handleSelectAllergens}=useProducts()
  return (
    <Select 
      isMulti={true} 
      options={options} 
      getOptionValue={(options) => options.value} 
      getOptionLabel={(options) => options.label} 
      placeholder={t('products.getAllergensPlaceHolder')} 
      components={Animated()} 
      className='text-center'
      onChange={handleSelectAllergens}
      value={allergens}
    />
  )
}
export default Allergens