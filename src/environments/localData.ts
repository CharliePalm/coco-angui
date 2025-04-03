import { Observable, of } from 'rxjs';
import { DynamoItem } from 'src/app/shared/model';

export class LocalDataStore {
    mockData: (DynamoItem | any)[] = [];
    
    removeFromLocalData(id: string): Observable<boolean> {
        let found = false;
        this.mockData = this.mockData.filter((v) => {
            found = found || v.id === id
            return v.id !== id;
        });
        return of(found);
    }

    addToLocalData(value: DynamoItem) {
        for (let i = 0; i < this.mockData.length; i++) {
            if (this.mockData[i].id === value.id) {
                this.mockData[i] = value;
                return of(true);
            }
        }
        this.mockData.push(value);
        return of(true);
    }
}
