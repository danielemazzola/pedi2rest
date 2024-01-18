import useRestaurant from '../hooks/useRestaurant'
const AlertOrder = ({alert}) => {
  const {alertOrder, setAlertOrder}=useRestaurant()
  const { msgOrder, error, id } = alert
  const handleCloseAlertOrder = (id) => {
    const update = alertOrder.filter(a => a.id !== id)
    setAlertOrder(update)
  }
  if(error && msgOrder !== '') {
    return (
      <div
        className='bg-green-400 rounded-lg text-white flex justify-between items-center -translate-y-56 mx-1 mt-2 z-40'
      >
        <span className='px-4'>{msgOrder}</span>
        <button className='bg-green-400 hover:bg-gray-100 hover:text-green-400 px-5 py-3 rounded-r-lg'
          onClick={e => handleCloseAlertOrder(id)}>x</button>
      </div>
    );
  }
  if(error == false && msgOrder !== '') {
    return (
      <div
        className='bg-sky-500 rounded-lg text-white flex justify-between items-center -translate-y-56 mx-1 mt-5'
      >
        <p className='px-4 font-semibold uppercase'>{msgOrder}</p>
        <button className='bg-sky-500 hover:bg-gray-100 hover:text-sky-400 px-5 py-8 rounded-r-lg'
          onClick={e => handleCloseAlertOrder(id)}>x</button>
      </div>
    );
  }
  if(alert === '') {}
    return (
      <div
        className='bg-white'
      >
      </div>
    );
  }
  export default AlertOrder;