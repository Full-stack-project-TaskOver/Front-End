import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Column from './Column'
import { ColumnType } from '../../utils/enums'

function App() {

  return (
    <>
    <Container maxWidth="container.lg" px={4} py={10}>
      <DndProvider backend={HTML5Backend}>

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
