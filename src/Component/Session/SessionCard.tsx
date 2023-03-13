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
} from "@chakra-ui/react";
import { MdLeaderboard } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { size } from "lodash";

// Add Session Component

interface sessionCard {
  imgPath: string;
  title: string;
  description: string;
}

// Session Card Component
function SessionCard(props: sessionCard) {
  return (
    <Card
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
      <CardBody pb={0.5}>
        <Stack spacing="2" color={useColorModeValue("gray.900", "gray.100")}>
          {/* <Icon as={MdFamilyRestroom} boxSize={"2em"} color="gray.900" /> */}
          <Image src={props.imgPath} boxSize={"2.5em"} />
          <Text
            as={"h3"}
            fontSize={{ base: "1rem", md: "1rem" }}
            fontWeight="600">
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
            color="black"
            fontSize={"0.8em"}
            backgroundColor={useColorModeValue("#FCF2DB", "#FCF2DB")}
            _hover={{
              backgroundColor: useColorModeValue("gray.100", "#90E1DE"),
            }}>
            {/* Trophy icon GiLaurelsTrophy */}
            {/* Leaderboard Icon */}
            <Icon as={MdLeaderboard} color="black" boxSize="1.3em" />
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
