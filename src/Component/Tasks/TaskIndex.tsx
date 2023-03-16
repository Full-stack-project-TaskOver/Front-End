import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react'
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

const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: { (value: React.SetStateAction<{ [x: string]: { name: string; items: { assignById: string; assignToId: string; createdDate: string; deadline: null; description: string; id: string; sessionId: string; status: string; title: string; }[]; color: string; }; }>): void; (arg0: any): void; }) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
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


  
  

function TaskIndex() {

    let { id } = useParams();
    const [session, setSession] = React.useState<Session>();
    const [loggedUser, setloggedUser] = React.useState<User>();
    const [level, setLevel] = React.useState<number>(0);
    const [tasks, setTasks] = React.useState<Task[]>([]);

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

        console.log(data.session[0].task);
        
        setTasks(data.session[0].task as Task[])
      };
      console.log(tasks);


      
   
      let itemsFromBackend = 
//        [
//  {       assignById: "973d1460-7782-4574-8b20-8ca4fc8fe1c3",
//         assignToId: "c3df55bf-5fb4-49f6-a6ea-bb5f5e264d66",
//         createdDate: "2023-03-16T17:39:54.155Z",
//         deadline: null,
//         description: "A",
//         id: "8e5ecaad-de8f-4309-b1da-7fc5fb013b6c",
//         sessionId: "7e933d65-3995-4b68-b215-8bf95da1a824",
//         status: "TODO",
//         title: "A",
//       }
//       ];
  
        // console.log(itemsFromBackend);
        console.log(tasks);
        
 
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
      console.log(data);
      
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
  
    useEffect(() => {
      fetchTasks()
      fetchSession()
      fetchLoggedUser()
      sendLevel(level);
    }, []);

    
    // const [columns, setColumns] = useState(columnsFromBackend);
    // console.log(columns);
    // console.log(Object.entries(columns));

    

    const [columns, setColumns] = useState(columnsFromBackend);
    
    
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
                        if(column.name == item.status){

                          return (
                          <Draggable
                          key={item.id}
                          draggableId={item.id}
                            index={index}
                            >
                            {(provided, snapshot) => {
                              return (
                                  <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    rotate:snapshot.isDragging ? "2deg": "0deg",
                                    backgroundColor: snapshot.isDragging
                                      ? "#f8f8f8"
                                      : "white",
                                      ...provided.draggableProps.style
                                  }}
                                  rotate={snapshot.isDragging ? "30deg": "0deg"}
                                  display={'flex'}
                                  flexDirection='column'
                                //   onClick={onOpen}
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
                                    <Spacer/>
                                    <Progress colorScheme='green' height='7px' value={30} rounded={18} mb={2}/>
        
                                        </Box>
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