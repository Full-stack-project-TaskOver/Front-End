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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SimpleCard() {
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");
  const toast = useToast();
  const navigate = useNavigate();

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
        title: " Logged in successfully!",
        status: "success",
        duration: 3000,
        position: "top",
      });
      localStorage.setItem("token", data.token);
      navigate("Sessions");
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack mb={10} align={"center"}>
            <Heading fontSize={"3xl"}>Sign in to your account</Heading>
            <Text fontSize={"s"} color={"gray.600"}></Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}>
                {/* <Checkbox>Remember me</Checkbox> */}
              </Stack>
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
                onClick={submitLogin}>
                Sign in
              </motion.button>
              {/* <Button onClick={submitLogin}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button> */}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don’t you have an account?{" "}
                <Link href="sign-up" color={"#ff9966"}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
