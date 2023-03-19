import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  useDisclosure,
  Icon,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface User {
  id:string,
  name:string,
  email:string,
  phone:number
}

export default function ShowUsers() {
  let { id } = useParams();
  const toast = useToast();
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [users, setUsers] = useState<User[]>([]);
  
  const fetchUsers = async () => {
    const request = await fetch(`http://localhost:3003/usersAndSession/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if(data.message === 'There is no Users in Sessions'){
      return data.message
    }
    console.log(Object.values(data.message));
    
    setUsers(Object.values(data.message) as User[])
    
  };
  // const fetchUsers = async () => {
  //   const request = await fetch(`http://localhost:3003/usersAndSession/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });
  //   const data = await request.json();
  //   if(data.message === 'There is no Users in Sessions'){
  //     return data.message
  //   }
    
  //   setUsers(Object.values(data)[0] as User[])
  //   // console.log(data);
    
  // };
  
  const deleteUser = async (userId:string) => {

    
    const request = await fetch(`http://localhost:3003/usersAndSession/${id}/${userId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json", 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await request.json()
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
      title:"User deleted successfully!",
      status: "success",
      duration: 3000,
      position: "top",
    });
  };
  
  
  useEffect(() => {
    fetchUsers()
  }, [])

  
  
    
  return (
    <Center py={6}>
      <Box textAlign={'center'}>
        <Heading p={6}>Users in Session</Heading>
        <Box>
        <SimpleGrid m={2.5} columns={{ base: 1, lg: 2, xl: 3 }} spacing={10}>
          {users.map((user:any, i) => 
          (
            <Center py={6} key={i}>
              <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                m={3}
                p={6}
                textAlign={'center'}
              >

                <Text fontWeight={600} color={'gray.500'} mb={4}></Text>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  {user.user.name}
                </Text>

                <Stack
                  align={'center'}
                  justify={'center'}
                  direction={'row'}
                  mt={6}
                >
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}
                  >
                    {user.user.email}
                  </Badge>
                </Stack>
                <Stack mt={8} direction={'row'} spacing={4}>
                  <Button
                  onClick={() => deleteUser(user.user.id)}
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    colorScheme="red"
                    color={'white'}
                    
                    // _hover={{
                    //   bg: '#008755',
                    // }}
                    // _focus={{
                    //   bg: '#008755',
                    // }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Center>
          ))}
        </SimpleGrid>
        </Box>
      </Box>
    </Center>
  );
}
function toast(arg0: { title: any; status: string; duration: number; position: string; }) {
  throw new Error('Function not implemented.');
}

