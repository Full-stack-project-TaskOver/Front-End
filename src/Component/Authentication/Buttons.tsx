import { Avatar,Text,  useColorModeValue,
  Box, Button, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { ReactNode, useEffect, useState } from "react";

function Buttons() {
  const token = localStorage.getItem('token')
  if(token){
    interface User{
      name: string
    }
  
    const [user, setUser] = React.useState<User>();
  
  const getUserById = async () => {
    const request = await fetch("http://localhost:3003/user", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    setUser(Object.values(data)[0] as User)
  };
  
  useEffect(() => {
    getUserById()
  }, []);
  
  const navigate = useNavigate();

  const signOut = () =>{
    localStorage.removeItem("token")
    navigate('/')
  }
    return(
      <Flex alignItems={"center"}>

      <Menu>
        <MenuButton
          py={2}
          transition="all 0.3s"
          _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar
              size={"sm"}
              src={
                "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1678745292~exp=1678745892~hmac=f6798d432720f591bc0801f2deef92d3970a9f3427d1790a734a752fdd20fba9"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">{user != undefined &&  user.name}</Text>
              <Text fontSize="xs" color="gray.600">
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuDivider />
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
    )
  }else{

    return (
      <Flex gap={2} flexDir={'row'} justifyContent={'center'}>
        <Link to="/sign-in">
          <Button _hover={{backgroundColor:'rgba(0, 135, 85, 0.7)'}}>Sign In</Button>
        </Link>
        <Link to="/sign-up">
          <Button _hover={{backgroundColor:'rgba(0, 135, 85, 0.7)'}}>Sign Up</Button>
        </Link>
      </Flex>
    );
  }
}

export default Buttons;
