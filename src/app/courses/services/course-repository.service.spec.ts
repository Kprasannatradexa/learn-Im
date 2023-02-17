import { TestBed } from '@angular/core/testing';

import { CourseRepositoryService } from './course-repository.service';

describe('CourseRepositoryService', () => {
  let service: CourseRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
