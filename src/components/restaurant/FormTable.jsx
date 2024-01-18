import { useTranslation } from 'react-i18next'
import useRestaurant from '../../hooks/useRestaurant'
import useTable from '../../hooks/useTable'
import { motion } from 'framer-motion'
import qr from '../../img/codigoQr.png'
import logo from '../../img/olla.png'
const FormTable = () => {
  const [t] = useTranslation('global')
  const {auth} = useRestaurant()
  const {tableNumber, setTableNumber, handleCreateTable} = useTable()
    const list = {
        visible: ({
            opacity: 1,
            transition: {
              delay:  0.5,
            },
          }),
        hidden: { opacity: 0 },
      }
      const item = {
        visible: { opacity: 1, y: 0, transition: { delay: 0.6} },
        hidden: { opacity: 0, y: -100 },
      }
  return (
    <motion.div className='my-10 w-full lg:w-1/2' initial='hidden' animate='visible' variants={list}>
        <div className='flex items-center justify-center bg-gray-200 rounded-t-lg'>
            <p className='my-2 text-2xl capitalize'>{t('tableForm.title')}</p>
        </div>
        <div className='flex flex-col-reverse sm:flex-row sm:justify-between w-full'>
            <form 
                className='flex flex-col w-full sm:w-1/2'
                onSubmit={handleCreateTable}
            >
                <motion.label variants={item} className='px-2 py-2 my-1 bg-gray-300 text-white font-bold text-center rounded capitalize'>
                    {t('tableForm.tableNumber')}
                </motion.label>
                <motion.input 
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    min={0}
                    variants={item} 
                    type='number' 
                    className='p-2 my-1 text-center font-bold capitalize text-gray-500 text-xl' 
                    placeholder={t('tableForm.tableNumberInput')}  />
                <motion.input 
                    variants={item} 
                    whileHover={{ scale: 1 }} 
                    whileTap={{ scale: 0.8 }} 
                    type='submit' 
                    value={t('tableForm.createInput')} 
                    className='mt-2 rounded-lg py-2 capitalize bg-sky-400 text-white font-semibold hover:bg-sky-500 cursor-pointer'
                />  
            </form>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-2 sm:my-0 sm:mt-1 sm:ml-1'>
              <div className='flex flex-col justify-center items-center'>
                <motion.img variants={item} src={qr} alt='image qr' className='w-20' />
                <p className='text-xl w-full mt-2 text-gray-500 font-bold uppercase'>{auth.name}</p>
                <div className="flex items-center justify-start w-full">
                  <img src={logo} className="w-4" />
                  <h3 className="text-sm text-gray-500 font-bold uppercase">Pedi2</h3>
                </div>
              </div>
            </div>
        </div>
    </motion.div>
  )
}
export default FormTable