import {Component} from '@angular/core'

@Component({
  selector:'loading-spinner',
  template:`<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`,
  styleUrls:[`./loading.css`]
})
export class LoadingSpinner{

}
