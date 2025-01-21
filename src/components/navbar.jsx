// components/Navbar.js
import { Link } from "react-router-dom";
import { Box, Flex, Spacer, Button, Text } from "@chakra-ui/react";

const Navbar = () => {
  // Simulate authentication state (replace with actual auth logic)
 

  return (
    <Flex as="nav" bg="blue.500" p={4} color="white">
      <Text fontSize="xl" fontWeight="bold">
        Edgistify
      </Text>
      <Spacer />
      <Box>
          <>
            <Link to="/">
              <Button colorScheme="teal" variant="solid" mr={2}>
                Signup
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal" variant="solid" mr={2}>
                Login
              </Button>
            </Link>
            <Link to="/products">
              <Button colorScheme="teal" variant="solid" mr={2}>
                Products
              </Button>
            </Link>
            <Link to="/cart">
              <Button colorScheme="teal" variant="solid">
                Cart
              </Button>
            </Link>
          </>
      </Box>
    </Flex>
  );
};

export default Navbar;
