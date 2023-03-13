import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import SessionCard from "./SessionCard";
import family from "../../assets/family.png";
import SessionOverlay from "./SessionOverlay";
import React, { useEffect } from "react";



function SessionsIndex() {

  const [session, setSession] = React.useState<string[]>([]);

const fetchSessions = async () => {
  const request = await fetch("http://localhost:3003/session", {
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const data = await request.json();
  setSession(Object.values(data)[0] as string[])

};
useEffect(() => {
  fetchSessions()
}, []);






// Sessions Container Component   http://localhost:3003/session

  return (
    <>
      <Heading
        as={"h1"}
        fontSize="2rem"
        py="1rem"
        color={useColorModeValue("gray.700", "gray.100")}>
        Sessions
      </Heading>
      <Flex flexDirection={"column"} w="full" pt="1rem" pb="1.5rem" gap={"2em"}>
        {/* As Member Section */}
        <Heading
          as="h2"
          fontSize="1.1rem"
          color={useColorModeValue("gray.700", "gray.100")}
          alignSelf="start">
          As Member
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
          gap={5}
          w="full"
          justifyItems={"center"}>

               {session != undefined && session.map((e: any) => (   
                 
                        <SessionCard
                        id={e.id}
                        imgPath={family}
                        title={e.title}
                        description={e.description}
                      />
                     
              ))}


          <SessionOverlay />
        </SimpleGrid>
        <Divider />
        {/* As Admin Section */}
        <Flex flexDirection={"column"} w="full" pb="1.5rem" gap={"2em"}>
          <Heading as="h2" fontSize={{ md: "1.1rem" }}>
            As Admin
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            gap={5}
            w="full"
            justifyItems={"center"}>
            <SessionOverlay />
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

export default SessionsIndex;
