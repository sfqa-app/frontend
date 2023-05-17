import { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"

axios.defaults.baseURL = "http://localhost:8080/"

const useAxios = (config: AxiosRequestConfig) => {
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const request = () => {
    let isMounted = true
    const source = axios.CancelToken.source()

    const fetch = async (axiosConf: AxiosRequestConfig) => {
      setLoading(true)

      try {
        const res = await axios.request({
          ...axiosConf,
          cancelToken: source.token,
        })
        if (isMounted) {
          setResponse(res?.data)
          setError("")
        }
      } catch (e: any) {
        if (isMounted) {
          setError(e.message)
          setResponse(null)
        }
      } finally {
        isMounted && setLoading(false)
      }
    }

    fetch(config)

    return () => {
      isMounted = false
      source.cancel()
    }
  }

  return { response, error, loading, request }
}

export default useAxios
