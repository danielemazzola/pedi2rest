import React, { Fragment } from 'react'
import { Outlet } from "react-router-dom"
import Nav from '../components/Nav'

const HomeLayout = () => {
  return (
    <Fragment>
        <main className="">
            <div>
                {/* <Nav /> */}
            </div>
            <div className="bg-gray-100">
            <Outlet />
            </div>
        </main>
    </Fragment>
  )
}

export default HomeLayout