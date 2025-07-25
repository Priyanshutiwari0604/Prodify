import React from 'react'
import { Container, Flex, HStack, Button, Text, useColorMode, Box, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  
  // Dynamic colors based on theme
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  
  return (
    <Box
      position="sticky"
      top={0}
      zIndex="sticky"
      bg={bgColor}
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow={useColorModeValue(
        '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
      )}
      transition="all 0.3s ease"
    >
      <Container maxW="1140px" px={4}>
        <Flex h={20} justifyContent="space-between" alignItems="center" flexDir={{ base: "column", sm: "row" }}>
          <Box
            position="relative"
            _hover={{
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease'
            }}
          >
            <Text
              fontSize={{ base: "24px", sm: "32px" }}
              fontWeight={800}
              textTransform="uppercase"
              textAlign="center"
              bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
              bgClip="text"
              letterSpacing="0.5px"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0%',
                height: '3px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}
              _hover={{
                _after: {
                  width: '100%'
                }
              }}
            >
              <Link to="/">Product Store 🛒</Link>
            </Text>
          </Box>
          
          <HStack spacing={3} alignItems="center">
            <Link to="/create">
              <Button
                colorScheme="blue"
                variant="solid"
                size="lg"
                borderRadius="full"
                px={6}
                py={6}
                bgGradient="linear(135deg, #4299e1 0%, #3182ce 100%)"
                color="white"
                border="none"
                boxShadow="0 4px 15px rgba(66, 153, 225, 0.4)"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(66, 153, 225, 0.6)',
                  bgGradient: 'linear(135deg, #3182ce 0%, #2b77cb 100%)'
                }}
                _active={{
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(66, 153, 225, 0.4)'
                }}
                transition="all 0.2s ease"
              >
                <PlusSquareIcon fontSize="18px" mr={2} />
                Add Product
              </Button>
            </Link>
            
            <Button
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
              borderRadius="full"
              w={12}
              h={12}
              bg={useColorModeValue('gray.100', 'gray.700')}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.600'),
                transform: 'rotate(180deg) scale(1.1)',
                boxShadow: useColorModeValue(
                  '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '0 4px 12px rgba(255, 255, 255, 0.1)'
                )
              }}
              _active={{
                transform: 'rotate(180deg) scale(0.95)'
              }}
              transition="all 0.3s ease"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '0%',
                height: '0%',
                bg: useColorModeValue('rgba(66, 153, 225, 0.1)', 'rgba(255, 255, 255, 0.1)'),
                borderRadius: 'full',
                transition: 'all 0.3s ease'
              }}
              
            >
              <Box
                as={colorMode === 'light' ? MoonIcon : SunIcon}
                fontSize="20px"
                color={useColorModeValue('gray.600', 'yellow.400')}
                zIndex={1}
                position="relative"
              />
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar