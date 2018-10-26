import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findusername'
})
export class FindusernamePipe implements PipeTransform {

  transform(userId: any, users?: any): any {
    let userRetrived = users.filter(user=>user._id == userId)[0];
    return !!userRetrived ? userRetrived.first_name : '-' ;
  }
}
