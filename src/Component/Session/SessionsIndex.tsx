import { Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import SessionCard from "./SessionCard";

function SessionsIndex() {
  return (
    <>
      <Heading
        as={"h1"}
        fontSize={{ md: "2rem" }}
        border="1px black solid"
        pb="1.5em">
        Sessions
      </Heading>
      <Flex w="80%" border="1px black solid" flexDirection="column">
        <Flex border="1px black solid" flexDirection="column">
          <Heading as="h2" fontSize={{ md: "1.3rem" }} pb="0.5em">
            As Member
          </Heading>
          <Flex border="1px black solid" wrap="wrap" flexDirection="row">
            <SessionCard />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default SessionsIndex;
