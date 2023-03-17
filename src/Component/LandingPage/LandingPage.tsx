import { Flex, Heading, Hide, Image, Show, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import task1 from "../../assets/LandingPageTask1.svg";
import task2 from "../../assets/LandingPageTask2.svg";
import task3 from "../../assets/LandingPageTask3.svg";
import task4 from "../../assets/LandingPageTask4.svg";
import task5 from "../../assets/Todo.png";
import { motion } from "framer-motion";

function LandingPage() {
  const [isHovered, setHovered] = useState(false);
  return (
    <>
      {/* <div>LandingPage</div> */}
      <Flex flexDirection={"column"}>
        <Flex
          className="section1"
          flexDirection={{ base: "column", sm: "column", md: "row" }}
          justifyContent="space-around"
          alignItems={"center"}
          padding="1rem">
          <Flex alignItems={"center"} flexDir={"column"} gap={5}>
            {/* <motion.svg
              viewBox="0 2 50 60"
              style={{
                border: "3px solid #3B3B3B",
                borderRadius: "10px",
                width: "4rem",
                height: "4rem",
                overflow: "visible",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M20.5333 49.5102L2.76405 28.3743L0 31.95L20.5333 56.6761L64.5333 3.69152L61.2695 0L20.5333 49.5102Z"
                fill="#0EB200"
              />
            </motion.svg> */}
            <Text
              justifySelf={"start"}
              fontWeight={500}
              fontSize={{ base: "3rem", md: "4rem", lg: "5rem" }}
              letterSpacing="-8px">
              TaskOver
            </Text>
            <Text
              justifySelf={"start"}
              fontWeight={500}
              fontSize={{ base: "3rem", md: "4rem", lg: "5rem" }}
              letterSpacing="-8px">
              Fun to click
            </Text>
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
        <Flex className="section2" w={""}></Flex>
      </Flex>
    </>
  );
}

export default LandingPage;
