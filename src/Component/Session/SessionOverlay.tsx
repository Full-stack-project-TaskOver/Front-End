import {
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Card,
  Icon,
  Text,
  HStack,
  Box,
  useRadio,
  useRadioGroup,
  Collapse,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { IoIosAdd } from "react-icons/io";

const tabItems = [
  { name: "Company" },
  { name: "Family" },
  { name: "Freelancers" },
  { name: "Personal" },
];

interface sessionType {
  type: string;
  imgPath: string;
  title: string;
  description: string;
}

let session: sessionType = {
  type: "",
  imgPath: "",
  title: "",
  description: "",
};

// Radio Button
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();

  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />

      <Box
        {...checkbox}
        cursor="pointer"
        // borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        fontSize={"xl"}
        bg="gray.100"
        transition={"200ms"}
        _checked={{
          bg: "#7BD0FF",
          color: "gray.50",
        }}
        _focus={{
          boxShadow: "xl",
        }}
        px={5}
        py={4}>
        {props.children}
      </Box>
    </Box>
  );
}

function SessionOverlay() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();

  const options = ["Company", "Freelancers", "Family", "Personal"];

  // To handle the radio button value.
  const handleChange = (value: string) => {
    session.type = value;
    session.imgPath = (value + ".png").toLowerCase();
    console.log(session.type);
    console.log(session.imgPath);
  };

  // To read the radio buttons value in every change.
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name: "Session",
    defaultValue: "Company",
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <>
      <Card
        as={"button"}
        w="80%"
        h="12rem"
        minW={"14rem"}
        backgroundColor={useColorModeValue("white", "gray.900")}
        shadow="sm"
        borderRadius={15}
        border="2px dashed"
        borderColor={"gray.600"}
        cursor="pointer"
        transition={"200ms"}
        justifyContent="center"
        alignItems={"center"}
        onClick={onOpen}
        _hover={{
          backgroundColor: useColorModeValue("gray.100", "gray.800"),
          borderColor: useColorModeValue("gray.800", "gray.100"),
        }}>
        <Text color={useColorModeValue("gray.600", "gray.400")}>
          Add Session
        </Text>

        <Icon
          as={IoIosAdd}
          boxSize={"3em"}
          alignSelf={"center"}
          color={"gray.500"}
          transition={"200ms"}
          _hover={{
            color: useColorModeValue("gray.800", "gray.100"),
          }}
        />
      </Card>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        size={"3xl"}
        motionPreset="scale">
        <ModalOverlay />

        <ModalContent>
          <Text px={6} pt={3} color="gray.400">
            Sessions /{" "}
            <Text as="span" color="gray.700">
              {" "}
              Create Session{" "}
            </Text>
          </Text>

          <ModalHeader px={6} pt={9} color={"gray.700"}>
            <Text>
              This Session {session.type == "Personal" ? "is" : "for"} a ..{" "}
              <Text as={"span"} color="gray.600">
                {session.type}
              </Text>
            </Text>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody pt={1} justifyItems="center">
            {/* Radio Cards Here */}
            <HStack {...group} justifyContent="center" gap={5}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
            <VStack spacing={3} p={6}>
              <Text alignSelf={"start"}>
                Title
                <Text as={"span"} color={"red.600"}>
                  *
                </Text>
              </Text>
              <Input
                variant="outline"
                placeholder="Enter Title Here"
                onChange={(e) => {
                  setTitle(e.target.value);
                  title ? (session.title = title) : "undefined";
                }}
              />

              <Text alignSelf={"start"}>Description</Text>
              <Input
                variant="outline"
                placeholder="Enter Description Here"
                onChange={(e) => {
                  setDesc(e.target.value);
                  desc ? (session.description = desc) : "";
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}

            <Button variant="solid">Create Session</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SessionOverlay;
