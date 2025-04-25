import React from 'react'

const UserInfo = () => {
  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">John</span>
          </div>
          <div>
            Email: <span className="font-bold">John@bla.com</span>
          </div>
          <button className="bg-gray-800 text-white font-bold px-6 py-2 mt-3">Desconectar-se</button>
        </div>
    </div>
  )
}

export default UserInfo