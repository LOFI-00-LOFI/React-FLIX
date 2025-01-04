import React from 'react'
import { Link } from 'react-router-dom'

const NotFound :React.FC= () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

    <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-2xl text-gray-200">Opps!!! Page Not Found...</p>

        <Link to='/' className="mt-6 inline-block bg-slate-700 rounded-lg text-white px-6 py-4 hover:bg-slate-900 transition-colors" >Goto Home</Link>
    </div>

</div>
  )
}

export default NotFound