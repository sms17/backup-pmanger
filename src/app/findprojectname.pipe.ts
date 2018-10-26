import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findprojectname'
})
export class FindprojectnamePipe implements PipeTransform {

  transform(projectId: any, projects?: any): any {
      let projectRetrived = projects.filter(item=>item._id == projectId)[0];
      return !!projectRetrived ? projectRetrived.project : '-' ;
  }
}
  
