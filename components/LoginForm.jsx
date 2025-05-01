'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Dados inválidos");
        return;
      }

      router.replace("dashboard")
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="bg-gray-50 grid place-items-center h-screen">
      <div className="bg-white shadow-lg p-5 rounded-lg border-t-4 border-red-500">
        <h1 className="text-xl font-bold my-4">Entrar no doame</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input onChange={(e) => setEmail(e.target.value)} type="email"
          placeholder="Email"
          />
          <input onChange={(e) => setPassword(e.target.value)}  type="password"
          placeholder="Senha"
          />

          <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
        {error && (
          <div className="bg-red-800 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

          <Link className="text-sm mt-3 text-right" href={'/register'}>
            Ainda não é doador? <span className="underline">Comece agora!</span>
          </Link>
        </form>
      </div>
    </div>
  )
}
