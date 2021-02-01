import { TestBed } from '@angular/core/testing';
import { DataService} from './data-db.service'; //yo
//import { DataDbService } from './data-db.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
