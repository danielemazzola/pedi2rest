import React, {useRef} from 'react'
import {useTranslation} from 'react-i18next'
import useTable from '../../hooks/useTable'
import date from '../../helpers/date'
import {QRCodeSVG} from 'qrcode.react'
import { useReactToPrint } from 'react-to-print'
const Tables = ({tables}) => {
    const [t] = useTranslation('global')
    const {num, stateTable, available, create, _id, customers, tableId} = tables
    const {handleChangeAvailable, handleDeleteTable, handleCleanTableUser} = useTable()
    const componentRef = useRef()
    const handlePrintOrder = useReactToPrint({
            content : () => componentRef.current,
            documentTitle: 'emp-data',
            onAfterPrint: () => alert('Print Success')
        })
    return (
        <div key={_id} className='flex flex-col rounded-lg m-3 mb-10 text-xl justify-center items-center'>
        <div className={`${stateTable ? 'border-sky-600' : 'border-rose-500'} hover:opacity-70 transition-all delay-50 duration-200 border-t-8 border-l-8 border-r-8 rounded-t-xl`}>
            <div ref={componentRef} className='p-5'>
                <a href={`${import.meta.env.VITE_URL_QR + '/' + tableId}`} target='_blank'>
                    <QRCodeSVG 
                        value={`${import.meta.env.VITE_URL_QR + '/' + tableId}`}
                        size={200}
                        bgColor={'#FFFFFF'}
                        fgColor={'#001C46'}
                        level={'L'}
                        includeMargin={false}
                    />
                </a>
            </div>
        </div>
        <div className={`${stateTable ? 'bg-gradient-to-t from-sky-400 to-sky-600 opacity-90':'bg-gradient-to-t from-rose-400 to-red-500 opacity-90' } opacity-70 rounded-b-lg  px-4 py-7 w-64 shadow-xl`}>
            <button onClick={handlePrintOrder} className='bg-white text-sky-700 px-2 py-1 rounded-lg text-sm mb-2'>Print QR</button>
            <div className='mb-2'>
                <h2 className='text-sky-100 text-sm capitalize opacity-100'>{t('tableList.tableNumber')} 
                    <span className='bg-white font-bold mx-2 px-1 text-sky-600 rounded-md'>{num}</span>
                </h2>
            </div>
            <div className='text-center bg-white rounded my-2'>
                <p className='text-sm'>
                    <span className='font-semibold text-gray-600 capitalize'>{stateTable ? t('tableList.stateTableTrue') : t('tableList.stateTableFalse')}</span>
                </p>
            </div>
            <div>
                <button className='bg-white w-full rounded text-sm cursor-pointer font-semibold text-gray-600' onClick={e => handleChangeAvailable(_id)}>
                    {available ? t('tableList.availableTrue') : t('tableList.availableFalse')}
                </button>
            </div>
            <div className='flex mt-3'>
                <button className='bg-white w-full rounded mr-1 text-sm text-gray-600'>
                    {t('tableList.customers')}
                    <span className='font-semibold ml-2'>{customers}</span>
                </button>
                <button type='button' className='bg-white px-2 py-1 rounded ml-1 text-sm' onClick={e => handleCleanTableUser(_id)}>Clean</button>
            </div>
            <div className='text-end mt-4'>
                <p className='text-white text-xs opacity-100'> {t('tableList.create')}
                    <span className='font-semibold ml-2'>{date(create)}</span>
                </p>
            </div>
            <div className='flex mt-4'>
                <button className='text-white text-sm opacity-100 hover:font-bold' onClick={e => handleDeleteTable(_id)}>
                    {t('tableList.deleteInput')}
                </button>
            </div>
        </div>
    </div>
    )
}
export default Tables