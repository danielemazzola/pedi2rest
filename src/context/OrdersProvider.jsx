import React, { createContext, useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import connectAxios from '../config/connectAxios'
import useRestaurant from '../hooks/useRestaurant'
import io from 'socket.io-client'
import datehour from '../helpers/datehour'
let socket;

const OrdersContext = createContext()

const OrdersProvider = ({ children }) => {
    const {
        auth, 
        alert, setAlert,
        alertOrder, setAlertOrder, 
        alertAccount, setAlertAccount,
        sales, 
        setSales, 
        process,
        setProcess,
        pending,
        setPending,
        canceled,
        setCanceled,} = useRestaurant()
    const navigate = useNavigate()
    const param = useParams()

    const [loadingOrders, setLoadingOrders] = useState(false)
    const [loadingPaid, setLoadingPaid] = useState(false)
    const [alertSound, setAlertSound] = useState(false)

    useEffect(() => {
        const orders = async () => {
            setLoadingOrders(true)
            const token = localStorage.getItem('PEDI2_ID_TOKEN')
            if (!token) {
                navigate('/')
                setLoadingOrders(false)
                return
            }            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            try {
                const {data} = await connectAxios('/orders', config)
                setProcess(data.process)
                setPending(data.pending)
                setCanceled(data.canceled)
                setLoadingOrders(false)
            } catch (error) {
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
                setLoadingOrders(false)
                return;
            }
        }
        orders()
    },[auth])

    const handlePaid = async (id) => {
        setLoadingPaid(true)
            const token = localStorage.getItem('PEDI2_ID_TOKEN')
            if (!token) {
                navigate('/')
                setLoadingPaid(false)
                return
            }            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            try {
                const {data} = await connectAxios(`/orders/${id}`, config)
                if(data.msg){
                    toast.error(data.msg, {
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
                if(pending.some(o => o._id === data._id)){
                    const updateState = pending.map(order => order._id === data._id ? data : order)
                    setPending(updateState)
                }
                if(process.some(o => o._id === data._id)){
                    const updateState = process.map(order => order._id === data._id ? data : order)
                    setProcess(updateState)
                }
                if(canceled.some(o => o._id === data._id)){
                    const updateState = canceled.map(order => order._id === data._id ? data : order)
                    setCanceled(updateState)
                }
                toast.info('Payment status changed successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoadingPaid(false)
            } catch (error) {
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
                setLoadingPaid(false)
            } 
    }

    const handleProcesse = async (id) => {
        setLoadingPaid(true)
            const token = localStorage.getItem('PEDI2_ID_TOKEN')
            if (!token) {
                navigate('/')
                setLoadingPaid(false)
                return
            }            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            try {
                const {data} = await connectAxios(`/orders/process/${id}`, config)
                if(data.msg){
                    toast.error(data.msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    setLoadingPaid(false)
                    return;
                }
                socket.emit('newState', data)
                setProcess([...process, data])
                if(pending.some(o => o._id === data._id)){
                    const updateState = pending.filter(order => order._id !== data._id)
                    setPending(updateState)
                }
                toast.success('Order in process', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoadingPaid(false)
            } catch (error) {
                console.log(error.message)
                setLoadingPaid(false)
            } 
    }
    const handleCancel = async (id) => {
        setLoadingPaid(true)
            const token = localStorage.getItem('PEDI2_ID_TOKEN')
            if (!token) {
                navigate('/')
                setLoadingPaid(false)
                return
            }            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            try {
                const {data} = await connectAxios(`/orders/cancel/${id}`, config)
                if(data.msg){
                    toast.error(data.msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    setLoadingPaid(false)
                    return;
                }
                setCanceled([...canceled, data])
                socket.emit('newState', data)
                if(process.some(o => o._id === data._id)) {
                    const update = process.filter(o => o._id !== data._id)
                    setProcess(update)
                }
                if(pending.some(o => o._id === data._id)) {
                    const update = pending.filter(o => o._id !== data._id)
                    setPending(update)
                }
                toast.warning('Order canceled', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoadingPaid(false)
            } catch (error) {
                toast.warning(error.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoadingPaid(false)
            } 
    }

    const handlePendings = async (id) => {
        const token = localStorage.getItem('PEDI2_ID_TOKEN')
        if (!token) {
            navigate('/')
            setLoadingPaid(false)
            return
        }            
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const {data} = await connectAxios(`/orders/pending/${id}`, config)
            if(data.msg){
                toast.error(data.msg, {
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
            setPending([...pending, data])
            socket.emit('newState', data)
            if(canceled.some(o => o._id === data._id)) {
                const update = canceled.filter(o => o._id !== data._id)
                setCanceled(update)
            }
            toast.warn('Order pending', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoadingPaid(false)
        } catch (error) {
            console.log(error.message)
            setLoadingPaid(false)
        } 

    }

    const handleBreakFree = async (id) => {
        setLoadingPaid(true)
        const token = localStorage.getItem('PEDI2_ID_TOKEN')
        if (!token) {
            navigate('/')
            setLoadingPaid(false)
            return
        }            
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const {data} = await connectAxios(`/orders/break/${id}`, config)
            if(data.msg){
                toast.error(data.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoadingPaid(false)
                return;
            }
            socket.emit('newState', data)
            if(process.some(o => o._id === data._id)) {
                const updateProcess = process.filter(o => o._id !== data._id)
                setProcess(updateProcess)
            }
            if(pending.some(o => o._id === data._id)) {
                const updatePending = pending.filter(o => o._id !== data._id)
                setPending(updatePending)
            }
            setSales([...sales, data])
            toast.success('Order Break Free', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoadingPaid(false)
        } catch (error) {
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
            setLoadingPaid(false)
            return;
        }
    }

    const handleDeleteOrder = async (id) => {
        setLoadingPaid(true)
        const token = localStorage.getItem('PEDI2_ID_TOKEN')
        if (!token) {
            navigate('/')
            setLoadingPaid(false)
            return
        }            
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const {data} = await connectAxios(`/orders/deleteOrder/${id}`, config)
            if(data.msg){
                toast.error(data.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setLoadingPaid(false)
                return;
            }
            socket.emit('newState', data)
            if(process.some(o => o._id === data._id)) {
                const updateProcess = process.filter(o => o._id !== data._id)
                setProcess(updateProcess)
            }
            if(pending.some(o => o._id === data._id)) {
                const updatePending = pending.filter(o => o._id !== data._id)
                setPending(updatePending)
            }
            toast.error('Order Delete', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoadingPaid(false)
        } catch (error) {
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
            setLoadingPaid(false)
            return;
        }
    }

    const newOrder = async (data) => {
        setLoadingPaid(true)
        const hour = datehour(data.createdAt)
        setAlertSound(true)
        await setAlertOrder([...alertOrder, {
            msgOrder: `New order recived at ${hour.initHour} hours, table: ${data.table.num}`,
            error: false,
            id: data._id
        }])
        setTimeout(() => {
            //setAlertOrder({})
            setAlertSound(false)
        }, 5000);
        setLoadingPaid(false)
        await setPending([...pending, data])
    }

    useEffect(() => {
        socket = io(import.meta.env.VITE_URL_API)
        socket.on('alert', async (data) => {
            if(data.restaurant === auth._id){
                await newOrder(data)
            } else {
                return null
            }
        })
    })
    
    const newAccount = async (data) => {
        setAlertSound(true)
                const hour = datehour(data.createdAt)
                await setAlertAccount([...alertAccount, {
                    msgAccount: `Build requested ${hour.initHour} hours`,
                    error: false,
                    id: data._id
                }])
                if(await data.pending && !data.process) {
                        const updatePending = pending.map(o => o._id === data._id ? data : o)
                        await setPending(updatePending)
                } 
                if(await data.process && !data.pending) {
                        const updateProcess = process.map(o => o._id === data._id ? data : o)
                        await setProcess(updateProcess)
                    }
                    
                    setTimeout(() => {
                        //setAlertAccount({})
                        setAlertSound(false)
                    }, 3000)
                    setLoadingPaid(false)

    }
    useEffect(() => {
        socket = io(import.meta.env.VITE_URL_API)
        socket.on('alertAccount', async (data) => {
            setLoadingPaid(true)
            if(data.restaurant === auth._id){
                await newAccount(data)
            } else {
                setLoadingPaid(false)
                return null
            }
          })
    })

    return (
        <OrdersContext.Provider
        value={{
            loadingOrders,
            loadingPaid,
            process,
            pending,
            canceled,
            handlePaid,
            handleProcesse,
            handleCancel,
            handlePendings,
            handleBreakFree,
            handleDeleteOrder,
            alertSound
        }}
        >
        {children}
        </OrdersContext.Provider>
    )
    }


export { OrdersProvider }

export default OrdersContext