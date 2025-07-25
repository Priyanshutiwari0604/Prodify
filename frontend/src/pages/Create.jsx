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
  useToast
} from '@chakra-ui/react'

const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const bg = useColorModeValue('white', 'gray.800')
  const toast = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))
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
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" mb={6}>Create New Product</Heading>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input 
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input 
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input 
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </FormControl>

              <Button 
                type="submit" 
                colorScheme="teal" 
                width="full"
                isLoading={isLoading}
                loadingText="Creating..."
              >
                Create Product
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  )
}

export default Create