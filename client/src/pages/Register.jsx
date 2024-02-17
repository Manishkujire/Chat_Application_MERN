import React, { useEffect, useContext } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
  from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';





export default function Register() {



  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])
  const { regInfo, resetError, updateRegInfo, registerUser, authError, isRegLoading } = useContext(AuthContext)
  return (<>
    <h3 className='text-center'>Register</h3>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' onChange={(e) => { updateRegInfo({ ...regInfo, name: e.target.value }); resetError() }} />
      <MDBInput autoComplete="false" wrapperClass='mb-4' label='Email address' id='form2' type='email' onChange={(e) => { updateRegInfo({ ...regInfo, email: e.target.value }); resetError() }} />
      <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' onChange={(e) => { updateRegInfo({ ...regInfo, password: e.target.value }); resetError() }} />

      <Button onClick={registerUser} className="mb-4 btn-success">{isRegLoading ? "Loading" : "Register"}</Button>

      <div className="text-center">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>

      {authError?.error && <Alert variant='danger'>{authError?.message}</Alert>}
    </MDBContainer>


  </>
  )
}
