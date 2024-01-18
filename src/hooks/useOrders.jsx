import {useContext} from 'react'
import OrdersContext from '../context/OrdersProvider'
const useOrders = () => {
  return useContext(OrdersContext)
}
export default useOrders