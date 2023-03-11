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
import { MdFamilyRestroom, MdLeaderboard } from "react-icons/md";
function SessionCard() {
  return (
    <Card
      maxW="18em"
      backgroundColor={useColorModeValue("#FFDDD2", "white")}
      shadow="sm"
      borderRadius={15}
      cursor="pointer"
      transition={"200ms"}
      _hover={{
        backgroundColor: useColorModeValue("#90E1DE", "white"),
      }}>
      <CardBody pb={0.5}>
        <Stack spacing="2">
          <Icon as={MdFamilyRestroom} boxSize={"2em"} color="gray.700"></Icon>
          <Text
            as={"h3"}
            fontSize={{ base: "1rem", md: "1rem" }}
            fontWeight="600">
            Rayan Family
          </Text>
          <Text fontSize={{ base: "0.7rem", md: "0.8rem" }}>
            Here we have all of our family tasks and goals
          </Text>
        </Stack>
      </CardBody>
      <CardFooter py={1.5} justifyContent="end">
        <ButtonGroup spacing="2">
          <Button
            py={0.5}
            h="2.5em"
            variant="solid"
            color="black"
            fontSize={"0.8em"}
            backgroundColor={useColorModeValue("#FCF2DB", "white")}>
            {/* Leaderboard Icon */}
            <Icon
              as={MdLeaderboard}
              color={useColorModeValue("black", "white")}
              boxSize="1.3em"
            />
          </Button>
          <Button
            py={0.5}
            h="2.5em"
            variant="solid"
            color="black"
            fontSize={"0.8em"}
            backgroundColor={useColorModeValue("#FCF2DB", "white")}>
            View
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default SessionCard;
