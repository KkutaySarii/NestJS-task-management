import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { GetTaskFilterDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task[]{
        return this.tasks;
    }

    getTaskById(id: string): Task {
        let t : Task= null;
        this.tasks.forEach(function (task){
            if(task.id == id){
                console.log("find");
                t = task;
            }
        })
        return t; 
        //return this.tasks.find((task)=>task.id ===id);
    } 

    getFilterTasks(filterdto: GetTaskFilterDto): Task[]{
        const {status, search} = filterdto;
        
        let tasks = this.getAllTasks();
        
        if(status){
            tasks = tasks.filter((task)=>task.status===status);
        }
        if(search){
            tasks = tasks.filter((task)=>{
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                else 
                    return false;
            });
        }


        return tasks;
    }

    deleteTaskById(id:string) : Task{
        const t = this.tasks.findIndex((task)=>task.id ===id);
        const tas = this.tasks[t];
        delete this.tasks[t];
        return tas;
    } 

    
    /* deleteTask(id:string) : void{
        this.tasks = this.tasks.filter((task)=>task.id!==id);
    }
     */
    createTask(createTaskDto : CreateTaskDto) : Task{
        const {title, description}  = createTaskDto;
        const task : Task = {
            id : uuid(),
            title,
            description,
            status : TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    updateTask(id:string, stat : TaskStatus): Task{
        const task : Task = this.getTaskById(id);
        task.status = stat;
        return task;
    }
}
