'use client';
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterUserForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
        setError("Preencha todos os campos.");
        return;
      }
      
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();

        if (user) {
          setError("Usuário já existe.");
          return;
        }

        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (res.ok) {
          const form = e.target;
          form.reset();
          setError("");
          router.push("/");
        } else {
          console.log("Falha no registro do usuário.");
        }
      } catch (error) {
        console.log("Erro durante registro: ", error);    
      }
    };
    

  return (
    <div className="bg-gray-50 bg-blend-soft-light grid place-items-center h-screen">
      <div className="bg-white shadow-lg p-5 rounded-lg border-t-4 border-red-500">
        <h1 className="text-xl font-bold my-4">Cadastre-se como doador!</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input onChange={e => setName(e.target.value)} type="text" placeholder="Nome Completo" />

          <input onChange={e => setEmail(e.target.value)}type="email" placeholder="Email" />

          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" />

          <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">
            Começar
          </button>

          { error && (
            <div className="bg-red-800 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}  

          <Link className="text-sm mt-3 text-right" href={'/'}>
            Já contribui? <span className="underline">Continuar doando!</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterUserForm