import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Feature1 from "./Components/Feature1";
import LandingHeader from "./Components/LandingHeader";
import Navbar from "./Components/LandingNavbar";
import LandingPageFooter from "./Components/LandingFooter";

function LandingPage() {
  return (
    <>
      <Flex flexDirection={"column"} p={0}>
        <Box
          position="sticky"
          bg={useColorModeValue("white", "gray.800")}
          top={5}
          zIndex={5}
          padding={2}
          marginX="1em"
          border="1px solid #eee"
          borderRadius={20}
          shadow="md">
          <Navbar />
        </Box>
        <Box>
          <LandingHeader />
        </Box>
        <Feature1 />
        <LandingPageFooter />
      </Flex>
    </>
  );
}

export default LandingPage;
