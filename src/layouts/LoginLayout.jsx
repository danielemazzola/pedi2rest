import React, { Fragment } from 'react'
import { Outlet } from "react-router-dom"
import useRestaurant from '../hooks/useRestaurant'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useOrders from '../hooks/useOrders'
import Header from '../components/restaurant/Header'
import Footer from '../components/restaurant/Footer'
import Nav from '../components/restaurant/Nav'
import AlertPartner from '../components/AlertPartner'
import AlertOrder from '../components/AlertOrder'
import AlertAccount from '../components/AlertAccount'
import ReactHowler from 'react-howler'
import sonido from '../alertSound/alert.ogg'

const LoginLayout = () => {
  const {modal, alert, auth, pending, alertOrder, alertAccount} = useRestaurant()
  const {alertSound} = useOrders()
  return (
    <Fragment>
        <main className={`${modal ? 'bg-gray-800':'bg-gray-50'} z-10`} >
              <p className='fixed p-2 text-xs bg-gray-500 w-full text-white z-40'>{auth.name}</p>
            <div className='pt-5'>
                <Header />
              { !modal && <Nav pending={pending} /> }
            </div>
            <div className={`${modal ? 'bg-gray-800':'bg-gray-50'} min-h-screen`}>
              <div className='fixed mt-3 z-40'>
                <AlertPartner alert={alert} />
                {alertOrder.map((order, index) => (
                  <div key={index} className='flex flex-col'>
                    <AlertOrder alert={order} />
                  </div>

                ))}
                {alertAccount.map((order, index) => (
                  <div key={index} className='flex flex-col'>
                    <AlertAccount alertAccount={order} />
                  </div>
                ))}
              </div>
              <Outlet />
            </div>
              <ReactHowler  src={sonido} playing={alertSound}/>
            <ToastContainer />
            <Footer />
        </main>

    </Fragment>
  )
}

export default LoginLayout