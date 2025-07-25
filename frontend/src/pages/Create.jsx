import React, { useState } from 'react'
import { 
  Container, 
  VStack, 
  Heading, 
  Box, 
  useColorModeValue,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Image,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  Divider,
  Progress
} from '@chakra-ui/react'
import { AddIcon, AttachmentIcon } from '@chakra-ui/icons'


const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState("")

  const bg = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const inputBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const accentColor = useColorModeValue('purple.500', 'purple.400')
  
  const toast = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))

    // Update image preview when image URL changes
    if (name === 'image') {
      setImagePreview(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Basic validation
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/products', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      // Reset form after successful submission
      setNewProduct({
        name: "",
        price: "",
        image: "",
      })
      setImagePreview("")

      toast({
        title: "Success",
        description: "Product created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <Box textAlign="center">
          <Flex justify="center" align="center" mb={4}>
            <Box
              p={3}
              borderRadius="full"
              bg={useColorModeValue('purple.100', 'purple.900')}
              color={accentColor}
            >
              <Icon as={AddIcon} boxSize={6} />
            </Box>
          </Flex>
          <Heading 
            as="h1" 
            size="2xl" 
            mb={3}
            bgGradient="linear(135deg, purple.400, pink.400, orange.400)"
            bgClip="text"
            fontWeight="800"
          >
            Create New Product
          </Heading>
          <Text color={textColor} fontSize="lg" maxW="md" mx="auto">
            Add a new product to your store with all the essential details
          </Text>
        </Box>

        <Flex gap={8} direction={{ base: "column", lg: "row" }} align="flex-start">
          {/* Form Section */}
          <Box flex="1">
            <Box 
              bg={bg} 
              p={8} 
              borderRadius="2xl" 
              boxShadow="xl"
              border="1px solid"
              borderColor={borderColor}
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                bgGradient: 'linear(to-r, purple.400, pink.400, orange.400)',
                borderTopRadius: '2xl'
              }}
            >
              {isLoading && (
                <Progress 
                  size="xs" 
                  isIndeterminate 
                  colorScheme="purple"
                  position="absolute"
                  top="4px"
                  left={0}
                  right={0}
                  borderTopRadius="2xl"
                />
              )}
              
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel 
                      fontWeight="600" 
                      color={textColor}
                      fontSize="md"
                      mb={3}
                    >
                      Product Name
                    </FormLabel>
                    <Input 
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      placeholder="Enter a catchy product name"
                      size="lg"
                      bg={inputBg}
                      border="2px solid transparent"
                      borderRadius="xl"
                      _focus={{
                        borderColor: 'purple.400',
                        boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.3)',
                        bg: useColorModeValue('white', 'gray.700')
                      }}
                      _hover={{
                        borderColor: useColorModeValue('gray.300', 'gray.500')
                      }}
                      transition="all 0.2s ease"
                      fontSize="md"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel 
                      fontWeight="600" 
                      color={textColor}
                      fontSize="md"
                      mb={3}
                    >
                      Price
                    </FormLabel>
                    <InputGroup size="lg">
                      <InputLeftElement
                        pointerEvents="none"
                        color={useColorModeValue('gray.500', 'gray.400')}
                        fontSize="lg"
                        fontWeight="bold"
                      >
                        ₹
                      </InputLeftElement>
                      <Input 
                        name="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        bg={inputBg}
                        border="2px solid transparent"
                        borderRadius="xl"
                        pl={12}
                        _focus={{
                          borderColor: 'purple.400',
                          boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.3)',
                          bg: useColorModeValue('white', 'gray.700')
                        }}
                        _hover={{
                          borderColor: useColorModeValue('gray.300', 'gray.500')
                        }}
                        transition="all 0.2s ease"
                        fontSize="md"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel 
                      fontWeight="600" 
                      color={textColor}
                      fontSize="md"
                      mb={3}
                    >
                      Product Image
                    </FormLabel>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none">
                        <Icon as={AttachmentIcon} color={useColorModeValue('gray.500', 'gray.400')} />
                      </InputLeftElement>
                      <Input 
                        name="image"
                        value={newProduct.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        bg={inputBg}
                        border="2px solid transparent"
                        borderRadius="xl"
                        _focus={{
                          borderColor: 'purple.400',
                          boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.3)',
                          bg: useColorModeValue('white', 'gray.700')
                        }}
                        _hover={{
                          borderColor: useColorModeValue('gray.300', 'gray.500')
                        }}
                        transition="all 0.2s ease"
                        fontSize="md"
                      />
                    </InputGroup>
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')} mt={2}>
                      Enter a valid image URL to preview your product
                    </Text>
                  </FormControl>

                  <Divider borderColor={borderColor} />

                  <Button 
                    type="submit" 
                    size="lg"
                    width="full"
                    isLoading={isLoading}
                    loadingText="Creating Product..."
                    bg="linear-gradient(135deg, #805ad5 0%, #d53f8c 50%, #fd7f3c 100%)"
                    color="white"
                    border="none"
                    borderRadius="xl"
                    py={6}
                    fontSize="lg"
                    fontWeight="700"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(128, 90, 213, 0.4)',
                      bg: "linear-gradient(135deg, #744bb3 0%, #c13584 50%, #e6682e 100%)"
                    }}
                    _active={{
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 15px rgba(128, 90, 213, 0.3)'
                    }}
                    transition="all 0.2s ease"
                    leftIcon={<AddIcon />}
                  >
                    Create Product
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>

          {/* Preview Section */}
          <Box flex="0 0 350px" display={{ base: "none", lg: "block" }}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              position="sticky"
              top={4}
            >
              <Heading size="md" mb={4} color={textColor}>
                Preview
              </Heading>
              
              {imagePreview || newProduct.name || newProduct.price ? (
                <VStack spacing={4} align="stretch">
                  {/* Image Preview */}
                  <Box
                    borderRadius="xl"
                    overflow="hidden"
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    h="200px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/300x200?text=Invalid+Image+URL"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
                        }}
                      />
                    ) : (
                      <Box textAlign="center" color={useColorModeValue('gray.400', 'gray.500')}>
                        <Icon as={AttachmentIcon} boxSize={8} mb={2} />
                        <Text fontSize="sm">Image preview will appear here</Text>
                      </Box>
                    )}
                  </Box>

                  {/* Product Details */}
                  <VStack align="stretch" spacing={2}>
                    <Text 
                      fontSize="lg" 
                      fontWeight="600" 
                      color={textColor}
                      noOfLines={2}
                    >
                      {newProduct.name || "Product Name"}
                    </Text>
                    
                    {newProduct.price && (
                      <Text 
                        fontSize="xl" 
                        fontWeight="bold" 
                        color={useColorModeValue('green.600', 'green.400')}
                      >
                        ₹{parseFloat(newProduct.price || 0).toFixed(2)}
                      </Text>
                    )}
                  </VStack>
                </VStack>
              ) : (
                <Box 
                  textAlign="center" 
                  py={12}
                  color={useColorModeValue('gray.400', 'gray.500')}
                >
                  <Icon as={AddIcon} boxSize={12} mb={4} opacity={0.5} />
                  <Text>Fill in the form to see your product preview</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Flex>
      </VStack>
    </Container>
  )
}

export default Create