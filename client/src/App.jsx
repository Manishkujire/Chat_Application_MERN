import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import NavBar from "./components/NavBar";
import { ChatContextProvider } from "./context/chatContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {user}=useContext(AuthContext)
  return (
    <>
      <ChatContextProvider user={user}>
        <NavBar />


        <Container>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>

    </>
  );
}

export default App;
