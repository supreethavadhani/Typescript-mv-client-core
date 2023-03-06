import {
  Injectable
} from "@angular/core";
import { ServiceAgent } from "./serviceAgent";
import { FormData } from "./formData";

@Injectable()
export class FormService {
  public static getFormFd(formName:string,sa:ServiceAgent,allServices:any) {
    let form = allServices[formName].getInstance()
    let fd = new FormData(form,sa)
    return fd
  }
}
