import {
  Button,
  Divider,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import SessionCard from "./SessionCard";
import family from "../../assets/family.png";
import SessionOverlay from "./SessionOverlay";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Level from "../LandingPage/Components/CactusLevel";

function SessionsIndex() {
  const toast = useToast();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/sign-in");
  }

  const [adminSession, setAdminSession] = React.useState<string[]>([]);
  const [userSession, setuserSession] = React.useState<string[]>([]);


const fetchAdminSessions = async () => {

    const request = await fetch("http://localhost:3003/session/AsAdmin", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if(data.message == 'you dont have any sessions'){
      return data.message
    }
  
    setAdminSession(Object.values(data)[0] as string[]) 
    if(adminSession ){
      setTimeout(()=>{
        fetchAdminSessions()
        fetchUserSessions()
      },1000)
     

    if (data.message == "you dont have any sessions") {
      return data.message;

    }

    setAdminSession(Object.values(data)[0] as string[]);
    if (adminSession) {
      setTimeout(() => {
        fetchAdminSessions();
      }, 1000);
    }
  };

  const fetchUserSessions = async () => {
    const request = await fetch("http://localhost:3003/session/AsUser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });




    const data = await request.json();


    if (data.message == "you dont have any sessions") {
      return data.message;
    }
    console.log(Object.values(data)[0]);
    setuserSession(Object.values(data)[0] as string[]);
  };

  useEffect(() => {
    fetchAdminSessions();
    fetchUserSessions();
  }, []);

  // Sessions Container Component

  return (
    <>
      <Heading
        as={"h1"}
        fontSize="2rem"
        py="1rem"
        color={useColorModeValue("gray.700", "#1a202c")}>
        Sessions
      </Heading>
      <Flex flexDirection={"column"} w="full" pt="1rem" pb="1.5rem" gap={"2em"}>
        {/* As Member Section */}
        <Heading
          as="h2"
          fontSize="1.1rem"
          color={useColorModeValue("gray.700", "#1a202c")}
          alignSelf="start">
          As Member
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
          gap={5}
          w="full"
          justifyItems={"center"}>
          {userSession != undefined &&
            userSession.map((e: any) => (
              <SessionCard
                key={e.id}
                id={e.id}
                imgPath={family}
                title={e.title}
                description={e.description}
                creatorId={e.creatorId}
              />
            ))}

          <SessionOverlay title="Join Session" method="join" />
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
            {adminSession != undefined &&
              adminSession.map((e: any) => (
                <SessionCard
                  key={e.id}
                  id={e.id}
                  imgPath={family}
                  title={e.title}
                  description={e.description}
                  creatorId={e.creatorId}
                />
              ))}
            <SessionOverlay title="Add Session" method="add" />
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
}
export default SessionsIndex;
