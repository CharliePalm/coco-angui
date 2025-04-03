import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs";
import { APIService } from "./api.service";
import { DataType, EventSchema, CalendarEvent, Image } from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class Store {
    private events: BehaviorSubject<CalendarEvent[] | undefined> = new BehaviorSubject(undefined as any);
    private events$?: Observable<CalendarEvent[] | undefined>;
    private eventSchema: BehaviorSubject<EventSchema | undefined> = new BehaviorSubject(undefined as any);
    private eventSchema$?: Observable<EventSchema | undefined>;
    private otherData: BehaviorSubject<any> = new BehaviorSubject(undefined);
    private otherData$?: Observable<any>;
    private images: BehaviorSubject<Image[] | undefined> = new BehaviorSubject(undefined as any);
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
                const [events, schema, images, other] = [[], [], [], []] as any[][];
                console.log(v);
                v.forEach((data) => {
                    if (data.type === DataType.CalendarEvent) events.push(data);
                    else if (data.type === DataType.Schema) schema.push(data.schema);
                    else if (data.type === DataType.Image) images.push(data);
                    else other.push(data);
                });
                console.log(images);
                events.sort((a, b) => {
                    // Split and convert the date strings to numbers
                    const [monthA, dayA, yearA] = a.date.split('/').map(Number);
                    const [monthB, dayB, yearB] = b.date.split('/').map(Number);
                    
                    // Create Date objects (months are 0-indexed)
                    const dateA = new Date(yearA, monthA - 1, dayA);
                    const dateB = new Date(yearB, monthB - 1, dayB);
                    
                    // Subtract the time values to sort in ascending order (earlier dates first)
                    return dateA.getTime() - dateB.getTime();
                })
                this.events.next(events as CalendarEvent[]);
                this.eventSchema.next(schema?.[0]);
                this.images.next(images);
                this.otherData.next(other);
            }),
        ).subscribe();
    }

    load(): void {
        this.eventSchema$ = this.eventSchema.asObservable();
        this.events$ = this.events.asObservable();
        this.images$ = this.images.asObservable();
        this.otherData$ = this.otherData.asObservable();
        this.refresh();
    }

    getClientData(): Observable<CalendarEvent[]> {
        if (!this.events$) {
            this.load();
        }
        return this.events$! as any;
    }

    getClientSchema(): Observable<EventSchema | undefined> {
        if (!this.eventSchema$) {
            this.load();
        }
        return this.eventSchema$! as any;
    }

    getImages(): Observable<Image[]> {
        if (!this.images$) {
            this.load();
        }
        return this.images$! as any;
    }

    getOtherData(): Observable<any> {
        if (!this.otherData$) {
            this.load();
        }
        return this.otherData$! as any;
    }
}