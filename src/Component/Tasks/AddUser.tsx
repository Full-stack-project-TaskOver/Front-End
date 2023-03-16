import React, { useEffect, useState } from 'react'
import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, FormControl, Input, FormLabel, Textarea, Select, HStack, Icon } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { ColumnType } from '../../utils/enums'
import { useParams } from 'react-router-dom'

function AddUser() {

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    let  {id}  = useParams();
    const sessionId = id
    const [userId, setUserId] = React.useState("")
    
    
    const addUser = async () => {
      const request = await fetch("http://localhost:3003/usersAndSession", {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({
            userId,
            sessionId,
       })
      });
      if(request.status === 400) {
        return 'error'
      }
      if (request.status === 200) {
        onClose()
       }
      console.log(await request.json());
       console.log(request.status);
       
    };

    // console.log(userId);
    // console.log(sessionId);
    

    // useEffect(() => {
    //   fetchUsers()
    // }, []);
    
  return (
    <>

    <Button                  onClick={onOpen}

                size="sm"
                color={useColorModeValue("white", "white")}
                bgColor={useColorModeValue('#2bcb7d', "#19A963")}
                border={'2px solid'}
                borderColor={useColorModeValue("#19A963", "#19A963")}
                _hover={{
                    bgColor: useColorModeValue("#2cb997", "#5addbe"),
                }
                }
                rounded={8} p='4'                 
                variant="solid"
                // colorScheme="black"
                aria-label="add-task"
              
        >

            <Icon as={AddIcon} mr={2} /> Add User

        </Button>




      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add user to session</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input ref={initialRef} placeholder='Enter user id' onChange={(e)=> setUserId(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={addUser} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  </>
  )
}

export default AddUser