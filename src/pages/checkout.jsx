import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Checkout = () => {
  const [billingAddress, setBillingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem("authToken");

  const handleOrderPlacement = async () => {
    if (!billingAddress.trim()) {
      toast({
        title: "Billing Address Required",
        description: "Please enter your billing address to proceed.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://edgisitify-backend.onrender.com/api/orders",
        { shippingAddress:billingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      toast({
        title: "Order Placed Successfully",
        description: `Your order ID is ${response.data.orderId}. Thank you for shopping with us!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset the input field
      setBillingAddress("");
    } catch (error) {
      toast({
        title: "Order Placement Failed",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto" mt={10} borderWidth={1} borderRadius="md" shadow="md">
      <Text fontSize="2xl" mb={6} textAlign="center" color="teal.500">
        Checkout
      </Text>
      <VStack spacing={4}>
        <Input
          placeholder="Enter Billing Address"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          size="lg"
          isRequired
        />
        <Button
          colorScheme="teal"
          size="lg"
          isLoading={loading}
          onClick={handleOrderPlacement}
        >
          Place Order
        </Button>
      </VStack>
    </Box>
  );
};

export default Checkout;
