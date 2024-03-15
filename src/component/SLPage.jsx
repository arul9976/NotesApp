import React from 'react'
import './SLPage.scss'
import './sass/Home.scss'

import { useState } from 'react'
import { Envelope, Pass, Person } from 'react-bootstrap-icons';
import { FormDataState, isValidEmail } from './Fetch';
import { FetchData } from './Redux/Actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './Home';
const SLPage = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [isCretencials, setIsCretencials] = FormDataState();

  const handleIsLogin = () => {
    setIsLogin(!isLogin)
    setIsCretencials({ username: '', email: '', password: '', msgError: null })
  }
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setIsCretencials((prev) => ({ ...prev, [name]: value }))
    isCretencials.msgError = null
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      username: isCretencials.username,
      email: isCretencials.email,
      password: isCretencials.password,
      msgError: null
    };
    if (isCretencials.username.trim() === '') {
      errors.msgError = "Username is required"
    } else if (isCretencials.email.trim() === '' && isLogin) {
      errors.msgError = "Email is required"
    } else if (isLogin && !isValidEmail(isCretencials.email)) {
      errors.email = ''
      errors.msgError = "Enter a Valid Email Address"
    } else if (isCretencials.password === '') {
      errors.msgError = "Password is required"
    } else if (isCretencials.password.length < 8) {
      errors.password = ''
      errors.msgError = "Password must be at least 8 characters"
    }

    if (isCretencials.username === '' && isCretencials.password === '' && isCretencials.email === '') {
      errors.msgError = "Please Enter All Details"
    }

    if (errors.msgError === null) {
      if (isCretencials.email !== '') {
        const SignUser = 'SignUser'
        dispatch(FetchData(
          {
            FetchMethod: SignUser,
            isCretencials: isCretencials,
            setisCretencials: setIsCretencials
          }))
      }
      else {
        const isUser = 'isUser'
        dispatch(FetchData(
          {
            FetchMethod: isUser,
            isCretencials: isCretencials,
            setisCretencials: setIsCretencials
          }))
      }


    } else {
      setIsCretencials(errors);
    }
  }
  useEffect(() => {

    return () => {
      const name = localStorage.getItem("Token");
      if (name) {
        dispatch(FetchData(
          {
            FetchMethod: "validateToken",
            isCretencials: name,
            setisCretencials: setIsCretencials
          }))

      }
    }
  }, [dispatch, setIsCretencials])

  const textvalue = 'Login';
  if (!isCretencials.isLogged) {
    return (
      <>
        <div className={`l_container ${!isLogin && 'isLogin'}`}>
          <form onSubmit={handleSubmit} className={`login ${isLogin && 'active'}`}>
            <div className="inputgrp">
              <input onChange={handleChange} value={isCretencials.username} name='username' id='inputfield' className={`input ${(isCretencials.msgError === 'User Not Found' || (isCretencials.msgError !== null & isCretencials.username === '')) && 'redline'}`} type="text" />
              <label className={`${isCretencials.msgError === 'User Not Found' && 'active'} ${isCretencials.username.length > 0 && 'labelisvalue'}`} htmlFor="inputfield">
                Username
              </label>
              <Person />
              {(isCretencials.username === '' || isCretencials.msgError === 'User Not Found') && <p className='error'>{isCretencials.msgError}</p>}
            </div>
            <div className="inputgrp">
              <input onChange={handleChange} value={isCretencials.password} name='password' id='inputfield' className={`input ${(isCretencials.msgError === 'Incorrect Password' || (isCretencials.msgError !== null & isCretencials.password === '')) && 'redline'}`} type="text" />
              <label className={`${isCretencials.msgError === 'Incorrect Password' && 'active'} ${isCretencials.password.length > 0 && 'labelisvalue'}`} htmlFor="inputfield">
                Password
              </label>
              <Pass />
              {(isCretencials.password === '' || isCretencials.msgError === 'Incorrect Password') && <p className='error'>{isCretencials.msgError}</p>}
            </div>

            <button type='submit'>{textvalue}</button>
            <b onClick={handleIsLogin}>Sign Up</b>
          </form>

          <form onSubmit={handleSubmit} className={`SignUp ${!isLogin && 'active'}`}>
            <div className="inputgrp">
              <input onChange={handleChange} id='inputfield' name='username' value={isCretencials.username} className={`input ${isCretencials.msgError != null & isCretencials.username === '' ? 'redline' : null}`} type="text" />
              <label className={isCretencials.username.length > 0 && 'labelisvalue'} htmlFor="inputfield">Username</label>
              <Person />
              {(isCretencials.username === '') && <p className='error'>{isCretencials.msgError}</p>}

            </div>

            <div className="inputgrp">
              <input onChange={handleChange} id='inputfield' name='email' value={isCretencials.email} className={`input ${isCretencials.msgError != null & isCretencials.email === '' ? 'redline' : null}`} type="text" />
              <label className={isCretencials.email.length > 0 && 'labelisvalue'} htmlFor="inputfield">Email</label>
              <Envelope />
              {isCretencials.email === '' && <p className='error'>{isCretencials.msgError}</p>}

            </div>

            <div className="inputgrp">
              <input onChange={handleChange} id='inputfield' name='password' value={isCretencials.password} className={`input ${isCretencials.msgError != null & isCretencials.password === '' ? 'redline' : null}`} type="text" />
              <label className={isCretencials.password.length > 0 && 'labelisvalue'} htmlFor="inputfield">Password</label>
              <Pass />
              {isCretencials.password === '' && <p className='error'>{isCretencials.msgError}</p>}

            </div>

            <button className={(isCretencials.msgError === 'success') && 'success'} type='submit'>Sign Up</button>
            <b onClick={handleIsLogin}>Login</b>
          </form>
        </div>

      </>
    )
  }
  else {
    return (
      <Home />
    )
  }



}

export default SLPage