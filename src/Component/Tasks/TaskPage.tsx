import React, { useEffect, useState } from 'react'
import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, FormControl, Input, FormLabel, Textarea, Select, HStack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import useColumnTasks from '../../hooks/useColumnTask'
import Column from './Column'
import { ColumnType } from '../../utils/enums'

function TaskPage() {

    const {addEmptyTask} = useColumnTasks(ColumnType.TO_DO)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

  
    const [Employee, setEmployeess] = useState<string[]>([]);
    const [title, setTitle] = React.useState("")
    const [assignToId, setAssignToId] = React.useState("")
    const [description, setDescription] = React.useState("")
    
    const fetchEmployees = async () => {
      const request = await fetch("http://localhost:3003/usersAndSession", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      setEmployeess(Object.values(data)[0] as string[])
    
    };



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
          sessionId:"7d1bd148-d923-4ef2-8018-83d7c831026a",

        })
      });
     
      console.log(await request.json());
      
      // const data = await request.json();
      // setEmployeess(Object.values(data)[0] as string[])
    
    };


    useEffect(() => {
      fetchEmployees()
    }, []);

    console.log(assignToId);
    
  return (
    <>
    <IconButton 
                onClick={onOpen}
                size="xs"
                w = "100%"
                h = "40px"
                color={useColorModeValue("gray.500", "gray.400")}
                bgColor={useColorModeValue("gray.100", "gray.800")}
                _hover={{bgColor: useColorModeValue("gray.200", "gray.600")}}
                variant="solid"
                colorScheme="black"
                aria-label="add-task"
                icon={<AddIcon/>}
                // onClick = {addEmptyTask}
        />


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
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
              {Employee.map((e: any) => (   
              <option value={e.user.id} key={e.user.id}>{(e.user.name)}</option>
              ))}
              </Select>
              </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={addTask} colorScheme='blue' mr={3}>
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