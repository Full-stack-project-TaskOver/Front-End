import {
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Card,
  Icon,
  Text,
  HStack,
  Box,
  useRadio,
  useRadioGroup,
  Input,
  VStack,
  Textarea,
  SimpleGrid,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { IoIosAdd } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";

const tabItems = [
  { name: "Company" },
  { name: "Family" },
  { name: "Freelancers" },
  { name: "Personal" },
];

interface sessionType {
  type: string;
  imgPath: string;
  title: string;
  description: string;
}

let session: sessionType = {
  type: "",
  imgPath: "",
  title: "",
  description: "",
};

interface Session {
  title: string;
  method: string;
}

// Radio Button
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();

  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />

      <Box
        {...checkbox}
        className="radio"
        cursor="pointer"
        borderRadius="md"
        fontSize={{ base: "0.9rem", md: "1.1rem" }}
        backgroundColor={useColorModeValue("#fdfdfd", "gray.800")}
        transition={"200ms"}
        textAlign="center"
        outline="3px solid"
        outlineColor={useColorModeValue("#f0f0f0", "gray.600")}
        _checked={{
          color: useColorModeValue("black", "white"),
          backgroundColor: useColorModeValue("#f8f8f8", "#222a3a"),
          outlineColor: useColorModeValue("#d3d3d1", "gray.500"),
        }}
        px={{ base: 4, md: 5 }}
        py={{ base: 3, md: 4 }}>
        {props.children}
      </Box>
    </Box>
  );
}

function SessionOverlay(props: Session) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sessionId, setSessionId] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>();
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchLoggedUser = async () => {
    if (localStorage.getItem("token") == "") return;
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
    setUserId(data.user.id);
  };

  const joinSession = async () => {
    const request = await fetch(
      "http://localhost:3003/usersAndSession/join-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId,
          sessionId,
        }),
      }
    );
    const data = await request.json();
    if (request.status !== 200) {
      toast({
        title: data.message,
        status: "error",
        duration: 3000,
        position: "top",
      });
      return;
    }
    toast({
      title: "Join Session successfully!",
      status: "success",
      duration: 3000,
      position: "top",
    });
    onClose();
    console.log(await request.json());
  };

  // console.log(userId);
  // console.log(sessionId);

  useEffect(() => {
    fetchLoggedUser();
  }, []);


  // console.log(setDescription);

  // To handle the radio button value.
  const handleChange = (value: string) => {
    session.type = value;
    session.imgPath = (value + ".png").toLowerCase();
    // console.log(session.type);
    // console.log(session.imgPath);
  };

  // To read the radio buttons value in every change.
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name: "Session",
    defaultValue: "Company",
    onChange: handleChange,
  });

  const group = getRootProps();

  // const postSession = () => {
  //   session.title = name
  //   session.description = description
  //   console.log(session);
  // };

  const addSession = async () => {
    const request = await fetch("http://localhost:3003/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        type: value,
      }),
    });

    if (request.status !== 200) {
      toast({
        title: "Name is required",
        status: "error",
        duration: 3000,
        position: "top",
      });
      return;
    }
    toast({
      title: "Session added successfully!",
      status: "success",
      duration: 3000,
      position: "top",
    });
    onClose();

    console.log(await request.json());
  };

  return (
    <>
      <Card
        as={"button"}
        w="80%"
        h="13rem"
        minW={"14rem"}
        backgroundColor={useColorModeValue("white", "gray.900")}
        shadow="sm"
        borderRadius={15}
        border={"3px dashed "}
        borderColor={useColorModeValue("#eae7e4", "#242a38")}
        cursor="pointer"
        transition={"200ms"}
        justifyContent="center"
        alignItems={"center"}
        onClick={onOpen}
        _hover={{
          backgroundColor: useColorModeValue("white", "gray.800"),
          borderColor: useColorModeValue("gray.400", "gray.500"),
        }}>
        <Text color={useColorModeValue("gray.600", "gray.500")}>
          {props.title}
        </Text>

        <Icon
          as={IoIosAdd}
          boxSize={"3em"}
          alignSelf={"center"}
          color={"gray.500"}
          transition={"200ms"}
          _hover={{
            color: useColorModeValue("gray.800", "gray.100"),
          }}
        />
      </Card>
      {props.method === "join" ? (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter sessionID to join session</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Session ID</FormLabel>
                <Input
                  required
                  ref={initialRef}
                  placeholder="Enter session id"
                  onChange={(e) => setSessionId(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={joinSession}
                backgroundColor={"#FFA476"}
                color="#fff"
                _hover={{
                  backgroundColor: "#FFB189",
                }}
                mr={3}>
                Join
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}

      {props.method === "add" ? (
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          size={{ base: "xs", md: "3xl" }}
          motionPreset="scale">
          <ModalOverlay />

          <ModalContent>
            <Text px={6} pt={3} color="gray.400">
              {/* Sessions /{" "} */}
              <Text as="span" color={useColorModeValue("gray.800", "gray.100")}>
                {" "}
                {/* Create Session{" "} */}
              </Text>
            </Text>

            <ModalHeader px={6} pt={9} color={"gray.700"}>
              <Text color={useColorModeValue("gray.800", "gray.100")}>
                Create New Session 
                <Text
                  as={"span"}
                  color={useColorModeValue("black", "gray.100")}>
                  {session.type}
                </Text>
              </Text>
            </ModalHeader>

            <ModalCloseButton />

            <ModalBody pt={1} justifyItems="center">
              {/* Radio Cards Here */}
              <SimpleGrid
                {...group}
                justifyContent="center"
                gap={5}
                columns={{ base: 2, md: 4 }}>
                
              </SimpleGrid>
              <VStack spacing={3} p={6}>
                <Text alignSelf={"start"}>
                  Title
                  <Text as={"span"} color={"red.600"}>
                    *
                  </Text>
                </Text>
                <Input
                  variant="outline"
                  placeholder="Enter Title Here"
                  required={true}
                  onChange={(e) => setTitle(e.target.value)}
                  border="3px solid"
                  borderColor={useColorModeValue("#f0f0f0", "gray.600")}
                  backgroundColor={useColorModeValue("#fdfdfd", "gray.800")}
                />

                <Text alignSelf={"start"}>Description</Text>
                <Textarea
                  variant="outline"
                  placeholder="Enter Your Description Here"
                  size={"sm"}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  borderRadius={"0.375rem 0.375rem 0 0.375rem"}
                  border="3px solid"
                  borderColor={useColorModeValue("#f0f0f0", "gray.600")}
                  backgroundColor={useColorModeValue("#fdfdfd", "gray.800")}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}

              <Button
                size={"lg"}
                backgroundColor={"#FFA476"}
                color="#fff"
                _hover={{
                  backgroundColor: "#FFB189",
                }}
                onClick={addSession}>
                Create Session
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default SessionOverlay;
