import React, { useContext, useEffect } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
  from 'mdb-react-ui-kit'

import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
export default function Login() {
  const {user, logInfo, resetError, updateLogInfo, loginUser, authError, isRegLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  return (<>
    <h3 className='text-center'>Login</h3>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'
        onChange={(e) => { updateLogInfo({ ...logInfo, email: e.target.value }); resetError() }} />
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => { updateLogInfo({ ...logInfo, password: e.target.value }); resetError() }} />

      <Button onClick={loginUser} className="mb-4 btn-success">{isRegLoading ? "Loading" : "Login"}</Button>
      <div className="text-center">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>

      {authError?.error && <Alert variant='danger'>{authError?.message}</Alert>}
    </MDBContainer>

  </>
  )
}
