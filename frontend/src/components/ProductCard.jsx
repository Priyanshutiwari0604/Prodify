import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  Badge,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const bg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');
  const priceColor = useColorModeValue('green.600', 'green.400');
  const modalBg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    image: product?.image || '',
  });

  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        image: product.image || '',
      });
    }
  }, [product]);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEditProduct = () => {
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!product?._id) return;

    setIsLoading(true);
    
    const { success, message } = await updateProduct(product._id, formData);
    
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });

    if (success) {
      onClose();
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Box
        position="relative"
        bg={bg}
        borderRadius="2xl"
        border="1px solid"
        borderColor={cardBorder}
        overflow="hidden"
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          transform: 'translateY(-8px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderColor: useColorModeValue('blue.300', 'blue.400')
        }}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgGradient: 'linear(to-r, purple.400, pink.400, orange.400)',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: 'linear(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
        
      >
        {/* Image Container with Overlay */}
        <Box position="relative" overflow="hidden">
          <Image
            src={product.image}
            alt={product.name}
            w="full"
            h={56}
            objectFit="cover"
            transition="transform 0.4s ease"
            _hover={{ transform: 'scale(1.05)' }}
            fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          
          {/* Floating Action Buttons */}
          <HStack 
            position="absolute" 
            top={3} 
            right={3} 
            spacing={2}
            opacity={0}
            transform="translateY(-10px)"
            transition="all 0.3s ease"
            _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
            sx={{
              '.product-card:hover &': {
                opacity: 1,
                transform: 'translateY(0)'
              }
            }}
          >
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              aria-label="Edit Product"
              size="sm"
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.9)"
              color="blue.600"
              backdropFilter="blur(10px)"
              _hover={{
                bg: 'blue.500',
                color: 'white',
                transform: 'scale(1.1)'
              }}
              transition="all 0.2s ease"
              onClick={handleEditProduct}
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Delete Product"
              size="sm"
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.9)"
              color="red.600"
              backdropFilter="blur(10px)"
              _hover={{
                bg: 'red.500',
                color: 'white',
                transform: 'scale(1.1)'
              }}
              transition="all 0.2s ease"
              onClick={() => handleDeleteProduct(product._id)}
            />
          </HStack>

          {/* Price Badge */}
          <Badge
            position="absolute"
            bottom={3}
            left={3}
            px={3}
            py={1}
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.95)"
            color={priceColor}
            fontSize="sm"
            fontWeight="bold"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={useColorModeValue('green.200', 'green.600')}
          >
            ₹{parseFloat(product.price).toFixed(2)}
          </Badge>
        </Box>

        {/* Content Section */}
        <Box p={6}>
          <Flex justify="space-between" align="flex-start" mb={3}>
            <Heading 
              as="h3" 
              size="md" 
              color={textColor}
              fontWeight="700"
              lineHeight="1.3"
              noOfLines={2}
              _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
              transition="color 0.2s ease"
              cursor="default"
            >
              {product.name}
            </Heading>
          </Flex>
          
          <Divider mb={4} borderColor={useColorModeValue('gray.200', 'gray.600')} />
          
          {/* Action Buttons - Always Visible on Mobile/Desktop */}
          <HStack spacing={3} justify="center">
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              variant="outline"
              size="sm"
              borderRadius="full"
              px={6}
              _hover={{
                bg: 'blue.500',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
              transition="all 0.2s ease"
              onClick={handleEditProduct}
            >
              Edit
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              variant="outline"
              size="sm"
              borderRadius="full"
              px={6}
              _hover={{
                bg: 'red.500',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
              }}
              transition="all 0.2s ease"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Enhanced Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <ModalContent 
          bg={modalBg} 
          borderRadius="2xl" 
          border="1px solid"
          borderColor={cardBorder}
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        >
          <ModalHeader 
            fontSize="2xl" 
            fontWeight="700"
            bgGradient="linear(to-r, purple.400, pink.400)"
            bgClip="text"
            pb={2}
          >
            Edit Product
          </ModalHeader>
          <ModalCloseButton 
            borderRadius="full"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          />
          
          <form onSubmit={handleSaveProduct}>
            <ModalBody py={6}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel fontWeight="600" color={textColor}>Product Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    bg={inputBg}
                    border="2px solid transparent"
                    borderRadius="lg"
                    _focus={{
                      borderColor: 'blue.400',
                      bg: useColorModeValue('white', 'gray.800'),
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
                    }}
                    _hover={{
                      borderColor: useColorModeValue('gray.300', 'gray.500')
                    }}
                    transition="all 0.2s ease"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontWeight="600" color={textColor}>Price</FormLabel>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    bg={inputBg}
                    border="2px solid transparent"
                    borderRadius="lg"
                    _focus={{
                      borderColor: 'blue.400',
                      bg: useColorModeValue('white', 'gray.800'),
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
                    }}
                    _hover={{
                      borderColor: useColorModeValue('gray.300', 'gray.500')
                    }}
                    transition="all 0.2s ease"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontWeight="600" color={textColor}>Image URL</FormLabel>
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    bg={inputBg}
                    border="2px solid transparent"
                    borderRadius="lg"
                    _focus={{
                      borderColor: 'blue.400',
                      bg: useColorModeValue('white', 'gray.800'),
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)'
                    }}
                    _hover={{
                      borderColor: useColorModeValue('gray.300', 'gray.500')
                    }}
                    transition="all 0.2s ease"
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter pt={6}>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
                loadingText="Saving..."
                borderRadius="full"
                px={8}
                bg="linear-gradient(135deg, #4299e1 0%, #3182ce 100%)"
                _hover={{
                  bg: "linear-gradient(135deg, #3182ce 0%, #2b77cb 100%)",
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s ease"
              >
                Save Changes
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose}
                borderRadius="full"
                px={6}
                _hover={{
                  bg: useColorModeValue('gray.100', 'gray.700')
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;