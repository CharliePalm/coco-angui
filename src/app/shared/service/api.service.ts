import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import {
  CalendarEvent,
  CLIENT_ID,
  UnsortedDynamoItem,
  UploadType,
  Image,
} from '../model';
import { environment } from 'src/environments/environment';
import { LocalDataStore } from './localData';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private localDataStore = new LocalDataStore();
  constructor(private http: HttpClient) {}

  public loadClientData(): Observable<UnsortedDynamoItem[]> {
    if (!environment.production) {
      return of(this.localDataStore.mockData);
    }
    return this.http
      .get<
        UnsortedDynamoItem[]
      >(`https://3hsooi1ls5.execute-api.us-east-2.amazonaws.com/Prod/client_query?client_id=${CLIENT_ID}`)
      .pipe(
        shareReplay(),
        catchError((error) => {
          return of([]);
        }),
      );
  }
}

export function getS3Path(pathToFile: string): string {
  return `https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/${pathToFile}`;
}

export function getS3PathFromImage(img?: Image): string | undefined {
  return img
    ? getS3Path(`${CLIENT_ID}/${UploadType.SiteImage}/${img.id}`)
    : undefined;
}

export function getS3PathFromEvent(event: CalendarEvent): string | undefined {
  return event
    ? getS3Path(`${CLIENT_ID}/${UploadType.EventImage}/${event.id}`)
    : undefined;
}
