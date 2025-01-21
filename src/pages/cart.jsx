import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import PriceBreakup from "../components/priceBreakup";
import CartItem from "../components/cartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setfinalPrice] = useState(0);

  const toast = useToast();
  const token = localStorage.getItem("authToken");

  // Fetch cart data from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://edgisitify-backend.onrender.com/api/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        let cart = response.data.data;
        setTotalItems(cart?.length);
        const totalQuantity = cart?.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setTotalQuantity(totalQuantity);
        const totalPrice = cart
          ?.reduce((sum, item) => sum + item.quantity * item.productId.price, 0)
          .toFixed(2);
        const discountPercentage = 10; // Example discount
        const discountAmount = (totalPrice * discountPercentage) / 100;
        console.log(discountAmount);
        setDiscountAmount(discountAmount.toFixed(2));
        setTotalPrice(totalPrice);
        const finalPrice = totalPrice - discountAmount;
        console.log(finalPrice);
        setfinalPrice(finalPrice);
        setCartItems(cart);
      } catch (error) {
        toast({
          title: "Error fetching cart",
          description: "Could not fetch cart items. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Calculate totals

  // Spinner while loading
  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Text fontSize="2xl" mb={6} textAlign="center" color="teal.500">
        Cart
      </Text>

      <Flex justify="space-between" flexWrap="wrap">
        <Box flex="2" mr={6}>
          {cartItems?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </Box>

        <PriceBreakup
          totalItems={totalItems}
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
          discountAmount={discountAmount}
          finalPrice={finalPrice}
        />
      </Flex>
    </Box>
  );
};

export default Cart;
