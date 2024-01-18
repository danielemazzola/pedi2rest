const Alert = ({alert}) => {
  return (
    <div
    className={`${alert.error ? 'text-red-600' : 'text-green-600' }  text-sm uppercase text-center`}
    >
      {alert.msg}
    </div>
  )
}
  export default Alert;