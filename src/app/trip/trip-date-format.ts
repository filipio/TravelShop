import {Pipe, PipeTransform} from '@angular/core';
@Pipe({ name: 'customDate' })
export class CustomDate implements PipeTransform {
 transform(date : Date): String {
  if(!date){
    return "";
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let monthInString = month < 10 ? "0" + month.toString() : month.toString();
  let dayInString = day < 10 ? "0" + day.toString() : day.toString();

  return dayInString + "-" + monthInString + "-" + year.toString();
  }
}