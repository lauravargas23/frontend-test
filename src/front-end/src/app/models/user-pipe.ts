import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rol'
})

export class UserPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (args != null) {
            if (args=='user') {
                return 'Normal user';
            } else {
                return 'Administrator';
            }
        }
    }
}
