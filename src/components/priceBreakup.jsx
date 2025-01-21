import { Box, Button, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const PriceBreakup = ({
  totalItems,
  totalQuantity,
  totalPrice,
  discountAmount,
  finalPrice,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        flex="1"
        borderWidth={1}
        borderRadius="md"
        p={4}
        shadow="md"
        height="max-content"
      >
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="lg">
            Price Breakup
          </Text>
          <Flex justify="space-between">
            <Text>Total Items</Text>
            <Text>{totalItems}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Total Quantity</Text>
            <Text>{totalQuantity}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Total Price</Text>
            <Text>₹ {totalPrice}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Discount (10%)</Text>
            <Text>-₹ {discountAmount}</Text>
          </Flex>
          <Divider />
          <Flex justify="space-between" fontWeight="bold">
            <Text>Total</Text>
            <Text>₹ {finalPrice.toFixed(2)}</Text>
          </Flex>
        </VStack>
        <Button
          mt={4}
          colorScheme="teal"
          w="full"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
};

export default PriceBreakup;
