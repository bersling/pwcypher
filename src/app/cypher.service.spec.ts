import { TestBed, inject } from '@angular/core/testing';

import { CypherService } from './cypher.service';

describe('CypherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CypherService]
    });
  });

  it('should be created', inject([CypherService], (service: CypherService) => {
    expect(service).toBeTruthy();
    const key = service.getAESKey('ABC');
    expect(key.length).toEqual(32);
    expect(key[0]).toEqual(65);
    expect(key[1]).toEqual(66);
    expect(key[2]).toEqual(67);
  }));

});
