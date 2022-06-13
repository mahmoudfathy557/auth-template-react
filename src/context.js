import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const IntranetContext = React.createContext()

const IntranetProvider = ({ children }) => {
  //Check if token existed
  console.log(document.cookie)
  const isTokenExited = document.cookie.split('=').indexOf('jwt')
  let userInfo
  if (isTokenExited !== -1) {
    let tokenIndex = isTokenExited + 1
    let token = document.cookie.split('=')[tokenIndex]
    userInfo = jwt_decode(token)
  }

  const [serverError, setServerError] = useState({ show: false, msg: '' })
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [user, setUser] = useState(
    userInfo
      ? {
          isLoading: false,
          isAuthenticated: true,
          error: null,
          userData: userInfo,
        }
      : {
          isLoading: false,
          isAuthenticated: false,
          error: null,
          userData: null,
        }
  )

  const baseAPI = 'http://localhost:5000/api/v1/'

  const login = async (email, password) => {
    setUser({
      ...user,
      isLoading: true,
      error: null,
    })
    try {
      const data = await axios.post(
        `${baseAPI}auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const token = data.data.token
      document.cookie = `jwt=${token}`
      // saving token at cookies
      var decoded = jwt_decode(token)

      setUser({
        isLoading: false,
        isAuthenticated: true,
        error: null,
        userData: decoded,
      })
    } catch (error) {
      console.log(error)
      setUser({
        isLoading: false,
        isAuthenticated: true,
        error: error,
        userData: null,
      })
    }
  }

  const logout = () => {
    document.cookie = 'jwt=;Max-Age=-99;'
    window.location.href = '/'
  }

  const fetchAllSurveys = async () => {
    try {
      axios.get(
        `${baseAPI}jobs`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }

  return (
    <IntranetContext.Provider
      value={{
        user,
        isDataLoading,
        serverError,
        login,
        logout,
        fetchAllSurveys,
      }}
    >
      {children}
    </IntranetContext.Provider>
  )
}

export { IntranetContext, IntranetProvider }
