import React, { useContext } from 'react'
import { Container, Nav, Navbar, Stack, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
export default function NavBar() {
    
    const { user,logutUser } = useContext(AuthContext)
    return (
        <Navbar bg="dark" className="mb-4 text-light" style={{ height: "50px" }}>
            <Container>
                <h2>
                    <Link className='text-decoration-none text-light' to="/">
                        ChatApp</Link>
                </h2>

                <Nav>
                    <Stack direction='horizontal' gap="5">
                        <h3>{user && `logged in as ${user.name}`}</h3>
                        {user ? (<Button onClick={()=>{logutUser()}} >Logout</Button>) :
                            (<><Link className='text-decoration-none text-light' to="/login">
                                Login</Link>
                                <Link className='text-decoration-none text-light' to="/register">
                                    Register</Link></>)}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}
