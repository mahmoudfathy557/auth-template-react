import React, { useState, useContext } from 'react'
import './login.css'
import MVLogo from '../../components/img/MVLogo-Yellow.svg'
import { IntranetContext } from '../../context'
import { Alert } from 'react-bootstrap'
import SkeletonLoader from '../../components/Skeleton/SkeletonLoader'
const Login = () => {
  const { user, login } = useContext(IntranetContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const { isLoading, error } = user

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    if (error) {
      setShowError(true)

      setTimeout(() => {
        setShowError(false)
      }, 8000)
    }
  }

  return (
    <div className='login-page d-flex align-items-center'>
      <div className='container  '>
        <div className=' login-form '>
          <div className='col-9 col-md-7 col-lg-5 mt-5'>
            <div className='text-center mb-4'>
              <img className='mb-4' src={MVLogo} alt='logo' height={250} />
            </div>
            {isLoading && !error ? (
              <SkeletonLoader />
            ) : (
              <form
                name='frmLogin'
                method='post'
                className='mt-5 d-flex flex-column'
                onSubmit={handleSubmit}
              >
                <div className='form-label-group'>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder='Email address'
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <div className='form-label-group'>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='Password'
                    autoComplete='false'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <button
                  className='btn btn-lg   login-btn btn-success   btn-block mb-4'
                  name='submit'
                  type='submit'
                >
                  Sign in
                </button>
                {showError && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}

                <p className='mt-5 mb-3 text-muted text-center'>
                  &copy; {new Date().getFullYear()}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
