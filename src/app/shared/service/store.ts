import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { APIService } from './api.service';
import { DataType, CalendarEvent, Image, DynamoItem, OtherItem } from '../model';

@Injectable({
  providedIn: 'root',
})
export class Store {
    private events: ReplaySubject<CalendarEvent[] | undefined> = new ReplaySubject();
    private events$?: Observable<CalendarEvent[] | undefined>;
    private otherData: ReplaySubject<DynamoItem[]> = new ReplaySubject();
    private otherData$?: Observable<DynamoItem[]>;
    private images: ReplaySubject<Image[] | undefined> = new ReplaySubject();
    private images$?: Observable<Image[] | undefined>;

    constructor(
        private APIService: APIService,
    ) {}

    update(result: any[]): void {
        this.events.next(result);
    }

    refresh(): void {
        this.APIService.loadClientData().pipe(
            tap((v) => {
                const [events, images, other] = [[] as CalendarEvent[], [] as Image[], [] as OtherItem[]];
                v.forEach((data) => {
                    if (data.type === DataType.CalendarEvent) events.push(data);
                    else if (data.type === DataType.Image) images.push(data);
                    else other.push(data);
                });
                events.sort((a, b) => {
                    // Split and convert the date strings to numbers
                    const [monthA, dayA, yearA] = a.date.split('/').map(Number);
                    const [monthB, dayB, yearB] = b.date.split('/').map(Number);
                    
                    // Create Date objects (months are 0-indexed)
                    const dateA = new Date(yearA, monthA - 1, dayA);
                    const dateB = new Date(yearB, monthB - 1, dayB);
                    
                    // Subtract the time values to sort in ascending order (earlier dates first)
                    return dateA.getTime() - dateB.getTime();
                });
                this.events.next(events as CalendarEvent[]);
                this.images.next(images);
                this.otherData.next(other);
            }),
        ).subscribe();
    }

    load(): void {
        this.events$ = this.events.asObservable();
        this.images$ = this.images.asObservable();
        this.otherData$ = this.otherData.asObservable();
        this.refresh();
    }

    getCalendarEvents(): Observable<CalendarEvent[]> {
        if (!this.events$) {
            this.load();
        }
        return this.events$! as any;
    }

    getImages(): Observable<Image[]> {
        if (!this.images$) {
            this.load();
        }
        return this.images$! as any;
    }

    getOtherData(): Observable<OtherItem[]> {
        if (!this.otherData$) {
            this.load();
        }
        return this.otherData$! as Observable<OtherItem[]>;
    }
}