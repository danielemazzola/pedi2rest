import { useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel';
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import useRestaurant from '../../hooks/useRestaurant'
import datesales from '../../helpers/datesales'
import dateorderToDay from '../../helpers/dateorderToDay'
import date from '../../helpers/date'
import totalsales from '../../helpers/totalsales'
const Sales = () => {
  const tableRef = useRef(null)
  const {sales} = useRestaurant() 
  const t = new Date()
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename : 'PEDI2 - ' + date(t),
    sheet : date(t)
  })
  const totCart = sales.map((sale, index) => dateorderToDay(sale.createdAt) && sale.totalCart )
  return (
    <section className='my-10 px-4'>
        <HeadTitleDescription title='sales' description='In this section you can see all the operations of today' />
        <div className='bg-gradient-to-r from-emerald-300 to-sky-300 w-full rounded-lg mt-10'>
          <table className='w-full' ref={tableRef}>
            <tbody className=''>
              <tr className=''>
                <th className='text-white'>Date</th>
                <th className='text-white'>Order ID</th>
                <th className='text-white'>Customer</th>
                <th className='text-white'>Table</th>
                <th className='text-white'>Products</th>
                <th className='text-white'>Amount</th>
                <th className='text-white'>Paid</th>
                <th className='text-white'>Total</th>
              </tr>
            </tbody>
            {sales.filter(sale => sale.finishOk).map((sale, index) => dateorderToDay(sale.createdAt) &&
              <tbody key={sale._id} className='odd:bg-gradient-to-r from-emerald-100 to-sky-200 text-gray-600 bg-white'>
                <tr className=''>
                    <td className='border text-xs px-1'>{datesales(sale.createdAt)}</td>
                    <td className='border text-xs px-1'>{sale.orderId}</td>
                    <td className='border text-xs px-1'>{sale.user.user}</td>
                    <td className='border text-xs px-1 text-center'>{sale.table.num}</td>
                    <td className='border text-xs px-1'>{sale.cart.map((p, index) => (
                      <div key={index} className='flex justify-between'>
                        <p className='w-full'>{p.name}</p>
                      </div>
                    ))}</td>
                    <td className='border text-xs px-1'>{sale.cart.map((p, index) => (
                      <div key={index} className='flex justify-between'>
                        <p className='w-1/6 text-center'>{p.amount}</p>
                      </div>
                    ))}</td>
                    <td className='border text-xs text-center px-1'>{sale.paid ? 'Yes' : 'Not'}</td>
                    <td className='border text-xs px-1'>{sale.totalCart}</td>
                </tr>
              </tbody>
            ).reverse()}
          </table>
          <div className='flex justify-end items-center px-3 py-2'>
            <p className='text-white'>Total: {totalsales(totCart)}€</p>
          </div>
        </div>
        <div className='flex justify-end items-center my-5'>
          <button className='bg-emerald-400 text-white px-2 py-1 rounded hover:bg-green-500'onClick={onDownload}>Import Excel</button>
        </div>
    </section>
  )
}
export default Sales