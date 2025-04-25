import Link from 'next/link'
import React from 'react'

const LoginForm = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-500">
        <h1 className="text-xl font-bold my-4">Entrar no doame</h1>

        <form className="flex flex-col gap-3">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          <div className="bg-red-800 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            Erro
          </div>

          <Link className="text-sm mt-3 text-right" href={'/register'}>
            Ainda não é doador? <span className="underline">Comece agora!</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm