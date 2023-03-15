import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import Level from "./Components/CactusLevel";

interface points {
  userPoints: number;
}

export default function LandingIndex() {
  return (
    <Container maxW={"7xl"}>
      <Level userPoints={3} color="" />
    </Container>
  );
}
