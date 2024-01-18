import { createContext, useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import useRestaurant from '../hooks/useRestaurant'
import connectAxios from '../config/connectAxios'
import { toast } from 'react-toastify'
import io from 'socket.io-client'
let socket

const TableContext = createContext()

const TableProvider = ({children}) => {

    const navigate = useNavigate()
    const {setAlert, auth, setGetTable, getTable} = useRestaurant()

    const [loading, setLoading] = useState(false)
    const [tableNumber, setTableNumber] = useState('')
    const [msg, setMsg] = useState('')
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        socket = io(import.meta.env.VITE_URL_API)
        
      },[])

    useEffect(() =>{
        const getAllTables = async () => {
            setLoading(true)
            setMsg('')
            const token = localStorage.getItem('PEDI2_ID_TOKEN')
            if (!token) {
                navigate('/')
                return
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            const {data} = await connectAxios('/table', config)
            if(data.msg) {
                setMsg(data.msg)
                setLoading(false)
            } else{
                setGetTable(data)
                setLoading(false)
            }
        }
        setLoading(false)
        getAllTables()
    },[auth])

    const handleCreateTable = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('PEDI2_ID_TOKEN')
        if(tableNumber === '') {
            toast.error('All fields are required', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return;
        }
        if (!token) {
            navigate('/')
            return
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            setLoading(true)
            const {data} = await connectAxios(`/table/${tableNumber}`, config)
            if(data.msg){
                toast.error(data.msg, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoading(false)
                return
            }
            toast.success('New table created', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setMsg('')
            setGetTable([...getTable, data])
            setTableNumber('')
            setLoading(false)
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoading(false)
        }
    }

    const handleChangeAvailable = async (id) => {
        const token = localStorage.getItem('PEDI2_ID_TOKEN')
        if (!token) {
            navigate('/')
            return
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        const {data} = await connectAxios(`/table/available/${id}`, config)
        if(data.msg) {
            toast.error(data.msg, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoading(false)
            return
          }
          try {
            const newState = getTable.map((table) => table._id === data._id ? data : table )
            setGetTable(newState)
            toast.success('Changed the state of the table', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoading(false)
            
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    const handleCreate = () => {
        setEdit(!edit)
    }

    const handleDeleteTable = async (id) => {
        setLoading(true)
          const token = localStorage.getItem('PEDI2_ID_TOKEN')
          if (!token) {
            navigate('/')
            setLoading(false)
            return
          }
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
          try {
            const {data} = await connectAxios.delete(`/table/${id}`, config)
            if(data.msgError) {
                toast.error(data.msg, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoading(false)
                return
              }
              const updateTable = getTable.filter(table => table._id !== id)
              setGetTable(updateTable)
              if(data.msg) {
                toast.success(data.msg, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
              }
            setLoading(false)
          } catch (error) {
              toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
              setLoading(false) 
          }
    }

    const handleCleanTableUser = async (id) => {
        setLoading(true)
          const token = localStorage.getItem('PEDI2_ID_TOKEN')
          if (!token) {
            navigate('/')
            setLoading(false)
            return
          }
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          }
          try {
            const {data} = await connectAxios.put('/table/clean', {id}, config)
            socket.emit('updateTable', data)
            const newState = getTable.map((table) => table._id === data._id ? data : table )
            setGetTable(newState)
            toast.success('Removed customers', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoading(false)
            
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
    }    
  
    return (
        <TableContext.Provider
            value={{
                loading,
                msg, setMsg,
                handleCreateTable,
                tableNumber, setTableNumber,
                handleChangeAvailable,
                edit, setEdit,
                handleCreate,
                handleDeleteTable,
                handleCleanTableUser
            }}
        >

            {children}
        </TableContext.Provider>
    )
}

export {TableProvider}
export default TableContext