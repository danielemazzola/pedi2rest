const Title = ({title, subTitle}) => { 
  return (
    <div className="flex flex-col justify-start">
        <h3 className="text-4xl text-gray-600 uppercase">{title}</h3>
        <p className="text-sm text-gray-600 pl-5 pt-3">{subTitle}</p>
      </div>
  )
}
export default Title