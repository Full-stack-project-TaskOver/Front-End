import React, { useEffect, useState } from 'react'
import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, FormControl, Input, FormLabel, Textarea, Select, HStack, Icon } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import useColumnTasks from '../../hooks/useColumnTask'
import Column from './Column'
import { ColumnType } from '../../utils/enums'
import { useParams } from 'react-router-dom'

function TaskPage() {

    const {addEmptyTask} = useColumnTasks(ColumnType.TO_DO)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    let { id } = useParams();
  
    const [users, setUsers] = useState<string[]>([]);
    const [title, setTitle] = React.useState("")
    const [assignToId, setAssignToId] = React.useState("")
    const [description, setDescription] = React.useState("")
    
    const getUsers = async () => {
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
      
      setUsers(Object.values(data)[0] as string[])
    };


// console.log(users)
    const addTask = async () => {
      const request = await fetch('http://localhost:3003/task', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          assignToId,
          sessionId:id,

        }),
      });
     if (request.status === 200) {
      onClose()
     }
      // console.log(await request.json());
    
    };


    useEffect(() => {
      getUsers()
    }, []);
    
  return (
    <>

    <Button                  onClick={onOpen}

                size="sm"
                w = "50%"
                h = "40px"
                color={useColorModeValue("white", "white")}
                bgColor={useColorModeValue('#5addbe', "#5bc8ae")}
                border={'3px solid'}
                borderColor={useColorModeValue("#5bc8ae", "#30917a")}
                _hover={{
                    bgColor: useColorModeValue("#2cb997", "#5addbe"),
                }
                }
                variant="solid"
                colorScheme="black"
                aria-label="add-task"
              
        >

            <Icon as={AddIcon} mr={2} /> Add Task

        </Button>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} placeholder='Title' onChange={(e)=> setTitle(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='Description' onChange={(e)=> setDescription(e.target.value)}/>
            </FormControl>
 
             <FormControl mt={4}>
            <FormLabel>Assignee to</FormLabel>
            <Select placeholder='Assignee to' onChange={(e)=> setAssignToId(e.target.value)}>
              {users != undefined && users.map((e: any) => (   
              <option value={e.user.id} key={e.user.id}>{(e.user.name)}</option>
              ))}
              </Select>
              </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={addTask} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  </>
  )
}

export default TaskPage