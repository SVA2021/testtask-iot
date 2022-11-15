import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Subject, tap} from 'rxjs';
import {DeviceI, DeviceResponseI, TEST_REQUEST, URL_DEVICES} from 'src/app/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  items: DeviceI[]
  token: string
  isEmpty: boolean

  public errorMsg$: Subject<string | null> = new Subject<string | null>()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isEmpty = true
    this.errorMsg$.next(null)
    const myToken = localStorage.getItem('token')
    if (myToken) {
      this.token = myToken;
      this.http.post<any>(URL_DEVICES, TEST_REQUEST, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .pipe(
          tap(this.setDevices.bind(this)),
          catchError(this.handleError.bind(this))
        )
        .subscribe()
    } else {
      this.isEmpty = true
      this.router.navigate(['/admin']);
    }
  }

  private setDevices(response: DeviceResponseI) {
    this.items = response.data.metering_devices.data ?? []
    this.isEmpty = this.items.length === 0;
    this.errorMsg$.next(null)
  }

  private handleError(error: HttpErrorResponse) {
    this.errorMsg$.next(error.error.error.msg)
    return error.error.error.msg
  }

}
