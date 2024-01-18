import {useContext} from 'react'
import CategoryContext from '../context/CategoriesProvider'
const useCategories = () => {
  return useContext(CategoryContext)
}
export default useCategories