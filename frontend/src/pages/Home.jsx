import React, { useEffect } from 'react';
import {
  Container,
  VStack,
  Text,
  Box,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  Heading,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  Badge,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { fetchProducts, products } = useProductStore();
  
  const bgGradient = useColorModeValue(
    'linear(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(219, 70, 239, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
    'linear(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(219, 70, 239, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Loading skeleton component
  const ProductSkeleton = () => (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
      p={4}
    >
      <Skeleton height="200px" borderRadius="xl" mb={4} />
      <SkeletonText mt="4" noOfLines={2} spacing="4" />
      <Skeleton height="20px" mt={4} width="60%" />
    </Box>
  );

  return (
    <Box minH="100vh" position="relative">
      {/* Background decoration */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="400px"
        bgGradient={bgGradient}
        zIndex={-1}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 107, 107, 0.3) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}
      />

      <Container maxW="container.xl" py={20}>
        <VStack spacing={12} w="full">
          {/* Hero Section */}
          <Box textAlign="center" maxW="4xl" mx="auto">
            <Flex justify="center" mb={6}>
              <Box
                p={4}
                borderRadius="full"
                bg={useColorModeValue('blue.100', 'blue.900')}
                color={useColorModeValue('blue.600', 'blue.300')}
                boxShadow="0 8px 25px rgba(59, 130, 246, 0.3)"
              >
                <Text fontSize="3xl">🚀</Text>
              </Box>
            </Flex>

            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="900"
              mb={6}
              bgGradient="linear(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
              bgClip="text"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Our Product Store
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="2xl"
              mx="auto"
              lineHeight="1.6"
              mb={8}
            >
              Discover amazing products carefully curated for you. From everyday essentials to unique finds, we've got everything you need.
            </Text>

            {/* Stats Bar */}
            <HStack
              justify="center"
              spacing={8}
              mb={12}
              flexWrap="wrap"
              gap={4}
            >
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('blue.600', 'blue.400')}>
                  {products.length}
                </Text>
                <Text fontSize="sm" color={mutedTextColor} fontWeight="medium">
                  Products Available
                </Text>
              </VStack>
              
              <Divider orientation="vertical" height="40px" borderColor={borderColor} />
              
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('green.600', 'green.400')}>
                  100%
                </Text>
                <Text fontSize="sm" color={mutedTextColor} fontWeight="medium">
                  Quality Assured
                </Text>
              </VStack>
              
              <Divider orientation="vertical" height="40px" borderColor={borderColor} />
              
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('purple.600', 'purple.400')}>
                  24/7
                </Text>
                <Text fontSize="sm" color={mutedTextColor} fontWeight="medium">
                  Support Available
                </Text>
              </VStack>
            </HStack>

            {/* Quick Actions */}
            <HStack justify="center" spacing={4} flexWrap="wrap">
              <Link to="/create">
                <Button
                  size="lg"
                  leftIcon={<AddIcon />}
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  color="white"
                  border="none"
                  borderRadius="full"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    bg: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)"
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition="all 0.2s ease"
                >
                  Add New Product
                </Button>
              </Link>
              
              <Button
                size="lg"
                leftIcon={<SearchIcon />}
                variant="outline"
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                color={textColor}
                borderRadius="full"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{
                  bg: useColorModeValue('gray.50', 'gray.700'),
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s ease"
              >
                Browse Categories
              </Button>
            </HStack>
          </Box>

          {/* Products Section */}
          <Box w="full">
            {products.length > 0 && (
              <Flex justify="space-between" align="center" mb={8}>
                <VStack align="start" spacing={2}>
                  <Heading size="xl" color={textColor}>
                    Featured Products
                  </Heading>
                  <Text color={mutedTextColor}>
                    Handpicked items just for you
                  </Text>
                </VStack>
                
                <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  {products.length} items
                </Badge>
              </Flex>
            )}

            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={8}
              w="full"
              minH="200px"
            >
              {/* Show skeletons while loading */}
              {!products.length && Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
              
              {/* Show actual products */}
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            {/* Empty State */}
            {products.length === 0 && (
              <Box textAlign="center" py={20}>
                <Box
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="3xl"
                  px={12}
                  py={16}
                  maxW="lg"
                  mx="auto"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    bgGradient: 'linear(to-r, blue.400, purple.400, pink.400)',
                  }}
                >
                  {/* Decorative Elements */}
                  <Box
                    position="absolute"
                    top={6}
                    right={6}
                    opacity={0.1}
                    fontSize="6xl"
                    transform="rotate(15deg)"
                  >
                    🛒
                  </Box>
                  
                  <VStack spacing={6}>
                    <Box
                      p={6}
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      color={useColorModeValue('gray.400', 'gray.500')}
                    >
                      <Text fontSize="4xl">📦</Text>
                    </Box>

                    <VStack spacing={3}>
                      <Heading size="lg" color={textColor}>
                        No Products Yet
                      </Heading>
                      <Text 
                        fontSize="md" 
                        color={mutedTextColor} 
                        maxW="sm" 
                        mx="auto"
                        lineHeight="1.6"
                      >
                        Your product catalog is empty. Start building your amazing collection by adding your first product!
                      </Text>
                    </VStack>

                    <Divider borderColor={borderColor} />

                    <Link to="/create">
                      <Button
                        size="lg"
                        leftIcon={<AddIcon />}
                        bg="linear-gradient(135deg, #4299e1 0%, #3182ce 100%)"
                        color="white"
                        border="none"
                        borderRadius="full"
                        px={10}
                        py={6}
                        fontSize="md"
                        fontWeight="600"
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(66, 153, 225, 0.4)',
                          bg: "linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%)"
                        }}
                        _active={{
                          transform: 'translateY(0)',
                        }}
                        transition="all 0.2s ease"
                      >
                        Create Your First Product
                      </Button>
                    </Link>
                  </VStack>
                </Box>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;