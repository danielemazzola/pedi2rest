import useCategories from '../../hooks/useCategories'
import { Link } from 'react-router-dom'
const Nav = ({pending}) => {
    const {handleCloseSession} = useCategories()
    return (
        <div className="flex flex-nowrap overflow-x-auto my-0.5 bg-gray-00 snap-x snap-mandatory">
          <div className="py-4 border bg-white capitalize hover:font-semibold">
            <Link
              to="/dashboard"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Dashboard
            </Link>
          </div>
          <div className="py-4 border bg-white capitalize hover:font-semibold">
            <Link
              to="category"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Category
            </Link>
          </div>
          <div className="py-4 border bg-white capitalize hover:font-semibold">
            <Link
              to="products"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Products
            </Link>
          </div>
          <div className="py-4 border bg-white capitalize hover:font-semibold">
            <Link
              to="tables"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Tables
            </Link>
          </div>
          <div className="border bg-white capitalize hover:font-semibold flex items-center">
            <Link
              to="orders"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Orders 
              { pending.length >= 1 && <span className="bg-yellow-400 text-white font-bold px-2 mx-2 rounded-full">{pending.length}</span>}
            </Link>
          </div>
          <div className="py-4 border bg-white capitalize hover:font-semibold">
            <Link
              to="sales"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Sales
            </Link>
          </div>
          <div className="py-4 border bg-white capitalize hover:font-semibold">
            <Link
              to="stadistics"
              className="flex justify-center w-40 snap-always snap-center"
            >
              Stadistics
            </Link>
          </div>
          <div className="py-4 border bg-white capitalize hover:font-semibold">
          <button
            className="flex justify-center w-40 snap-always snap-center capitalize"
            type="button"
            onClick={handleCloseSession}
          >
            Sign off
          </button>
        </div>
      </div>
    )
  }
export default Nav