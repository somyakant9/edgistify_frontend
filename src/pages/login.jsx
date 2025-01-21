import React, { useState } from 'react';
import { Button,Heading, FormControl, FormLabel, Input, FormErrorMessage, Box, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handle form validation
  const validateForm = () => {
    const formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('https://edgisitify-backend.onrender.com/api/auth/login', { email, password });

      if (response.status === 200) {
        toast({
          title: 'Login Successful!',
          description: 'You have successfully logged in.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        localStorage.setItem('authToken' , response.data.token);

        // After successful login, redirect to products page 
        setTimeout(() => {
         navigate('/products'); // Redirect to products page after login
        }, 2000);
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.response.data.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
     <Box p={8} maxW="md" mx="auto" mt={10} >
          <Heading mb={6} textAlign="center" color="teal.500">
            Login
          </Heading>
          <VStack as="form" spacing={4} onSubmit={handleLogin}>   
            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
    
            <FormControl isInvalid={!!errors.password} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
    
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </VStack>
        </Box>
  );
};

export default Login;
