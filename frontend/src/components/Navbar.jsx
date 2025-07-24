import React from 'react'
import { Container, Flex, HStack, Button, Text, useColorMode} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex h={16} justifyContent={"space-between"} alignItems={"center"} flexDir={{ base: "column", sm: "row" }}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.500, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button colorScheme="blue" variant="solid">
              <PlusSquareIcon fontSize={"20"} mr={2} />
              Add Product
            </Button>
          </Link>
          <Button onClick={toggleColorMode} variant="ghost" size="lg">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar