import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import React from 'react'
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Create from "./pages/Create.jsx"
import { useColorModeValue } from "@chakra-ui/react"
function App() {
 
  return (
    <Box minH={"100vh"}bg = {useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Box>
  )
}

export default App
