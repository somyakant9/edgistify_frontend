/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Spinner,
  Text,
  Grid,
  Image,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const toast = useToast();
  let token = localStorage.getItem("authToken");

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://edgisitify-backend.onrender.com/api/products"
        );
        setProducts(response.data.data.products);
      } catch (error) {
        toast({
          title: "Error fetching products",
          description: "Could not fetch products. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart action
  const handleAddToCart = (productId) => {
    let quantity = quantities[productId] || 1;
    handleAddItemsToCart(productId, quantity);
  };

  let handleAddItemsToCart = async (productId, quantity) => {
    try {
      let response = await axios.post(
        "https://edgisitify-backend.onrender.com/api/cart",
        { productId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      toast({
        title: "Product added to cart",
        description: `You added an item to the cart.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        toast({
          title: "Error adding products",
          description: "Need to signup/login first. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error adding products",
          description: "Could not add products. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const updateQuantity = (productId, change) => {
    console.log(productId, change);
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = currentQuantity + change;
      if (newQuantity < 1) return prevQuantities;
      return { ...prevQuantities, [productId]: newQuantity };
    });

    console.log(quantities);
  };

  return (
    <Box p={8}>
      <Text fontSize="2xl" mb={6} textAlign="center" color="teal.500">
        Products
      </Text>

      {loading ? (
        <Spinner size="xl" color="teal.500" mx="auto" display="block" />
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gridGap={4}
        >
          {products.map((product) => (
            <Box
              key={product._id}
              borderWidth={1}
              borderRadius="md"
              p={3}
              shadow="md"
              w="full"
              maxW="sm"
            >
              <Image
                src={product.image}
                alt={product.title}
                boxSize="200px"
                objectFit="cover"
                loading="lazy"
              />
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                {product.title}
              </Text>
              <Text mt={2}>{product.description}</Text>
              <Text mt={2} fontSize="lg" color="teal.500">
                ₹ {product.price}
              </Text>

              <Stack
                direction="column"
                mt={4}
                alignItems="center"
                justifyContent="center"
              >
                <Stack
                  direction="row"
                  mt={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    size="sm"
                    onClick={() => updateQuantity(product._id, -1)}
                    isDisabled={(quantities[product._id] || 1) <= 1}
                  >
                    -
                  </Button>

                  <Text mx={4} fontWeight="bold">
                    {quantities[product._id] || 1}
                  </Text>

                  <Button
                    size="sm"
                    onClick={() => updateQuantity(product._id, 1)}
                    isDisabled={(quantities[product._id] || 1) >= product.stock}
                  >
                    +
                  </Button>
                </Stack>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleAddToCart(product._id, 1)}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Products;
