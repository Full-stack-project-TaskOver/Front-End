import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Icon,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/Ai";
import { MdFamilyRestroom, MdLeaderboard } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

// Add Session Component
export function AddSessionCard() {
  return (
    <Card
      as={"button"}
      maxW="18em"
      backgroundColor={useColorModeValue("white", "gray.900")}
      shadow="sm"
      borderRadius={15}
      border="2px dashed"
      borderColor={"gray.600"}
      cursor="pointer"
      transition={"200ms"}
      justifyContent="center"
      alignItems={"center"}
      _hover={{
        backgroundColor: useColorModeValue("gray.100", "gray.800"),
        borderColor: useColorModeValue("gray.800", "gray.100"),
      }}>
      <Text color={useColorModeValue("gray.600", "gray.400")}>Add Session</Text>
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
  );
}

interface sessionCard {
  icon: IconType;
  title: string;
  description: string;
}

// Session Card Component
function SessionCard() {
  return (
    <Card
      maxW="18em"
      backgroundColor={useColorModeValue("#AEE2FF", "#0076B8")}
      shadow="sm"
      borderRadius={15}
      cursor="pointer"
      transition={"200ms"}
      _hover={{
        backgroundColor: useColorModeValue("#7BD0FF", "#AEE2FF"),
      }}>
      <CardBody pb={0.5}>
        <Stack spacing="2" color={useColorModeValue("gray.900", "gray.100")}>
          <Icon as={MdFamilyRestroom} boxSize={"2em"} color="gray.900" />
          <Text
            as={"h3"}
            fontSize={{ base: "1rem", md: "1rem" }}
            fontWeight="600">
            Header
          </Text>
          <Text fontSize={{ base: "0.7rem", md: "0.8rem" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            expedita iste.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter py={1.5} justifyContent="end">
        <ButtonGroup spacing="2">
          <Button
            py={0.5}
            h="2.5em"
            variant="ghost"
            color="black"
            fontSize={"0.8em"}
            backgroundColor={useColorModeValue("#FCF2DB", "#FCF2DB")}
            _hover={{
              backgroundColor: useColorModeValue("gray.100", "#90E1DE"),
            }}>
            {/* Leaderboard Icon */}
            <Icon as={MdLeaderboard} color="black" boxSize="1.3em" />
          </Button>
          <Button
            py={0.5}
            h={"2.5em"}
            variant={"ghost"}
            fontSize={"0.8em"}
            // backgroundColor={useColorModeValue("#FCF2DB", "#FCF2DB")}
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
