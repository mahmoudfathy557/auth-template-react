import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const IntranetContext = React.createContext()

const IntranetProvider = ({ children }) => {
  const [surveys, setSurveys] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [serverError, setServerError] = useState({ show: false, msg: '' })
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [user, setUser] = useState(
    localStorage.getItem('loginStatus')
      ? JSON.parse(localStorage.getItem('loginStatus'))
      : {
          isLoading: false,
          isAuthenticated: false,
          error: null,
          userData: null,
        }
  )

  // const baseAPI = 'http://localhost:4000'
  const baseAPI = 'https://survey.mountainviewegypt.com/api'
  // const baseAPI = 'https://survey-platform-67zi2.ondigitalocean.app/api'

  const login = async (username, password) => {
    setUser({
      ...user,
      isLoading: true,
      error: null,
    })
    try {
      const data = await axios.post(
        `https://dmgian.corp-dmg.com/_intranet_dashboard/ajaxResponse.php`,
        { data_type: 'loginConfirmation', credentials: { username, password } },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (data.data.loginStatus === 'SUCCESS') {
        setUser({
          isLoading: false,
          isAuthenticated: true,
          error: null,
          userData: {
            ...data.data,
            userName: data.data.userEmail.split('.')[0],
          },
        })
        // Cookies.set(
        //   'user',
        //   JSON.stringify({
        //     id: data.data.userId,
        //     userName: data.data.userEmail.split('.')[0],
        //   }),
        //   {
        //     expires: 7,
        //     path: '/',
        //   }
        // )
        localStorage.setItem(
          'loginStatus',
          JSON.stringify({
            isLoading: false,
            isAuthenticated: true,
            error: null,
            userData: {
              loginStatus: data.data.loginStatus,
              userName: data.data.userEmail.split('.')[0],
              userId: data.data.userId,
            },
          })
        )
      } else {
        setUser({
          isLoading: false,
          isAuthenticated: false,
          error: 'Email or Password is incorrect',
          userData: null,
        })
      }
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
    localStorage.removeItem('loginStatus')
    // Cookies.remove('user')
    window.location.href = '/'
  }

  const addNewSurvey = (surveyData) => {
    const data = {
      user_id: user?.userData?.userId,
      survey_json: surveyData,
    }
    axios({
      method: 'post',
      url: `${baseAPI}/addNewSurvey`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      },
    })
      .then((res) => {
        console.log('new survey added successfully')
      })
      .catch((err) => {
        console.log(err)
        setServerError({
          show: true,
          msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
        })
      })
  }

  const fetchAllSurveys = async () => {
    try {
      const result = await axios({
        method: 'post',
        url: `${baseAPI}/fetchAllSurveys`,
        data: { creator_id: user?.userData?.userId },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',

          Accept: '*/*',
        },
      })

      setIsAdmin(result.data.isAdmin)
      setSurveys(result.data.data)
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }

  const fetchOneSurvey = async (surveyId) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${baseAPI}/fetchOneSurvey/${surveyId}`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
          Accept: '*/*',
        },
      })

      return data.data
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }

  const deleteOneSurvey = async (surveyId) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${baseAPI}/deleteOneSurvey/${surveyId}`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      })
      fetchAllSurveys()
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }

  const editOneSurvey = async (surveyData, surveyId) => {
    const data = {
      editor_id: user?.userData?.userId,
      survey_json: surveyData,
    }
    try {
      await axios({
        method: 'patch',
        url: `${baseAPI}/editOneSurvey/${surveyId}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      })

      // return data.data
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }
  const user_id = Number(user?.userData?.userId) || null

  const addNewSurveyResult = (surveyResult, surveyId) => {
    const data = {
      user_id: user_id,
      result_json: surveyResult,
      survey_id: surveyId,
    }
    axios({
      method: 'post',
      url: `${baseAPI}/addNewSurveyResult`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      },
    })
      .then((res) => {
        console.log('new result added successfully')
      })
      .catch((err) => {
        console.log(err)
        setServerError({
          show: true,
          msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
        })
      })
  }

  const checkIfUserAnsweredSpecificSurvey = async (surveyId) => {
    const data = {
      user_id: Number(user?.userData?.userId),
    }

    try {
      const result = await axios({
        method: 'post',
        url: `${baseAPI}/checkIfUserAnsweredSpecificSurvey/${surveyId}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      })

      return result.data
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }

  const fetchSurveyResult = async (surveyId) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${baseAPI}/fetchSurveyResult/${surveyId}`,

        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      })
      return result.data
    } catch (error) {
      console.log(error)
      setServerError({
        show: true,
        msg: 'عذرا هناك عطل في الخادم, يرجى المحاولة في وقت اخر ',
      })
    }
  }

  const publishSurvey = async (surveyId) => {
    const data = {
      creator_id: Number(user?.userData?.userId),
    }
    try {
      const result = await axios({
        method: 'patch',
        url: `${baseAPI}/publishSurvey/${surveyId}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      })
      console.log(result.data)
      fetchAllSurveys()
      // return data.data
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
        surveys,
        serverError,
        user_id,
        isAdmin,
        login,
        logout,
        addNewSurvey,
        fetchAllSurveys,
        fetchOneSurvey,
        deleteOneSurvey,
        editOneSurvey,
        addNewSurveyResult,
        checkIfUserAnsweredSpecificSurvey,
        fetchSurveyResult,
        publishSurvey,
      }}
    >
      {children}
    </IntranetContext.Provider>
  )
}

export { IntranetContext, IntranetProvider }
