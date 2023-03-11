import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import useColumnDrop from '../../hooks/useColumnDrop';
import useColumnTasks from '../../hooks/useColumnTask';
import { ColumnType } from '../../utils/enums';
import Task from './Task';


const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Completed: 'green',
};

function Column({ column }: { column: ColumnType }) {

    const {tasks, updateTask, deleteTask, dropTaskFrom, swapTasks} = useColumnTasks(column)

    const {dropRef, isOver} = useColumnDrop(column, dropTaskFrom)

    const ColumnTasks = tasks.map((task, index)=>
        (<Task key={task.id} task={task} index={index} onDelete={deleteTask} onUpdate={updateTask} onDropHover={swapTasks} />)
    )
    return(
        <Box>
            <Heading fontSize="md" mb={4} letterSpacing="wide">
                <Badge
                px={2}
                py={1}
                rounded="lg"
                colorScheme={ColumnColorScheme[column]}
                >
                  {column}

                </Badge>
            </Heading>
            <Stack
            ref={dropRef}
            direction={{base:"row", md: "column"}}
            h={{base: 140, md: 600}}
            p={4}
            mt={2}
            spacing={4}
            bgColor={useColorModeValue("gray.50", "gray.800")}
            rounded="lg"
            boxShadow="md"
            overflow="auto"
            opacity={isOver ? 0.85: 1}
            >
                {ColumnTasks}
            </Stack>
        </Box>

    );
}
export default Column;

function swapTasks(i: number, j: number): void {
    throw new Error('Function not implemented.');
}
