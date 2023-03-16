import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { ColumnType } from '../../utils/enums';
import AddUser from './AddUser';
import Cactus from './Cactus';
import Level from "../LandingPage/Components/CactusLevel";

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

const itemsFromBackend = [
  { id: uuidv4(), title: "First task",},
  { id: uuidv4(), title: "Second task" },
  { id: uuidv4(), title: "Third task" },
  { id: uuidv4(), title: "Fourth task" },
  { id: uuidv4(), title: "Fifth task" },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Todo",
    items: itemsFromBackend,
    color:"orange"
  },
  [uuidv4()]: {
    name: "In Progress",
    items: [],
    color:"blue"
  },
  [uuidv4()]: {
    name: "Completed",
    items: [],
    color:"green"
  }
};

const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: { (value: React.SetStateAction<{ [x: string]: { name: string; items: { id: string; title: string; }[]; color: string; }; }>): void; (arg0: any): void; }) => {
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

const ColumnColorScheme: Record<ColumnType, string> = {
    Todo: 'orange',
    'In Progress': 'blue',
    Completed: 'green',
  };
  

function TaskIndex() {

    let { id } = useParams();
    const [session, setSession] = React.useState<Session>();
    const [loggedUser, setloggedUser] = React.useState<User>();
    const [level, setLevel] = React.useState<number>(0);

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
      // console.log(data.session);
      
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
      fetchSession()
      fetchLoggedUser()
      sendLevel(level);
    }, []);

    
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
        {/* <TaskPage/> */}
        <AddUser/>
    </> : ''}
    </Flex>
    

    </Flex>

    <Flex justifyContent={'center'}>
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
                      {column.items.map((item, index) => {
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