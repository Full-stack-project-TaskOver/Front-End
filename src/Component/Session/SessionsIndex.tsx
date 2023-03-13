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

// Sessions Container Component
function SessionsIndex() {
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
          <SessionCard
            imgPath={family}
            title={"Javascript Bootcamp"}
            description="Bootcamp for 'حديثي التخرج' and abdullah"
          />
          <SessionCard
            imgPath={family}
            title={"Javascript Bootcamp 2"}
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi autem maxime totam et labore. Voluptatibus, placeat soluta? Nulla ratione itaque voluptatum asperiores earum, ut rem quam est illo voluptas illum."
          />
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
