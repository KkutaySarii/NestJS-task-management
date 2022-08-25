import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service'; 

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    getTasks(@Query() filterdto: GetTaskFilterDto): Task[]{
        if(Object.keys(filterdto).length){
            return this.tasksService.getFilterTasks(filterdto);
        }
        else{
            return this.tasksService.getAllTasks();  
        }
        
    }
    
    @Delete('/:id')
    deleteTaskbyId(@Param('id') id: string) : Task{
        console.log("Delete is okey");
        return this.tasksService.deleteTaskById(id);
    } 

    /* @Delete('/:id')
    deleteTask(@Param('id') id: string) : void{
        return this.tasksService.deleteTask(id);
    } */

    @Get('/:id')
    getTaskById(@Param('id') id:string ) : Task{
        const found =  this.tasksService.getTaskById(id);

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    @Post()
    createTask(@Body() createTaskDtoe :CreateTaskDto) : Task{
        console.log('TaskDto', createTaskDtoe);
        return this.tasksService.createTask(createTaskDtoe);
    }

    @Patch('/:id/status')
    updateTask(@Param("id") id:string, @Body("status") status: TaskStatus) : Task{
        console.log("changed");
        return this.tasksService.updateTask(id,status);
    }
}
