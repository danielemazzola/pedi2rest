import useRestaurant from '../hooks/useRestaurant'
const AlertPartner = ({alert}) => {
  const {handleCloseAlertPartner}=useRestaurant()
  if(alert.error && alert.msg !== '') {
    return (
      <div
        className='absolute bg-rose-400 rounded-lg text-white flex justify-between items-center -translate-y-56 mx-1 mt-2 z-40'
      >
        <span className='px-4'>{alert.msg}</span>
        <button className='bg-rose-400 hover:bg-gray-100 hover:text-rose-400 px-5 py-3 rounded-r-lg'
          onClick={handleCloseAlertPartner}>x</button>
      </div>
    );
  }
  if(alert.error == false && alert.msg !== '') {
    return (
      <div
        className='absolute bg-sky-400 rounded-lg text-white flex justify-between items-center -translate-y-56 mx-1 mt-2'
      >
        <span className='px-4'>{alert.msg}</span>
        <button className='bg-sky-400 hover:bg-gray-100 hover:text-sky-400 px-5 py-3 rounded-r-lg'
          onClick={handleCloseAlertPartner}>x</button>
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
  export default AlertPartner;