import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import {v4 as uuidv4} from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

function useTaskCollection() {
  // const [task, setTask] = React.useState<string>();
  // let { id } = useParams();
  // const getTask = async () => {


  //   const request = await fetch(`http://localhost:3003/task/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });

  //   const data = await request.json();
  //   if(data.message == 'you dont have any sessions'){
  //     return data.message
  //   }
  
  //   setTask(Object.values(data)[0] as string) 
  //   // if(adminSession ){
  //   //   setTimeout(()=>{
  //   //     fetchAdminSessions()
  //   //   },1000)
     
  //   // }
  //   console.log(data[0]);

   
    
  // };
  // console.log(task);


  // useEffect(() => {
  //   getTask()
  // }, []);
    return useLocalStorage<{ [key in ColumnType]: TaskModel[];}>("tasks", {
      
        Todo: [
          
            {
              id: uuidv4(),
              column: ColumnType.TO_DO,
              title: 'Task 1',
              color: 'blue.300',
            },
          ],
          'In Progress': [
            {
              id: uuidv4(),
              column: ColumnType.IN_PROGRESS,
              title: 'Task 2',
              color: 'yellow.300',
            },
          ],
          Completed: [
            {
              id: uuidv4(),
              column: ColumnType.COMPLETED,
              title: 'Task 3',
              color: 'green.300',
            },
          ],
        });
      }
    

export default useTaskCollection;