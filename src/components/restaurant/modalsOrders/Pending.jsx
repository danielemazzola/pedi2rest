import {useRef} from 'react'
import useOrders from '../../../hooks/useOrders'
import datehour from '../../../helpers/datehour'
import { useReactToPrint } from 'react-to-print'
import Loading from '../../Loading'
const Pending = ({pending}) => {
  const {handlePaid, handleProcesse, handleCancel, loadingPaid} = useOrders()
  const {_id, orderId, user, cart, totalCart, paid, createdAt} = pending
  const componentRef = useRef()
  const handlePrintOrder = useReactToPrint({
    content : () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => alert('Print Success')
})
  const time = datehour(createdAt) 
  if(loadingPaid) return <Loading />
  else return (
    <div key={_id} className='p-5 bg-white rounded-lg my-3'>
      <div ref={componentRef} className='p-3'>
        <div className='flex flex-col bg-white rounded-xl'>
          <h5 className='text-sm font-bold uppercase bg-rose-300 py-2 text-center rounded-lg my-2'>{pending && 'PENDING'}</h5>
        </div>
        <div className='flex flex-col bg-white rounded-xl'>
          <h5 className='text-sm font-bold uppercase'>order id</h5>
          <span className='text-sm'>{orderId}</span>
        </div>
        <div className='flex flex-col rounded-lg'>
          <h3 className='text-sm font-bold'>Payment information</h3>
          <div className='bg-white p-1 rounded-lg mt-1 flex flex-col'>
            <div className='flex'>
              <p className='text-sm'>Paid -</p>
              <button onClick={e => handlePaid(_id)} className={`${paid ? 'bg-green-600' : 'bg-rose-600'} ml-1 text-xs font-bold text-white py-1 px-2 rounded-xl`}>{paid ? 'Yes' : 'Not'}</button>
            </div>
            <p className='text-sm'>Total  <span className='font-bold'>{totalCart}</span>€</p>
          </div>
        </div>
        <div className='flex flex-col my-2'>
          <h3 className='text-xs font-bold uppercase'>Customer information</h3>
          <div className='bg-white p-1 rounded-lg mt-1'>
            <p className='text-sm text-gray-500'>User - <span className='font-semibold text-gray-800'>{user.user}</span></p>
            <p className='text-sm text-gray-500'>Email - <span className='font-semibold text-gray-800'>{user.email}</span></p>
            <p className='text-sm text-gray-500'>Tlf - <span className='font-semibold text-gray-800'>{user.telephone}</span></p>
          </div>
        </div>
        <div className='flex flex-col my-2'>
          <p className='text-sm font-bold uppercase'>Order information</p>
          <div className='text-sm'>{cart.map( cart => (
            <div key={cart._id} className='bg-white p-1 rounded-lg'>
              <p>Plate - <span className='font-semibold'>{cart.name}</span></p>
              <p>Amount - <span className='font-semibold'>{cart.amount}</span></p>
              <p>{cart.comment !== undefined ? `Comment - ${cart.comment}` : `Comment - No`}</p>
            </div>
          ))}</div>
        </div>
        <div className='flex flex-col'>
        <p className='text-sm font-bold'>Hour</p>
            <div className='bg-white p-1 rounded-lg mt-1'>
              <p className='text-sm'>Date: <span className='font-semibold'>{time.init}</span></p>          
              <p className='text-sm'>Hour: <span className='font-semibold'>{time.initHour}</span></p>        
            </div>
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <button onClick={e => handleProcesse(_id)} className='my-1 bg-sky-400 hover:bg-sky-500 px-3 py-2 rounded-lg w-full text-white'>
          Process
        </button>
        <button onClick={handlePrintOrder} className='my-1 bg-green-400 hover:bg-green-500 text-white px-2 py-2 rounded-lg w-full'>Print Order</button>
        <button onClick={e => handleCancel(_id)} className='my-1 bg-rose-300 px-3 py-2 rounded-lg w-full hover:bg-rose-400 text-white'>Cancel</button>
      </div>
    </div>
  )
}
export default Pending