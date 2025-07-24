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
    
    // Basic validation
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // TODO: Add your API call here
    console.log("Product to create:", newProduct)
    
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
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        
        <Box w={"full"} bg={bg} p={6} rounded={"lg"} shadow={"md"}>
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
                colorScheme="blue"
                size="lg"
                w="full"
                mt={4}
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