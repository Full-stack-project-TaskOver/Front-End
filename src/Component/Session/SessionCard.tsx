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
} from "@chakra-ui/react";
import { MdLeaderboard } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";


// Add Session Component

interface sessionCard {
  id:string
  imgPath: string;
  title: string;
  description: string;
  creatorId:string;
}

// Session Card Component
function SessionCard(props: sessionCard) {
  const navigate = useNavigate();

  const deleteSessions = async () => {
    
    const request = await fetch(`http://localhost:3003/session/${props.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json", 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // console.log(request);
    // console.log(await request.json());
  };

  
  return (
    <Card
      position={'relative'}
      w="80%" 
      h="12rem"
      minW={"14rem"}
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      shadow="sm"
      borderRadius={15}
      cursor="pointer"
      transition={"200ms"}
      _hover={{
        backgroundColor: useColorModeValue("#7BD0FF", "#0396E9"),
      }}>
         <Menu >
              <MenuButton
                position={'absolute'}
                _hover={{
                  backgroundColor: 'transparent',
                }}
                top={'2'}
                right={'2'}
                as={IconButton}
                bg="none"
                icon={<FiMoreVertical />}
                w="0.5rem"
              />
              <MenuList minW={{ base: "4rem", md: "8rem" }}>
                <MenuItem color={"red"} onClick={deleteSessions}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>  
      <CardBody pb={0.5} onClick={() => navigate(`/${props.id}`)}>
        <Stack spacing="2" color={useColorModeValue("gray.900", "gray.100")}>
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
        <ButtonGroup spacing="2" w="full" justifyContent="space-between">
          <Button
            py={0.5}
            h="2.5em"
            variant="ghost"
            color="#1a202c"
            fontSize={"0.8em"}
            backgroundColor={useColorModeValue("#FCF2DB", "#FCF2DB")}
            _hover={{
              backgroundColor: useColorModeValue("gray.100", "#90E1DE"),
            }}>
            {/* Trophy icon GiLaurelsTrophy */}
            {/* Leaderboard Icon */}
            <Icon as={MdLeaderboard} onClick={()=> navigate(`/leaderboard/${props.id}`)} color="black" boxSize="1.3em" />
          </Button>
          <Button
            py={0.5}
            h={"2.5em"}
            variant={"ghost"}
            fontSize={"0.8em"}
            _hover={{
              backgroundColor: useColorModeValue("gray.100", "#90E1DE"),
            }}>
            View
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default SessionCard;
