import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

export default function UserProvider({ children }) {
  const userFromStorage = sessionStorage.getItem('user')
  const [user, setUser] = useState(
    userFromStorage ? JSON.parse(userFromStorage) : { email: '', password: '' }
  )

  const signUp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        { user: user }
      )
      
      setUser({ email: '', password: '' })
    } catch (error) {
      throw error
    }
  }

  const signIn = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        { user: user }
      )
      
      setUser(response.data)
      sessionStorage.setItem('user', JSON.stringify(response.data))
    } catch (error) {
      throw error
    }
  }

  const signOut = () => {
    setUser({ email: '', password: '' })
    sessionStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  )
}
