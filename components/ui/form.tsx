"use client"

import useAxios from "@/hooks/useAxios"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "./button"

import { Input } from "./input"

const Form = () => {
  const formDefaultValue = {
    email: "mhusn@ntuehao.cm",
    password: "18",
  }

  const [form, setForm] = useState<{
    email: string
    password: string
  }>(formDefaultValue)

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1OTgxNzcsImlkZW50aXR5IjoiTUFIIn0.bQyaTBdssQbFKDQhdTEdIVNK-Sg2F3ngicZjNV8ngaA"
  const { request, response, error } = useAxios({
    url: "/user",
    method: "post",
    data: {
      // identity: form.email,
      // password: form.password,
      name: form.email,
      age: parseInt(form.password),
    }
  })

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    request();
    setForm(formDefaultValue)
  }

  useEffect(() => {
    console.log(response)
  }, [response, error])

  return (
    <form className="mx-auto flex w-full max-w-3xl flex-col gap-4" onSubmit={handleLogin}>
      <Input
        type="email"
        placeholder="email@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit">Login</Button>
    </form>
  )
}

export default Form
