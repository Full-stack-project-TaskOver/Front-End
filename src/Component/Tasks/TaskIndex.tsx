import { Box, Text,Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { createPath, useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { ColumnType } from '../../utils/enums';
import AddUser from './AddUser';
import Cactus from './Cactus';
import Level from "../LandingPage/Components/CactusLevel";
import TaskPage from './TaskPage';
import './Cactus.css'

interface Session {
    id:string,
    title:string,
    description:string,
    creatorId:string,
    type:string,
  }
  
  interface User {
    id:string,
    name:string,
    email:string,
    phone:number
  }

  interface Task {
    user: any;
    id:string,
    title:string,
    assignById:string
    assignToId: string
    createdDate: string
    // deadline: null
    description: string
    sessionId: string
    status:string
  }


  
  

function TaskIndex() {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

const onDragEnd =  (result: DropResult, columns: { [x: string]: any; }, setColumns: { (value: React.SetStateAction<{ [x: string]: { name: string; items: () => Promise<any>; color: string; } | { name: string; items: never[]; color: string; }; }>): void; (arg0: any): void; })=> {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log("source", source);
  console.log("destination", destination);
  console.log("columns", columns);
  

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    console.log("sourceItems---", sourceColumn.items);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    console.log("sourceItems---", sourceItems);
    const [removed] = sourceItems.splice(source.index, 1);
    
    console.log("sourceItems", sourceItems);
    console.log("removed", removed);
    
    destItems.splice(destination.index, 0, removed);
    console.log({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};



    let { id } = useParams();
    const [session, setSession] = React.useState<Session>();
    const [loggedUser, setloggedUser] = React.useState<User>();
    const [level, setLevel] = React.useState<number>(0);
    const [tasks, setTasks] = React.useState<Task[]>([]);


    const [taskId, setTaskId] = React.useState<string>("");
    const [taskTitle, setTaskTitle] = React.useState<string>("");
    const [taskStatus, setTaskStatus] = React.useState<string>("");
    const [assignToId, setAssignToId] = React.useState<string>("");
    const [taskDesc, setTaskDesc] = React.useState<string>("");
    const [taskCreateAt, setTaskCreateAt] = React.useState<string>("");


    function setUseState(id:string, title:string, status:string, assignTo:string, taskDesc:string, createAt:string) {
      setTaskId(id)
      setTaskTitle(title)
      setTaskStatus(status)
      setAssignToId(assignTo)
      setTaskDesc(taskDesc)
      setTaskCreateAt(createAt.substring(0,10))
    }

    const fetchTasks:any = async () => {
      const request = await fetch(`http://localhost:3003/task/all-task/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      if(data.message === 'Session dose not exists'){
          return data.message
        }

        // console.log(data.session[0].task);
        console.log(data);
        
        
        setTasks(data.session[0].task as Task[])
        return data;
      };

      console.log(tasks,"tasks");
      
        const columnsFromBackend = {
          [uuidv4()]: { 
            name: "TODO",
            items: fetchTasks,
            color:"orange"
          },
          [uuidv4()]: {
            name: "INPROGRESS",
            items: [],
            color:"blue"
          },
          [uuidv4()]: {
            name: "COMPLETED",
            items: [],
            color:"green"
          }
        };


        const [columns, setColumns] = useState(columnsFromBackend);
        
        console.log(columns);
        
        const updateTask = async () => {

          const request = await fetch(`http://localhost:3003/task/updateStatus`, {
            method:'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            
            body:JSON.stringify({
              id: taskId,
              status: taskStatus
            })
          });
          fetchTasks()
         
        };
    const sendLevel = (level: number) => {
      setLevel(level);
    };
  
    const fetchSession = async () => {
      const request = await fetch(`http://localhost:3003/session/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      if(data.message === 'Session dose not exists'){
        return data.message
      }
      
      setSession(data.session)
    
    };
  
    const fetchLoggedUser = async () => {
      const request = await fetch(`http://localhost:3003/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      if(data.message === 'user not found'){
        return 'You are not authorized , please log in'
      }
      setloggedUser(data.user);
    
    };
  
    useEffect(() => {
      fetchTasks()
      fetchSession()
      fetchLoggedUser()
      sendLevel(level);
    }, []);

    useEffect(() => {
      updateTask()
      console.log("hi");
      
    }, [taskId]);

    
    console.log( columns);
    
  return (
    <Container maxWidth="container.xl"  py={10}>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'} >

    <Flex flexDirection={'column'} pb={10}>
    <Heading as='h1' size={{base:"lg", sm:"xl"}}>
            {session?.title}
    </Heading>
    {session?.creatorId == loggedUser?.id ? (
        <Text display={'inline'} color={'gray.400'} fontSize={{base:"xs", sm:"sm"}}>
        {session?.id}
    </Text>
    ) : ('')
        }
    </Flex>
    <Flex justifyContent={'end'} gap={2} >
    {session?.creatorId == loggedUser?.id ? 
    <>
        <TaskPage/>
        <AddUser/>
    </> : ''}
    </Flex>
    

    </Flex>
    <Flex justifyContent={"center"}>
      <Cactus userLevel={level} />
    </Flex>

    {session?.creatorId == loggedUser?.id ? '' : 
    <Box>
    <Flex gap={4} wrap={'wrap'} justifyContent="space-between">
        <Flex rounded={8} p='4' height='10' alignItems={'center'} fontWeight={'medium'}
        bgColor={useColorModeValue("white", "gray.900")}
        border={'2px solid'}
        borderColor={useColorModeValue("#f0f0f0", "#242a38")}
        >
        🔥 Streak
        </Flex>
    </Flex>
      <Level userPoints={3000} color={""} size={""} sendLevel={sendLevel} />
    </Box>
          }
        <Modal onClose={onClose} isOpen={isOpen} size={'full'}>
                <ModalOverlay />

                <ModalContent position={'relative'} pt={6} mt={10} mr={10} mb={"8rem"} ml={10} rounded={8}>

                  <Box py={2} px={6} color={useColorModeValue("gray.500", "gray.400")}>
                    <Text>{session?.title}</Text>
                  </Box>

                  <Heading p={6} as='h1' size='xl'>
                    {taskTitle}
                  </Heading>

                  <Divider />

                  <ModalCloseButton />
                  <ModalBody px={6}>

                    <Flex py={6} color={useColorModeValue("gray.500", "gray.400")}>
                      <Flex flexDirection={'column'} pr={"4rem"} gap={4}>
                        <Text>Status</Text>
                        <Text>Assignee</Text>
                        <Text>Create at</Text>
                      </Flex>
                      <Flex flexDirection={'column'} gap={4}>
                        <Text>{taskTitle}</Text>
                        <Text>{assignToId}</Text>
                        <Text>{taskCreateAt}</Text>
                      </Flex>
                    </Flex>
                    <Divider />
                    <Heading pt={6} as='h2' size='lg'>Description</Heading>
                    <Text py={5} color={useColorModeValue("gray.500", "gray.400")}>{taskDesc}</Text>
                    <Divider />


                    <Accordion defaultIndex={[0]} allowMultiple py={5}>
                      <AccordionItem border={'none'}>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            <Heading py={6} as='h2' size='lg'>Pomodoro</Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </AccordionItem>

                    </Accordion>

                  </ModalBody>

                  <Select placeholder='Select option'  onChange={(e)=> setTaskStatus(e.target.value)}>
                        <option value='TODO'>TODO</option>
                        <option value='INPROGRESS'>INPROGRESS</option>
                        <option value='COMPLETED'>COMPLETED</option>
                  </Select>

                  <Divider />
                  <ModalFooter justifyContent={'center'}>
                    <Button colorScheme='green' onClick={()=> {updateTask(), onClose()}}>Submit</Button>
                  </ModalFooter>
                </ModalContent>
        </Modal>


    <DragDropContext
      onDragEnd={result => onDragEnd(result, columns, setColumns)}
    >
        <SimpleGrid columns={{base:1, md: 3}} spacing={{base: 16, md: 4}} mt={4}>
        {Object.entries(columns).map(([columnId, column], index) => {
          
        return (
            <Box>
                <Heading fontSize="md" mb={4} letterSpacing="wide">
                    <Badge
                    px={2}
                    py={1}
                    rounded="lg"
                    colorScheme={column.color}
                    >
                        {column.name}

                    </Badge>
                </Heading>


              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  // console.log(snapshot);
                  
                  return (
                    <Stack
                    direction={{base:"row", md: "column"}}
                   spacing={4}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      background={snapshot.isDraggingOver? 
                        "#f8f8f8"
                      : "white"}
                        minH={166}
                        p={4}
                        mt={2}
                        rounded={8}
                        border={'3px dashed '}
                        borderColor={useColorModeValue("#f0f0f0", "#242a38")}
                        overflow="auto"
                    >
                      
                      {tasks.map((item, index) => {
                        
                        if(column.name == item.status && loggedUser?.id == session?.creatorId){

                          return (
                          <Draggable 
                          
                          key={item.id}
                          draggableId={item.id}
                            index={index}
                            >
                            {(provided, snapshot) => {
                              return (
                                <><Box
                                  onClick={() => {
                                    const {id, title, status, description, createdDate} = item
                                    const assignTo = item.user.name
                      
                                    setUseState(id, title, status, assignTo, description, createdDate)
                                    onOpen()
                                    }
                                  }
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    rotate: snapshot.isDragging ? "2deg" : "0deg",
                                    backgroundColor: snapshot.isDragging
                                      ? "#f8f8f8"
                                      : "white",
                                    ...provided.draggableProps.style
                                  }}
                                  rotate={snapshot.isDragging ? "30deg" : "0deg"}
                                  display={'flex'}
                                  flexDirection='column'
                                  //   ref={ref}
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
                                  cursor="grab"
                                  bgColor={useColorModeValue("white", "gray.900")}
                                  flexGrow={0}
                                  flexShrink={0}
                                  minH={150}
                                  maxH={200}
                                  color={useColorModeValue("gray.700", "gray.300")}
                                  fontWeight="semibold"
                                >
                                    <Text pb={8}>{item.title}</Text>
                                    <Spacer />
                                    {/* {console.log(item)} */}
                                    <Progress colorScheme='green' height='7px' value={30} rounded={18} mb={2} />

                                  </Box></>
                                    );
                                    }}
                                </Draggable>
                                );
                        }else if(column.name == item.status && loggedUser?.id == item.user.id){
                          return (
                            <Draggable 
                            
                            key={item.id}
                            draggableId={item.id}
                              index={index}
                              >
                              {(provided, snapshot) => {
                                return (
                                  <><Box
                                    onClick={() => {
                                      const {id, title, status, description, createdDate} = item
                                      const assignTo = item.user.name
                        
                                      setUseState(id, title, status, assignTo, description, createdDate)
                                      onOpen()
                                      }
                                    }
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      rotate: snapshot.isDragging ? "2deg" : "0deg",
                                      backgroundColor: snapshot.isDragging
                                        ? "#f8f8f8"
                                        : "white",
                                      ...provided.draggableProps.style
                                    }}
                                    rotate={snapshot.isDragging ? "30deg" : "0deg"}
                                    display={'flex'}
                                    flexDirection='column'
                                    //   ref={ref}
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
                                    cursor="grab"
                                    bgColor={useColorModeValue("white", "gray.900")}
                                    flexGrow={0}
                                    flexShrink={0}
                                    minH={150}
                                    maxH={200}
                                    color={useColorModeValue("gray.700", "gray.300")}
                                    fontWeight="semibold"
                                  >
                                      <Text pb={8}>{item.title}</Text>
                                      <Spacer />
                                      {/* {console.log(item)} */}
                                      <Progress colorScheme='green' height='7px' value={30} rounded={18} mb={2} />
  
                                    </Box></>
                                      );
                                      }}
                                  </Draggable>
                                  );
                        }
                            })}
                            {provided.placeholder}
                            </Stack>
                        );
                      }}
                    </Droppable>
        </Box>
            );
        })}
        </SimpleGrid>
    </DragDropContext>
    </Container>
    )
}

export default TaskIndex