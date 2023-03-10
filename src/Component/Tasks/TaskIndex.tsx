import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Column from './Column'
import DarkModeIconButton from './DarkModeIcon'
import { ColumnType } from '../../utils/enums'

function App() {

  return (
    <>
    <Heading
    fontSize={{base: "4xl", sm:"5xl", md:"6xl"}}
    fontWeight="bold"
    textAlign="center"
    bgGradient= "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);"
    bgClip="text"
    mt={4}
    >

    kanban board

    </Heading>

    <DarkModeIconButton position={"absolute"} bottom={4} right={4}/>
    <Container maxWidth="container.lg" px={4} py={10}>
      <DndProvider backend={HTML5Backend}>

      <SimpleGrid columns={{base:1, md: 4}} spacing={{base: 16, md: 4}}>
        <Column column={ColumnType.TO_DO}/>
        <Column column={ColumnType.IN_PROGRESS}/>
        <Column column={ColumnType.BLOCKED}/>
        <Column column={ColumnType.COMPLETED}/>
      </SimpleGrid>

      </DndProvider>
    </Container>
    
    </>
  )
}

export default App
