import React, { ReactNode, useEffect, useState } from "react";

import {
  Image,
  useColorModeValue,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Img,
  Tooltip,
  Spacer,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiBell,

  FiChevronDown,
} from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import {BsPersonCircle} from 'react-icons/bs'

import { FiHome, FiMenu, FiUsers } from "react-icons/fi";
import { HiHome, HiUser , HiUserGroup } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { IconType } from "react-icons";
import { ReactText } from "react";

import { BiBuildingHouse } from "react-icons/bi";
import { CiHospital1, CiGlobe } from "react-icons/ci";
import { BsCardText } from "react-icons/bs";
import { RiTeamLine } from "react-icons/Ri";

import { Route, Link, useLocation, useNavigate } from "react-router-dom";
import { ValueTarget } from "framer-motion";
import DarkModeIconButton from "./Tasks/DarkModeIcon";
import Buttons from "./Authentication/Buttons";
import logo from "../assets/logo3.svg";
import avatar from "../assets/Avatar.png";




interface LinkItemProps {
  name: string;
  path: string;
  icon: IconType;
}


const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: HiHome, path: "" },
  { name: "Sessions", icon: HiUserGroup, path: "Sessions" },
  { name: "Profile", icon: HiUser, path: "Profile" },
  { name: "Sign Out", icon: IoLogOut, path: "signOut" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("#fdfdfd", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: "7rem" }} p="4">
        <Box height="20" />
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "7rem" }}
      pos="fixed"
      h="full"
      zIndex={10}
      {...rest}>
      <Flex h="20" alignItems="center" mx="3">
        <Image src={logo} maxH={"5rem"} maxW="5rem"></Image>
        <Spacer />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          p={".8rem"}
          m={"1.3rem"}
          key={link.name}
          icon={link.icon}
          value={link.path}>
          {link.name}
        </NavItem>
        
      ))}

      {/* position={"absolute"} bottom={4} left={4}  */}
      <DarkModeIconButton position={"absolute"} bottom={4} left={9} />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  value: ValueTarget;
}
const NavItem = ({ icon, children, value, ...rest }: NavItemProps) => {
  return (
    <Tooltip label={children} fontSize="md">
      <Link to={`/${value}`} style={{ textDecoration: "none" }}>
        <Flex
          flexDirection={"column"}
          align="center"
          borderRadius="1.5rem"
          role="group"
          cursor="pointer"
          _hover={{
            bg: useColorModeValue("gray.100", "gray.800"),
            boxShadow: "sm",
            // color: "black",
          }}
          transition={"250ms"}
          {...rest}>
          {icon && (
            <Icon
              my="3"
              fontSize="16"
              _groupHover={
                {
                  // color: "black",
                }
              }
              as={icon}
            />
          )}
          <Text display={{ base: "flex", md: "none" }}>{children}</Text>
        </Flex>
      </Link>
    </Tooltip>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      position={"fixed"}
      width={"100%"}
      zIndex={9}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        src={logo}
        maxH={"5rem"}
        maxW="5rem"
        display={{ base: "flex", md: "none" }}></Image>

      <Buttons />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
      </HStack>
    </Flex>
  );
};
