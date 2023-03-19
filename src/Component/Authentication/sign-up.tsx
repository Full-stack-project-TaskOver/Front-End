import React from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const request = await fetch("http://localhost:3003/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        // const data = await request.json();
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
        title: "Account successfully created",
        status: "success",
        duration: 3000,
        position: "top",
      });

      navigate("/sign-in");
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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={440}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Stack spacing={4} mt={10}>
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} />
              </FormControl>
            </Box>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPass(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2} alignItems={"center"} w={"100%"}>
              <motion.button
                style={{
                  color: "white",
                  textAlign: "center",
                  alignContent: "center",
                  // marginTop: "1rem",
                  fontSize: "1.2rem",
                  width: "100%",
                  height: "2.5em",
                  fontWeight: "400",
                  borderRadius: "14px",
                }}
                initial={{
                  background: "linear-gradient(to right, #ff9966, #ff5e62)",
                }}
                whileHover={{
                  background: "linear-gradient(to right, #ff5e62, #ff9966)",
                  scale: 1.02,
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}
                whileTap={{
                  scale: 1,
                }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                onClick={signup}>
                Sign up
              </motion.button>

              {/* <Button
                onClick={signup}
                size="lg"
                bg={"linear-gradient(to right, #ff5e62, #ff9966)"}
                color={"white"}
                _hover={{
                  bg: "#ff9966",
                }}>
                Sign up
              </Button> */}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="sign-in" color={"#ff9966"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
