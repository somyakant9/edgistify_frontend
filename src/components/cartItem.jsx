import { Flex, Image, Stack, Text } from "@chakra-ui/react";

const CartItem = ({ item }) => (
    <Flex
      borderWidth={1}
      borderRadius="md"
      p={4}
      mb={4}
      align="center"
      justify="space-between"
    >
      <Image
        src={item.productId.image}
        alt={item.productId.title}
        boxSize="100px"
        objectFit="cover"
        loading="lazy"
      />
      <Stack spacing={1} ml={4} flex="1" direction='row' justifyContent="space-around">
        <Text fontWeight="bold">{item.productId.title}</Text>
        <Text fontSize="sm" color="gray.600">
          {item?.productId.description?.substring(0, 15)}...
        </Text>
        <Text>₹ {item.productId.price}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </Stack>
    </Flex>
  );

  export default CartItem;