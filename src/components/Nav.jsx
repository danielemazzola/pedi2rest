import { useState } from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const [menu, setMenu] = useState(false)
    return (
        <nav className="flex justify-end">
            <ul className="fixed rounded-lg mt-2">
            <button onClick={e => setMenu(!menu)} 
                    className="my-5 px-2 py-4 bg-sky-500 text-white border rounded-full text-sm font-semibold translate-x-2 hover:translate-x-0 transition-all">
                { menu ? 
                    'Close' :
                    'Menu' }
                </button>
                <li className={`${menu ? 'translate-x-0' : 'translate-x-96'} py-2 px-4 border bg-white text-lg font-semibold hover:translate-x-1 transition-all`}><Link to='/'>Home</Link></li>
                <li className={`${menu ? 'translate-x-0' : 'translate-x-96'} py-2 px-4 border bg-white text-lg font-semibold hover:translate-x-1 transition-all`}><Link to='login'>Login</Link></li>
                {/* <li className={`${menu ? 'translate-x-0' : 'translate-x-96'} py-2 px-4 border bg-white text-lg font-semibold hover:translate-x-1 transition-all`}><Link to='sign-up'>Sign up</Link></li> */}
            </ul>
        </nav>
  )
}
export default Nav