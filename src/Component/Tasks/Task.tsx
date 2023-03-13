import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {Accordion, Text, useColorModeValue, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Progress, Stack, Textarea, useDisclosure, Spacer} from "@chakra-ui/react"
import { TaskModel } from "../../utils/models";
import { AutoResizeTextArea } from "./AutoResizeTextArea";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import _ from 'lodash';
import { memo, useState } from 'react';
import { TfiMoreAlt } from 'react-icons/tfi';


type TaskProps = {
    index: number;
    task: TaskModel;
    onUpdate: (id: TaskModel["id"], updateTask: TaskModel) => void;
    onDelete: (id: TaskModel["id"]) => void;
    onDropHover: (i: number, j: number) => void;
};

function Task({
    index, 
    task,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
    onDropHover: handleDropHover,
}: TaskProps){
    const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
        { task, index}, handleDropHover
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = e.target.value;
        handleUpdate(task.id, {...task, title: newTitle})
    }
    const handleDeleteClick = () => handleDelete(task.id)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [checkedItems, setCheckedItems] = useState([false, false])
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
    
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} size={'full'} >
            <ModalOverlay />
            
            <ModalContent position={'relative'} pt={6} mt={10} mr={10}  mb={"8rem"} ml={10} rounded={8}>

            <Box py={2} px={6} color={useColorModeValue("gray.500", "gray.400")}>
                <Text>Session Name</Text>
            </Box>

                <Heading p={6} as='h1' size='xl'>
                        Task Title
                </Heading>
                
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
                
                    <Checkbox 
                        pt={6}
                        display={'flex'} 
                        alignItems={'center'}
                        size='lg'
                        colorScheme='green'
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                    >
                    <Text fontSize='4xl' fontWeight='bold' mx={2}  as='h2' size='lg'>
                    Sub Tasks

                    </Text>
                    </Checkbox>


                <Box py={5}>

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

                <Accordion defaultIndex={[0]} allowMultiple py={5}>
                <AccordionItem border={'none'}>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                        <Heading py={6} as='h2' size='lg'>Pomodoro</Heading>
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

                    <Progress position={'fixed'} colorScheme='green' w='85%' height='1rem' value={50} rounded={18} zIndex={100} bottom={"6%"} left={"50%"} transform='translate(-50%, -10%)' outline={'.4rem solid'}/>

                </ModalBody>

                <Divider/>
                <ModalFooter justifyContent={'center'}>
                <Button colorScheme='green' onClick={onClose}>Submit</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
  
        <Box
        display={'flex'}
        flexDirection='column'
        onClick={onOpen}
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        minW={200}
        pt={2}
        px={7}
        pb={3}
        border='3px solid'
        borderColor={useColorModeValue("#f0f0f0", "#242a38")}
 
        // boxShadow="xl"
        cursor="grab"
        bgColor={useColorModeValue("white", "gray.900")}
        flexGrow={0}
        flexShrink={0}
        opacity={isDragging ? 1: 1}
        minH={150}
        maxH={200}
        color={useColorModeValue("gray.700", "gray.300")}
        fontWeight="semibold"

        >
            <Text pb={8}>{task.title}</Text>    
            <Spacer/>

            <Progress colorScheme='green' height='7px' value={30} rounded={18} mb={2}/>

        </Box>
        </>
    )
}

export default Task