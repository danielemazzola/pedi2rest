import {useEffect} from 'react'
import QRCode from "qrcode";
import useTable from '../hooks/useTable'
const qrCode = ({id}) => {
    const {setQrTable, qrTable} = useTable()
    const url = `${import.meta.VITE_URL_QR + "/" + id}`;
  useEffect(() => {
    QRCode.toDataURL(
      url,
      {
        errorCorrectionLevel: "L",
        width: 300,
        margin: 1,
        color: {
          dark: "#000122",
        },
      },
      (err, url) => {
        if (err) {
            console.error(err)
        } else {
            setQrTable(url)
        }
      }
    );
  }, [])
  return (
    <img src={qrTable} alt='Image' className='w-96 h-64 bg-cover rounded-lg opacity-80'  />
  )
}
export default qrCode