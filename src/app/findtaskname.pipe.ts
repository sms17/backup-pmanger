import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findtaskname'
})
export class FindtasknamePipe implements PipeTransform {

  transform(taskId: any, tasks?: any): any {
    let taskRetrived = tasks.filter(task=>task._id == taskId)[0];
    return !!taskRetrived ? taskRetrived.task : '-' ;
  }
}
