import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Icon,
  useColorModeValue,
  useDisclosure,
  Flex,
  IconButton,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Img,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { MdLeaderboard } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

import trophy from "../../assets/trophy.png";

// Add Session Component

interface sessionCard {
  id: string;
  imgPath: string;
  title: string;
  description: string;
  creatorId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
}

// Session Card Component
function SessionCard(props: sessionCard) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const navigate = useNavigate();
  const [loggedUser, setloggedUser] = React.useState<User>();
  const toast = useToast();

  const deleteSessions = async () => {
    const request = await fetch(`http://localhost:3003/session/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
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
      title: "Session deleted successfully!",
      status: "success",
      duration: 3000,
      position: "top",
    });
  };

  const leaveSession = async () => {
    const request = await fetch(
      `http://localhost:3003/session/leave/${props.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
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
      title: "left Session successfully!",
      status: "success",
      duration: 3000,
      position: "top",
    });
  };

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
    setloggedUser(data.user);
  };

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  const openModal = () => {
    return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete {props.title} Session
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>

          <ModalFooter>
            <Button onClick={deleteSessions} colorScheme="red" mr={3}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Card
      position={"relative"}
      w="80%"
      h="13rem"
      minW={"14rem"}
      backgroundColor={useColorModeValue("white", "gray.900")}
      border="3px solid"
      borderColor={useColorModeValue("#f0f0f0", "#242a38")}
      shadow="sm"
      borderRadius={8}
      cursor="pointer"
      transition={"200ms"}
      _hover={{
        transform: "scale(1.015)",
      }}>
      {props.creatorId != loggedUser?.id ? (
        <Menu>
          <MenuButton
            position={"absolute"}
            _hover={{
              backgroundColor: useColorModeValue("#f8f8f8", "gray.800"),
            }}
            top={"2"}
            right={"2"}
            as={IconButton}
            bg="none"
            icon={<FiMoreVertical />}
            w="0.5rem"
          />
          <MenuList minW={{ base: "4rem", md: "8rem" }}>
            <MenuItem color={"red"} onClick={leaveSession}>
              Leave
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton
            position={"absolute"}
            top={"2"}
            right={"2"}
            rounded={8}
            bgColor={useColorModeValue("white", "gray.900")}
            color={useColorModeValue("gray.600", "gray.400")}
            _hover={{ bgColor: useColorModeValue("#f4f4f4", "gray.600") }}
            _active={{ bg: useColorModeValue("#f2f2f2", "gray.600") }}
            as={IconButton}
            bg="none"
            icon={<FiMoreVertical />}
            w="0.5rem"
          />
          <MenuList minW={{ base: "4rem", md: "8rem" }}>
            {openModal()}
            <MenuItem
              color={"red"}
              onClick={onOpen}
              fontWeight="medium"
              bgColor={useColorModeValue("white", "gray.900")}
              _hover={{ bgColor: useColorModeValue("#f2f2f2", "gray.600") }}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <CardBody pb={0.5} onClick={() => navigate(`/${props.id}`)}>
        <Stack spacing="2">
          {/* <Icon as={MdFamilyRestroom} boxSize={"2em"} color="gray.900" /> */}
          <Flex w="full" justifyContent="space-between">
            <Image src={props.imgPath} boxSize={"2.5em"} />
          </Flex>
          <Text as={"h3"} fontSize="1rem" fontWeight="600">
            {props.title}
          </Text>
          <Text
            className={"sessionDesc"}
            fontSize={{ base: "0.7rem", md: "0.8rem" }}>
            {props.description}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter py={3}>
        <Button
          // position={'absolute'}
          // top={'50%'} left={'50%'}
          // transform={'translate(-50%,-20%)'}
          onClick={() => navigate(`/leaderboard/${props.id}`)}
          color="#1a202c"
          fontSize={"0.8em"}
          backgroundColor={useColorModeValue("white", "gray.800")}
          border="1.5px solid"
          borderColor={useColorModeValue("#f0f0f0", "#242a38")}
          _hover={{
            backgroundColor: useColorModeValue("#f8f8f8", "gray.700"),
          }}>
          <Img py={".3rem"} height="100%" width="100%" src={trophy} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SessionCard;
