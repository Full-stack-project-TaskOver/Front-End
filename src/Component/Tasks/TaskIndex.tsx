import { Box, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Spacer, useColorModeValue, useDisclosure, Checkbox, Stack, AccordionButton, Accordion, AccordionItem, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Column from './Column'
import { ColumnType } from '../../utils/enums'
import { AddIcon } from '@chakra-ui/icons'
import useColumnTasks from '../../hooks/useColumnTask'
import { useRef, useState } from 'react'
import TaskPage from './TaskPage'

function App() {

  return (
    <>
    <Container maxWidth="container.lg" px={4} py={10} userSelect={'none'}>
      <Flex gap={4} >
        <Button rounded={8} p='4'                 
                bgColor={useColorModeValue("gray.100", "gray.800")}
                _hover={{bgColor: useColorModeValue("gray.200", "gray.600")}}
        >
            All Tasks
        </Button>
        <Button rounded={8} p='4'                 
                bgColor={useColorModeValue("gray.100", "gray.800")}
                _hover={{bgColor: useColorModeValue("gray.200", "gray.600")}}
        >
            For Me
        </Button>
        <Spacer />
        <Flex rounded={8} p='4' height='10' alignItems={'center'} fontWeight={'medium'}
              bgColor={useColorModeValue("gray.100", "gray.800")}
        >
        🔥 Streak
        </Flex>
      </Flex>
      <Progress colorScheme='green' height='18px' value={20} my={8} rounded={18}/>

      <SimpleGrid columns={{base:1, md: 3}} spacing={{base: 16, md: 4}}>
        <TaskPage/>
      </SimpleGrid>


      <DndProvider backend={HTML5Backend}>
      <SimpleGrid columns={{base:1, md: 3}} spacing={{base: 16, md: 4}} mt={4}>
        <Column column={ColumnType.TO_DO}/>
        <Column column={ColumnType.IN_PROGRESS}/>
        <Column column={ColumnType.COMPLETED}/>
      </SimpleGrid>

      </DndProvider>
    </Container>
    
    </>
  )
}

export default App
