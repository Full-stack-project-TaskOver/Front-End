import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Image,
  Text,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import card1 from "../../../assets/card1.png";
import card2 from "../../../assets/card2.png";
import card3 from "../../../assets/card3.png";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
  badge: string;
}

const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
  hidden: { opacity: 0, scale: 0 },
};

const Card = ({ heading, description, icon, href, badge }: CardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className="square">
      <Box
        maxW={{ base: "full", md: "275px" }}
        w={"full"}
        height={"full"}
        position={"relative"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}>
        <Badge position={"absolute"} right={5}>
          {badge}
        </Badge>
        <Stack align={"start"} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={"center"}
            justify={"center"}
            color={"white"}
            rounded={"full"}
            bg={useColorModeValue("gray.100", "gray.700")}>
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={"sm"}>
              {description}
            </Text>
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default function Feature1() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <>
    <Box mb={20}>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
        className="square">
        <Stack 
          spacing={4}
          as={Container}
          maxW={"3xl"}
          textAlign={"center"}
          position={"relative"}>
          <Heading fontSize={{ base: "2xl", sm: "5xl" }} fontWeight={"bold"}>
            Why TaskOver?
          </Heading>
          <Text 
            color={"gray.600"}
            fontSize={{ base: "sm", sm: "xl" }}
            textAlign={"justify"}>
            We understand that managing tasks can be a daunting and monotonous
            process, but with our platform, you can turn it into a fun and
            rewarding experience. With our gamified task manager, you can easily
            create tasks, set deadlines, assign them to team members, and track
            progress - all while earning rewards and leveling up.
          </Text>
        </Stack>
      </motion.div>
      </Box>
      <Box p={"2em"}>
      <Container maxW={"5xl"} my={12} mt={100} gap={1000}>
        <Flex flexWrap="wrap" gridGap={6} justify="center" >
          <Card
            heading={"Gamified Tasks"}
            icon={<Image src={card1} w={10} h={10} />}
            description={
              "You can earn points for completing tasks, and as you accumulate more points, you'll unlock new levels and rewards."
            }
            href={"#"}
            badge={""}
          />
          <Card
            heading={"Company"}
            icon={<Image src={card3} w={10} h={10} />}
            description={
              "it can increase employee engagement by making work more fun and enjoyable. This can lead to higher motivation levels and increased productivity."
            }
            href={"#"}
            badge={""}
          />

          <Card
            heading={"Family"}
            icon={<Image src={card2} w={10} h={10} />}
            description={
              "Families can create a list of tasks and assign them to each member, giving them specific goals to accomplish throughout the week. Including special tasks screens for childrean"
            }
            href={"#"}
            badge={"Coming Soon"}
          />
        </Flex>
      </Container>
    </Box>
    </>
  );
}
