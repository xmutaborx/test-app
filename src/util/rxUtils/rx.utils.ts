import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

export const toKeyValue = <T>(key: string) => (source: Observable<T>) => source.pipe(map(val => ({ [key]: val })));
