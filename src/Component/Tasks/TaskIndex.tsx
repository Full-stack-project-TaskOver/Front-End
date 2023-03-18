import { Box, Text,Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useParams } from 'react-router-dom';
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
    id:string,
    title:string,
    assignById:string
    assignToId: string
    createdDate: string
    deadline: null
    description: string
    sessionId: string
    status:string
  }


  
  

function TaskIndex() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [sta, setSta] = React.useState<string[]>([]);

const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: { (value: React.SetStateAction<{ [x: string]: { name: string; items: { assignById: string; assignToId: string; createdDate: string; deadline: null; description: string; id: string; sessionId: string; status: string; title: string; }[]; color: string; }; }>): void; (arg0: any): void; }) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log("*************8");

console.log(columns);
console.log("*************9");

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 1, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items:destItems
      }
    });
    
    // console.log("----------"+sta+ 'hhhhhhhhhhhhhhhhhh');
    // console.log(destColumn);

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
    const [taskDetails, setTaskDetails] = React.useState<Task[]>([]);
    const [itemId, setItemId] = React.useState<string>(" ");
    const [itemStatus, setItemStatus] = React.useState<string>(" ");
    const [point, setPoint] = React.useState<number>();
  


    const [checkedItems, setCheckedItems] = useState([false, false])
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    const fetchTasks = async () => {
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
        
        setTasks(data.session[0].task as Task[])
      };

 
        const columnsFromBackend = {
          [uuidv4()]: { 
            name: "TODO",
            items: tasks,
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
              id: itemId,
              status: itemStatus
            })
          });
         
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
      
      // setSession(data.session)
    
    };


    // get point of user
    const getPoint = async () => {
      const request = await fetch(`http://localhost:3003/usersAndSession/point/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      if(data.message === 'Session dose not exists'){
        return data.message
      }
      
      setPoint(data.message[0].point)
    
    };

    // get details of task

    const getTaskByIs = async () => {
      const request = await fetch("http://localhost:3003/task/details", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({
          id: itemId,
        })
      });
      const data = await request.json();
      if(data.message === 'There is no task'){
        return data.message
      }
      
      setTaskDetails(Object.values(data)[0] as Task[])
      // console.log(data);
      
    };
    
    
  // console.log('----------$');
  // console.log(taskDetails);
  // console.log( itemId);
  // console.log('------------$');
  
    useEffect(() => {
      fetchTasks()
      fetchSession()
      fetchLoggedUser()
      sendLevel(level);
      getPoint()
      getTaskByIs()
    }, []);
    
    
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
      <Level userPoints={point} color={""} size={""} sendLevel={sendLevel} />
    </Box>
          }
{/* view task */}


<Modal onClose={onClose} isOpen={isOpen} size={'full'}>
                                  <ModalOverlay />

                                  <ModalContent position={'relative'} pt={6} mt={10} mr={10} mb={"8rem"} ml={10} rounded={8}>
                                
                                    <Box py={2} px={6} color={useColorModeValue("gray.500", "gray.400")}>
                                      <Text>Session Name</Text>
                                    </Box>
                                    {/* {taskDetails != undefined && taskDetails.map((task: any) => (    ))} */}
                                    <Heading p={6} as='h1' size='xl'>
                                      {taskDetails[0]?.title}
                                    </Heading>
 
                                    <Divider />

                                    <ModalCloseButton />
                                    <ModalBody px={6}>

                                      <Flex py={6} color={useColorModeValue("gray.500", "gray.400")}>
                                        <Flex flexDirection={'column'} pr={"4rem"} gap={4}>
                                          <Text>Status</Text>
                                          <Text>Assignee</Text>
                                          <Text>Due Date</Text>
                                          <Text>Lable</Text>
                                        </Flex>
                                        <Flex flexDirection={'column'} gap={4}>
                                          <Text>{taskDetails[0]?.status}</Text>
                                          <Text>Assignee</Text>
                                          <Text>{taskDetails[0]?.createdDate}</Text>
                                          <Text>Programming</Text>
                                        </Flex>
                                      </Flex>
                                      <Divider />
                                      <Heading pt={6} as='h2' size='lg'>Description</Heading>
                                      <Text py={5}>{taskDetails[0]?.description}</Text>
                                      <Divider />

                                      <Divider />

                                      <Accordion defaultIndex={[0]} allowMultiple py={5}>
                                        <AccordionItem border={'none'}>
                                     
                                            <Box as="span" flex='1' textAlign='left'>
                                              <Heading py={6} as='h2' size='lg'>Pomodoro</Heading>
                                            </Box>
                                          <Select placeholder='Select option'  onChange={(e)=> setItemStatus(e.target.value)}>
                                          <option value='TODO'>TODO</option>
                                          <option value='INPROGRESS'>INPROGRESS</option>
                                          <option value='COMPLETED'>COMPLETED</option>
                                          </Select>
                                        </AccordionItem>

                                      </Accordion>

                                    </ModalBody>

                                    <Divider />
                                    <ModalFooter justifyContent={'center'}>
                                      <Button colorScheme='green' onClick={()=> {updateTask(), onClose()}}>Submit</Button>
                                    </ModalFooter>
                                  </ModalContent>
                                </Modal>
{/* *********** */}
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
                        // console.log(item.id);
                        
                        if(column.name == item.status){

                          return (
                          <Draggable 
                          
                          key={item.id}
                          draggableId={item.id}
                            index={index}
                            >
                            {(provided, snapshot) => {
                              return (
                                <><Box
                                  onClick={() => {setItemId(item.id),setItemStatus(item.status) ,onOpen(), getTaskByIs()}}
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