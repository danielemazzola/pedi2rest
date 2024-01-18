import React from 'react'
import olla from '../img/olla.png'
const Home = () => {
  return (
    <section className="flex flex-col sm:flex-row items-center justify-center min-h-screen">
      <div className="flex flex-col my-3 sm:mx-10 md:mx-16 lg:mx-24">
            <div className="flex items-center ">
                <img src={olla} className="w-16" />
                <h3 className="text-6xl text-gray-500 font-bold uppercase">Pedi2</h3>
            </div>
            <p className="text-sm text-start">Welcome Administrator</p>
        </div>
    </section>
  )
}
export default Home