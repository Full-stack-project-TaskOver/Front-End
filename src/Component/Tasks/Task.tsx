import { DeleteIcon } from "@chakra-ui/icons";
import {Box, IconButton, Textarea} from "@chakra-ui/react"
import { TaskModel } from "../../utils/models";
import { AutoResizeTextArea } from "./AutoResizeTextArea";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import _ from 'lodash';
import { memo } from 'react';
import { TfiMoreAlt } from 'react-icons/tfi';

type TaskProps = {
    index: number;
    task: TaskModel;
    onUpdate: (id: TaskModel["id"], updateTask: TaskModel) => void;
    onDelete: (id: TaskModel["id"]) => void;
    onDropHover: (i: number, j: number) => void;
};

function Task({
    index, 
    task,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
    onDropHover: handleDropHover,
}: TaskProps){
    const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
        { task, index}, handleDropHover
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = e.target.value;
        handleUpdate(task.id, {...task, title: newTitle})
    }
    const handleDeleteClick = () => handleDelete(task.id)


    return (
        <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        // w={200}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        bgColor={task.color}
        flexGrow={0}
        flexShrink={0}
        opacity={isDragging ? 0.5: 1}
        >
            <IconButton
                position="absolute"
                top={0}
                right={0}
                zIndex={100}
                aria-label="delete-task"            
                size="md"
                colorScheme="solid"
                color="gray.700"
                icon={<TfiMoreAlt/>}
                opacity={0}
                _groupHover={{ opacity: 1, }}
                onClick={handleDeleteClick}
                />
                <AutoResizeTextArea
                value={task.title}
                fontWeight="semibold"
                cursor="inherit"
                border="none"
                p={0}
                resize="none"
                minH={70}
                maxH={200}
                focusBorderColor="transparent"
                color="gray.700"
                onChange={handleTitleChange}
                />

                

        </Box>
    )
}

export default Task