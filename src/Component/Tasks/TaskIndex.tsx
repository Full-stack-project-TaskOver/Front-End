import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Spacer,
  useColorModeValue,
  useDisclosure,
  Checkbox,
  Stack,
  AccordionButton,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType } from "../../utils/enums";
import { AddIcon } from "@chakra-ui/icons";
import useColumnTasks from "../../hooks/useColumnTask";
import { useEffect, useRef, useState } from "react";
import TaskPage from "./TaskPage";
import AddUser from "./AddUser";
import "./Cactus.css";
import Cactus from "./Cactus";

import { FiMoreVertical } from "react-icons/fi";

import { useParams } from "react-router-dom";
import React from "react";
import Level from "../LandingPage/Components/CactusLevel";
// import { Standard } from "@typebot.io/react";
// <Standard style={{ width: "100%", height: "600px" }} typebot={'taskover-vtisosw'} />

interface Session {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
}

function App() {
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
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.message === "Session dose not exists") {
      return data.message;
    }

    setSession(data.session);
  };

  const fetchLoggedUser = async () => {
    const request = await fetch(`http://localhost:3003/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.message === "user not found") {
      return "You are not authorized , please log in";
    }
    setloggedUser(data.user);

    // setSession(data.session)
  };

  useEffect(() => {
    fetchSession();
    fetchLoggedUser();
    sendLevel(level);
  }, []);

  // userSelect={'none'}
  return (
    <>
      <Container maxWidth="container.xl" py={10}>
        <Flex justifyContent={"space-between"} flexWrap={"wrap"}>
          <Flex flexDirection={"column"} pb={10}>
            <Heading as="h1" size={{ base: "lg", sm: "xl" }}>
              {session?.title}
            </Heading>
            {session?.creatorId == loggedUser?.id ? (
              <Text
                display={"inline"}
                color={"gray.400"}
                fontSize={{ base: "xs", sm: "sm" }}>
                {session?.id}
              </Text>
            ) : (
              ""
            )}
          </Flex>
          <Flex justifyContent={"end"} gap={2}>
            {session?.creatorId == loggedUser?.id ? (
              <>
                <TaskPage />
                <AddUser />
              </>
            ) : (
              ""
            )}
          </Flex>
        </Flex>

        <Flex justifyContent={"center"}>
          <Cactus userLevel={level} />
        </Flex>

        {session?.creatorId == loggedUser?.id ? (
          ""
        ) : (
          <Box>
            <Flex gap={4} wrap={"wrap"} justifyContent="space-between">
              <Flex gap={4}>
                {/* <Button rounded={8} p='4'                 
                bgColor={useColorModeValue("white", "gray.900")}
                _hover={{bgColor: useColorModeValue("#f8f8f8", "gray.600")}}
                border={'2px solid'}
                borderColor={useColorModeValue("#f0f0f0", "#242a38")}
                >
            All Tasks
        </Button>
        <Button rounded={8} p='4'                 
                bgColor={useColorModeValue("white", "gray.900")}
                _hover={{bgColor: useColorModeValue("#f8f8f8", "gray.600")}}
                border={'2px solid'}
                borderColor={useColorModeValue("#f0f0f0", "#242a38")}
                >
            For Me
        </Button> */}
              </Flex>
              <Flex
                rounded={8}
                p="4"
                height="10"
                alignItems={"center"}
                fontWeight={"medium"}
                bgColor={useColorModeValue("white", "gray.900")}
                border={"2px solid"}
                borderColor={useColorModeValue("#f0f0f0", "#242a38")}>
                🔥 Streak
              </Flex>
            </Flex>
            <Level userPoints={3000} color={""} size={""} sendLevel={sendLevel} />
          </Box>
        )}

        <DndProvider backend={HTML5Backend}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 16, md: 4 }}
            mt={4}>
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </DndProvider>
      </Container>
    </>
  );
}

export default App;
