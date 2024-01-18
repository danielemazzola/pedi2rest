import useRestaurant from '../hooks/useRestaurant'
const AlertAccount = ({alertAccount}) => {
  const {id, error, msgAccount} = alertAccount
  const {handleCloseAlertAccount}=useRestaurant()
  if(error && msgAccount !== '') {
    return (
      <div
        className='bg-rose-400 rounded-lg text-white flex justify-between items-center -translate-y-56 mx-1 mt-2 z-40'
      >
        <span className='px-4'>{msgAccount}</span>
        <button className='bg-rose-400 hover:bg-gray-100 hover:text-rose-400 px-5 py-3 rounded-r-lg'
          onClick={e => handleCloseAlertAccount(id)}>x</button>
      </div>
    );
  }
  if(error == false && msgAccount !== '') {
    return (
      <div
        className='bg-green-500 rounded-lg text-white flex justify-between items-center -translate-y-56 mx-1 mt-5'
      >
        <p className='px-4 font-semibold uppercase'>{msgAccount}</p>
        <button className='bg-green-500 hover:bg-gray-100 hover:text-green-400 px-5 py-8 rounded-r-lg'
          onClick={e => handleCloseAlertAccount(id)}>x</button>
      </div>
    );
  }
  if(alertAccount === '') {}
    return (
      <div
        className='bg-white'
      >
      </div>
    );
  }
  export default AlertAccount;