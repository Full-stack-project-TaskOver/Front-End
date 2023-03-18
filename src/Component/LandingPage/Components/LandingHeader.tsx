import React from "react";
import { Flex, Heading, Hide, Image, Show, Text } from "@chakra-ui/react";
import task1 from "../../../assets/LandingPageTask1.svg";
import task2 from "../../../assets/LandingPageTask2.svg";
import task3 from "../../../assets/LandingPageTask3.svg";
import task4 from "../../../assets/LandingPageTask4.svg";
import task5 from "../../../assets/Todo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingHeader() {
  const navigate = useNavigate();
  return (
    <Flex
      className="section1"
      flexDirection={{ base: "column", sm: "column", md: "row" }}
      justifyContent="space-around"
      alignItems={"center"}
      paddingX="10rem"
      paddingY={0}
      overflow={"hidden"}>
      <Flex alignItems={"center"} flexDir={"column"} gap={2}>
        <Text
          justifySelf={"start"}
          fontWeight={500}
          fontSize={{ base: "3rem", md: "4rem", lg: "5rem" }}
          letterSpacing="-8px">
          TaskOver
        </Text>
        <Text
          justifySelf={"start"}
          //   fontWeight={500}
          color={"gray.600"}
          fontSize={{ base: "1rem", md: "1.3rem", lg: "1.3rem" }}>
          Sign up for our gamified task manager today and start leveling up your
          productivity!
        </Text>
        <Flex flexDir={"row"}>
          <motion.button
            style={{
              color: "white",
              textAlign: "center",
              alignContent: "center",
              marginTop: "1rem",
              fontSize: "1.5rem",
              width: "8em",
              height: "2.5em",
              fontWeight: "400",
              borderRadius: "14px",
            }}
            initial={{
              background: "linear-gradient(to right, #ff9966, #ff5e62)",
            }}
            whileHover={{
              background: "linear-gradient(to right, #ff5e62, #ff9966)",
              scale: 1.05,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
            whileTap={{
              scale: 1,
            }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
            }}
            onClick={() => navigate("/sign-up")}>
            Get Started
          </motion.button>
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        position={"relative"}
        boxSize={{ base: "xs", md: "lg", lg: "3xl" }}
        justifyContent={"center"}
        alignItems="center">
        <motion.div
          style={{
            position: "absolute",
          }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 0.7 }}
          transition={{
            duration: 5,
            type: "spring",
            stiffness: 25,
            damping: 15,
          }}>
          <Image src={task5} />
          <motion.div
            style={{
              position: "absolute",
              width: "60%",
              bottom: 0,
              right: 0,
            }}
            initial={{ scale: 0 }}
            animate={{ rotate: -10, scale: 1.5 }}
            transition={{
              duration: 7,
              type: "spring",
              stiffness: 25,
              damping: 15,
            }}>
            <Image src={task1} boxSize="xs" h={"5em"} />
          </motion.div>
          <motion.div
            style={{
              width: "60%",
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 4,
            }}
            initial={{ scale: 0.5 }}
            animate={{ rotate: 10, scale: 1 }}
            transition={{
              duration: 3,
              type: "spring",
              stiffness: 25,
              damping: 15,
            }}>
            <Image src={task2} boxSize="xs" h={"5rem"} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              width: "60%",
              top: 0,
              left: 0,
            }}
            initial={{ scale: 0.5 }}
            animate={{ rotate: -5, scale: 1 }}
            transition={{
              duration: 5,
              type: "spring",
              stiffness: 25,
              damping: 15,
            }}>
            <Image src={task4} boxSize="xs" />
          </motion.div>
          <Hide below="md">
            <motion.div
              style={{
                position: "absolute",
                width: "60%",
                bottom: 0,
                left: 0,
                zIndex: 1,
              }}
              initial={{ scale: 0.5 }}
              animate={{ rotate: 5, scale: 1 }}
              transition={{
                duration: 6,
                type: "spring",
                stiffness: 25,
                damping: 15,
              }}>
              <Image src={task3} boxSize="xs" padding={0} />
            </motion.div>
          </Hide>
        </motion.div>
      </Flex>
    </Flex>
  );
}

export default LandingHeader;
