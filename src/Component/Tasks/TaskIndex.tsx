import { Box, Container, Heading, IconButton, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Column from './Column'
import { ColumnType } from '../../utils/enums'
import { AddIcon } from '@chakra-ui/icons'
import useColumnTasks from '../../hooks/useColumnTask'

function App() {
  const {addEmptyTask} = useColumnTasks(ColumnType.TO_DO)
  return (
    <>
    <Container maxWidth="container.lg" px={4} py={10}>
      <DndProvider backend={HTML5Backend}>
      <IconButton
                size="xs"
                // w="full"
                color={useColorModeValue("gray.500", "gray.400")}
                bgColor={useColorModeValue("gray.100", "gray.800")}
                _hover={{bgColor: useColorModeValue("gray.200", "gray.600")}}
                px={6}
                py={7}
                mb={6}
                variant="solid"
                colorScheme="black"
                aria-label="add-task"
                icon={<AddIcon/>}
                onClick = {addEmptyTask}
            />
      <SimpleGrid columns={{base:1, md: 3}} spacing={{base: 16, md: 4}}>
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
