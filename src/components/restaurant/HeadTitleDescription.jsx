import { useTranslation } from 'react-i18next'
const HeadTitleDescription = ({title, description}) => {
    const [t] = useTranslation('global')
  return (
    <div className='flex flex-col justify-start'>
        <h3 className='text-4xl text-gray-600 uppercase'>{title}</h3>
        <p className='text-sm text-gray-600 pl-5 mt-3'>{description}</p>
      </div>
  )
}
export default HeadTitleDescription