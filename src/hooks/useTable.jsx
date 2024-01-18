import {useContext} from 'react'
import TableContext from '../context/TableProvider'
const useTable = () => {
  return useContext(TableContext)
}
export default useTable