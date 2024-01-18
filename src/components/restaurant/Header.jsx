import olla from '../../img/olla.png'
const Header = () => {
  return (
    <header className="flex flex-col items-center bg-white py-4">
        <div className="flex flex-col">
            <div className="flex items-center ">
                <img src={olla} className="w-14" />
                <h3 className="text-6xl text-gray-500 font-bold uppercase">Pedi2</h3>
            </div>
            <p className="text-sm text-start">Administrator</p>
        </div>
    </header>
  )
}
export default Header