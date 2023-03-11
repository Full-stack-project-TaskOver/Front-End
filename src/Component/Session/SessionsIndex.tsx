import {
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/Ai";
import SessionCard from "./SessionCard";

function AddSessionCard() {
  return (
    <Card
      as={"button"}
      maxW="18em"
      backgroundColor={useColorModeValue("none", "white")}
      shadow="sm"
      borderRadius={15}
      border="2px dashed gray"
      cursor="pointer"
      transition={"200ms"}
      justifyContent="center"
      _hover={{
        backgroundColor: useColorModeValue("gray.100", "white"),
      }}>
      <Icon
        as={AiOutlinePlus}
        boxSize={"3em"}
        alignSelf="center"
        color={"gray"}
      />
    </Card>
  );
}

function SessionsIndex() {
  return (
    <>
      <Heading as={"h1"} fontSize={{ md: "2rem" }} pb="1.5em">
        Sessions
      </Heading>
      <Flex w="full" flexDirection="column">
        {/* As Member Section */}
        <Flex flexDirection={"column"} w="full">
          <Heading as="h2" fontSize={{ md: "1.1rem" }} p="0.5em">
            As Member
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            rowGap={3}
            columnGap={3}
            w="full">
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <AddSessionCard />
          </SimpleGrid>
        </Flex>
        <Divider padding={2} />
        {/* As Admin Section */}
        <Flex flexDirection={"column"} w="full">
          <Heading as="h2" fontSize={{ md: "1.1rem" }} p="0.5em">
            As Admin
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            rowGap={3}
            columnGap={3}
            w="full">
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <AddSessionCard />
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

export default SessionsIndex;
