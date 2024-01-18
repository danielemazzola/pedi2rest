import useRestaurant from '../../hooks/useRestaurant'
import olla from '../../img/olla.png'
import Alert from '../../components/Alert'
import Loading from '../../components/Loading'
const Login = () => {
    const { contact, setContact, login, setLogin, loading, handleLogin, email, setEmail, password, setPassword, alert, telephone, setTelephone, handleContactUs, message, setMessage } = useRestaurant()
    const { msg } = alert
    const handleLoginForm = () => {
        setLogin(true)
        setContact(false)
    }
    const handleContact = () => {
        setLogin(false)
        setContact(true)
    }
return (
    <section className="flex flex-col sm:flex-row items-center justify-center min-h-screen">
        <div className="flex flex-col my-3 sm:mx-10 md:mx-16 lg:mx-24">
            <div className="flex items-center ">
                <img src={olla} className="w-16" />
                <h3 className="text-6xl text-gray-500 font-bold uppercase">Pedi2</h3>
            </div>
            <p className="text-sm text-start">Welcome Administrator</p>
        </div>
        { login && 
            <div className="flex flex-col items-center my-3 sm:mx-10 md:mx-16 lg:mx-24 bg-white border rounded-lg p-5">
                { msg ? <Alert alert={alert} /> : null }
                <form className="flex flex-col items-center" onSubmit={handleLogin}>
                    <input 
                        type="email"
                        className='border px-3 my-1 py-3 rounded w-72' 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                    />
                    <input 
                        type='password' 
                        className='border px-3 my-1 py-3 rounded w-72' 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loading ? <Loading /> : 
                        <button 
                            className='bg-sky-600 w-full my-4 text-white font-semibold text-xl py-2 rounded hover:bg-sky-700'
                            >Login
                        </button>
                    }
                </form>
                <div className='flex w-full'>              
                    <button
                        onClick={handleContact}
                        className='bg-yellow-400 hover:bg-yellow-500 hover:-translate-y-0.5 uppercase text-white px-2 rounded text-sm'
                    >Contact us</button>
                </div>
            </div>
        }
        {contact &&
            <div className="flex flex-col items-center my-3 sm:mx-10 md:mx-16 lg:mx-24 bg-white border rounded-lg p-5">
                { msg ? <Alert alert={alert} /> : null }
                    <form className="flex flex-col items-center" onSubmit={handleContactUs}>
                        <input 
                            type="email"
                            className='border px-3 my-1 py-3 rounded w-72' 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                        />
                        <input 
                            type='tel'
                            className='border px-3 my-1 py-3 rounded w-72' 
                            placeholder='Phone'
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                        <textarea 
                            type='text' 
                            className='border px-3 my-1 py-3 rounded w-72' 
                            placeholder='Message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {loading ? <Loading /> : 
                            <button 
                                className='bg-sky-600 w-full my-4 text-white font-semibold text-xl py-2 rounded hover:bg-sky-700'
                                >Contact
                            </button>
                        }
                    </form>
                <div className='flex w-full'>              
                    <button
                        onClick={handleLoginForm}
                        className='bg-green-400 hover:bg-green-700 hover:-translate-y-0.5 uppercase text-white px-2 rounded text-sm'
                    >Login</button>
                </div>
            </div>
        }
    </section>
  )
}
export default Login