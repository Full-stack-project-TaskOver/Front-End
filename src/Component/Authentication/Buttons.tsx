import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

function Buttons() {
  return (
    <Flex gap={2} flexDir={'row'} justifyContent={'center'}>
      <Link to="/sign-in">
        <Button _hover={{backgroundColor:'rgba(0, 135, 85, 0.7)'}}>تسجيل الدخول</Button>
      </Link>
      <Link to="/sign-up">
        <Button _hover={{backgroundColor:'rgba(0, 135, 85, 0.7)'}}>حساب جديد</Button>
      </Link>
    </Flex>
  );
}

export default Buttons;
