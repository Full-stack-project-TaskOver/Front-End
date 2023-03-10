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
} from "@chakra-ui/react";
import React from "react";
import { MdFamilyRestroom, MdLeaderboard } from "react-icons/md";
function SessionCard() {
  return (
    <Card maxW="18em">
      <CardBody>
        <Stack spacing="2">
          <Icon
            as={MdFamilyRestroom}
            boxSize={"2.5em"}
            alignSelf="center"></Icon>
          <Heading size="sm">Rayan Family</Heading>
          <Text>Here we have all of our family tasks and goals</Text>
        </Stack>
      </CardBody>
      {/* <Divider /> */}
      <CardFooter padding={2} justifyContent="center">
        <ButtonGroup spacing="2">
          <Button variant="solid" color="black" backgroundColor={"eee"}>
            <Icon as={MdLeaderboard} />
          </Button>
          <Button
            variant="solid"
            color="black"
            fontSize={"0.8em"}
            backgroundColor={"eee"}>
            View
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default SessionCard;
