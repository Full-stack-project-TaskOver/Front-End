import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import React from 'react';
  
  export default function SimpleCard() {
    const [email, setEmail] = React.useState("")
    const [password, setPass] = React.useState("")
    const toast = useToast();

    // function signIn() {
    //     fetch('http://localhost:3003/user/sign-in',{
    //         method: "POST",
    //         headers:{
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify({
    //             email,
    //             password
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         localStorage.setItem("token",data.token);
            
    //         console.log(localStorage.getItem("token"))
    //     });
    // }
    const submitLogin = async () => {
      try {
        const request = await fetch("http://localhost:3003/user/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
          const data = await request.json();
        if (request.status !== 200) {
          toast({
            title: data.message,
            status: "error",
            duration: 3000,
            position: "top",
          });
          return;
        }
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          position: "top",
        });
        localStorage.setItem("token", data.token);
        console.log( data.token);
        // navigate("/");
      } catch (error) {
        toast({
          title: "Server Error !",
          status: "error",
          duration: 3000,
          position: "top",
        });
      }
    };
    
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=> setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=> setPass(e.target.value)}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button onClick={submitLogin}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }