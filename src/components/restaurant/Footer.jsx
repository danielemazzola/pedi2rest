import olla from '../../img/olla.png'
const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
  return (
    <footer className='bg-gray-500 text-white py-5 flex flex-col sm:flex-row sm:justify-around items-center'>
        <div className='sm:my-0 my-2'>
            <div className='flex'>
                <img src={olla} className='w-7' />
                <h3 className="text-xl text-white font-bold uppercase">Pedi2</h3>
            </div>
        </div>
        <div className='sm:my-0 my-2'>
            <div className='items-center mx-2'>
                <p className='text-xs text-white text-center'>Customer Support:</p>
                <a  target='_blank'
                    href='mailto:infopedi2@gmail.com'
                    className='text-xs text-white my-1 bg-sky-500 font-semibold px-2 py-1 rounded uppercase'>infopedi2@gmail.com</a>
            </div>  
        </div>
        <div className='sm:my-0 my-2'>
            <div className='mx-2'>
                <p className='text-xs text-white capitalize'>All rights reserved &#169; 2023 {year !== 2023 && ' - ' + year }</p>
                <p className='text-xs text-white text-end'>version 1.2.0</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer