import React, { useEffect, useState } from "react";
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
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Select,
  HStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ColumnType } from "../../utils/enums";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function AddUser() {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  let { id } = useParams();
  const sessionId = id;
  const [userId, setUserId] = React.useState("");

  const addUser = async () => {
    const request = await fetch("http://localhost:3003/usersAndSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId,
        sessionId,
      }),
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
      title: "User added successfully!",
      status: "success",
      duration: 3000,
      position: "top",
    });
    onClose();
    console.log(await request.json());
    console.log(request.status);
  };

  // console.log(userId);
  // console.log(sessionId);

  // useEffect(() => {
  //   fetchUsers()
  // }, []);

  return (
    <>
      {/* <Button                  onClick={onOpen}

                size="sm"
                color={useColorModeValue("white", "white")}
                bgColor={useColorModeValue('#2bcb7d', '#2bcb7d')}
                border={'2px solid'}
                borderColor={useColorModeValue("#19A963", "#0d7040")}
                _hover={{
                    bgColor: useColorModeValue("#2eb573", "#2eb573"),
                }
                }
                rounded={8} p='4'                 
                variant="solid"
                // colorScheme="black"
                aria-label="add-task"
              
        >

            <Icon as={AddIcon} mr={2} /> Add User

        </Button> */}
      <motion.button
        style={{
          height: "2.5rem",
          width: "8rem",
          textAlign: "center",
          alignContent: "center",
          // marginTop: "1rem",
          // fontSize: "1.2rem",
          borderColor: "#F0F0F0",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          // fontWeight: "500",
          borderRadius: "5px",
          background: "#F0F0F0",
        }}
        initial={{
          color: "#3B3B3B",
        }}
        whileHover={{
          background: "#FFB189",
          scale: 1.02,
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          border: "1px solid #eee",
          color: "#fff",
        }}
        whileTap={{
          scale: 1,
        }}
        transition={{
          duration: 0.15,
        }}
        onClick={onOpen}>
        <Icon as={AddIcon} mr={2} /> Add User
      </motion.button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add user to session</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter user id"
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={addUser}
              backgroundColor={"#FFA476"}
              color="#fff"
              _hover={{
                backgroundColor: "#FFB189",
              }}
              mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUser;
