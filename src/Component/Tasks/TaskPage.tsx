import React, { useState } from 'react'
import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import useColumnTasks from '../../hooks/useColumnTask'
import Column from './Column'
import { ColumnType } from '../../utils/enums'
// import { Standard } from "@typebot.io/react";
// <Standard style={{ width: "100%", height: "600px" }} typebot={'taskover-vtisosw'} />
function TaskPage() {

    const {addEmptyTask} = useColumnTasks(ColumnType.TO_DO)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [checkedItems, setCheckedItems] = useState([false, false])
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
    
  return (
    <>
    <IconButton 
                // onClick={onOpen}
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
                onClick = {addEmptyTask}
        />

    <Modal onClose={onClose} isOpen={isOpen} size={'full'} >
      <ModalOverlay />
      
      <ModalContent pt={6} m={10} rounded={8}>

      <Box py={2} px={6} color={useColorModeValue("gray.500", "gray.400")}>
        <Text>Session Name</Text>
      </Box>
        <Heading p={6} as='h1' size='xl'>Task Title</Heading>
        <Divider/>

        <ModalCloseButton />
        <ModalBody px={6}>
        
        <Flex py={6} color={useColorModeValue("gray.500", "gray.400")}>
          <Flex  flexDirection={'column'} pr={"4rem"} gap={4}>
            <Text >Status</Text>
            <Text >Assignee</Text>
            <Text >Due Date</Text>
            <Text >Lable</Text>
          </Flex>
          <Flex flexDirection={'column'} gap={4}>
            <Text >Todo</Text>
            <Text >Abduallah</Text>
            <Text >10-10-2000</Text>
            <Text >Programming</Text>
          </Flex>
        </Flex>
        <Divider/>
        <Heading pt={6} as='h2' size='lg'>Description</Heading>
        <Text py={5}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, perferendis corporis? Inventore quam expedita error tempore, et iure sint est quibusdam placeat maxime sunt? Suscipit magni recusandae sunt at quidem.</Text>
        <Divider/>
        <Heading pt={6} as='h2' size='lg'>Sub Tasks</Heading>

        <Box py={5}>
          <Checkbox 
            pb={3}
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
          >
            Parent Checkbox
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox 
              isChecked={checkedItems[0]}
              onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
            >
              Child Checkbox 1
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
            >
              Child Checkbox 2
            </Checkbox>
          </Stack>
        </Box>

        <Divider/>
        <Heading pt={6} as='h2' size='lg'>Pomodoro</Heading>

        <Accordion defaultIndex={[0]} allowMultiple py={5}>
          <AccordionItem >
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </AccordionPanel>
          </AccordionItem>

        </Accordion>


        <Progress colorScheme='green' height='18px' value={20} rounded={18} my={6}/>

        </ModalBody>
        <Divider/>
        <ModalFooter justifyContent={'center'}>
          <Button colorScheme='green' onClick={onClose}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  </>
  )
}

export default TaskPage