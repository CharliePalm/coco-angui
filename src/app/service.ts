import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Service {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
      return this.http.get(url)
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  public put(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }
}
