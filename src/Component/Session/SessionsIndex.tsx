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
import SessionCard, { AddSessionCard } from "./SessionCard";

// Sessions Container Component
function SessionsIndex() {
  return (
    <>
      <Heading as={"h1"} fontSize={{ md: "2rem" }} pb="1.5em">
        Sessions
      </Heading>
      <Flex w="full" flexDirection="column">
        {/* As Member Section */}
        <Flex flexDirection={"column"} w="full">
          <Heading
            as="h2"
            fontSize={{ md: "1.1rem" }}
            p="0.5em"
            color={useColorModeValue("gray.700", "gray.50")}>
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
