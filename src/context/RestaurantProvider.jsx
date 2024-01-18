import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import connectAxios from '../config/connectAxios'
import io from 'socket.io-client'
import { toast } from 'react-toastify'
let socket

const RestaurantContext = createContext()

const RestaurantProvider = ({ children }) => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})
  const [alertOrder, setAlertOrder] = useState([])
  const [alertAccount, setAlertAccount] = useState([])
  const [on, setOn] = useState(false)
  const [socketer, setSocketer] = useState(false)
  const [auth, setAuth] = useState({})
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [getTable, setGetTable] = useState([])
  const [getProducts, setGetProducts] = useState([])
  const [sales, setSales] = useState([])

  //ORDERS
  const [process, setProcess] = useState([])
  const [pending, setPending] = useState([])
  const [canceled, setCanceled] = useState([])

  const [contact, setContact]= useState(false)
  const [login, setLogin]= useState(true)


  useEffect(() => {
    if(email.length){
      setAlert({})
    }
    if(telephone.length){
      setAlert({})
    }
    if(message.length){
      setAlert({})
    }
    if(password.length){
      setAlert({})
    }
  },[email, telephone,message,password])
  

  // Authenticate
  useEffect(() => {
    const authenticate = async () => {
      const token = localStorage.getItem("PEDI2_ID_TOKEN")
      if (!token) {
        navigate('/')
        setLoading(false)
        return
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        setLoading(true)
        const { data } = await connectAxios("/restaurant/welcome", config)
        setAuth(data)
        setSocketer(true)
        navigate("/dashboard")
        setLoading(false)
      } catch (error) {
        navigate('/')
        localStorage.removeItem("PEDI2_ID_TOKEN")
        setLoading(false)

      }
    }
    authenticate();
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault()
    if([email, password].includes('')){
      toast.error('All fields are required', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return;
    }

    try {
      setLoading(true);
      const {data} = await connectAxios.post(`/restaurant/login`, { email, password })
      if( data.msg ) {
        setAlert({
          msg: `${data.msg}.`,
          error: `${data.error}.`,
        });
        localStorage.removeItem("PEDI2_ID_TOKEN")
        setLoading(false)
        return
      }
      if( data._id && data.name){
        localStorage.setItem("PEDI2_ID_TOKEN", data.token)
        setAuth(data)
        setSocketer(true)
        setOn(!on)
        navigate('/dashboard')
        toast.success(`Welcome ${data.name}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setEmail('')
        setOn(true)
        setPassword('')
        navigate("/dashboard")
        setTimeout(() => {
          setLoading(false)
        }, 3000);
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const handleContactUs = async (e) => {
    e.preventDefault()
    setLoading(true)
    if([email, telephone, message].includes('')){
      toast.error('All fields are required', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setLoading(false)
      return;
    }
    try {
      const {data} = await connectAxios.post(`/restaurant/contact`, { email, telephone, message })
      if(data.send) {
        toast.error('Message sent successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setTimeout(() => { setAlert({})}, 3000)
        setEmail('')
        setTelephone('')
        setMessage('')
        setContact(false)
        setLogin(true)
        setLoading(false)
      }
      if(data.msg) {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setTimeout(() => { setAlert({})}, 3000)
        setLoading(false)
        return
      }
    } catch (error) {
      setAlert({
        msg: error,
        error: true,
      })
      setTimeout(() => { setAlert({})}, 3000)
      setLoading(false);
      return
    }
  }

  const handleCloseAlertPartner = () => {
   setAlert({msg:'', error:null})

  }
  const handleCloseAlertOrder = (id) => {
    const update = alertOrder.filter(a => a.id !== id)
    setAlertOrder(update)
  }
   const handleCloseAlertAccount = (id) => {
    const update = alertAccount.filter(a => a.id !== id)
    setAlertAccount(update)
  }
  useEffect(() => {
    if(socketer ) {
      socket = io(import.meta.env.VITE_URL_API)
      socket.emit('restaurant', auth)

    }
  },[socketer])

  
  useEffect(() => {
    socket = io(import.meta.env.VITE_URL_API)
    socket.on('updateUser', data => {
      if(getTable.some(t => t._id === data._id)){
          const updateTable = getTable.map(t => t._id === data._id ? data : t )
          setGetTable(updateTable)
          
      } else {
        return null
      }
    })
  })
  

  return (
    <RestaurantContext.Provider
      value={{
        auth, setAuth,
        alert, setAlert,
        alertOrder, setAlertOrder,
        alertAccount, setAlertAccount,
        loading, setLoading,
        getTable, setGetTable,
        getProducts, setGetProducts,
        sales, setSales,
        handleLogin,
        email, setEmail,
        password, setPassword,
        telephone, setTelephone,
        message, setMessage,
        handleCloseAlertPartner,
        handleCloseAlertOrder,
        handleCloseAlertAccount,
        handleContactUs,
        contact, setContact,
        login, setLogin,
        process,
        setProcess,
        pending,
        setPending,
        canceled,
        setCanceled,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}


export { RestaurantProvider }

export default RestaurantContext