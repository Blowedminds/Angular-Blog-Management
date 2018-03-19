import { TestBed, inject } from '@angular/core/testing';

import { RoutingListService } from './routing-list.service';

fdescribe('RoutingListService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingListService]
    });
  });

  let service: RoutingListService = TestBed.get(RoutingListService);

  it('should be created', inject([RoutingListService], (service: RoutingListService) => {
    expect(service).toBeTruthy();
  }));

  it('should return article content url', () => {
    expect(service.getUrl('article.article.content')).toEqual('article/article/content/');
  });
  //
  // it('should parse empty string', () => {
  //   expect(service.parseKey('')).toEqual([]);
  // });
  //
  // it('should parse article.content', () => {
  //   expect(service.parseKey('article.content')).toEqual(['article', 'content']);
  // });
  //
  // it('should parse .article.content', () => {
  //   expect(service.parseKey('.article.content')).toEqual(['article', 'content']);
  // });
  //
  // it('should parse article.content.', () => {
  //   expect(service.parseKey('article.content.')).toEqual(['article', 'content']);
  // });
  //
  // it('should parse article.content.test', () => {
  //   expect(service.parseKey('article.content.test')).toEqual(['article', 'content', 'test']);
  // });
  //
  // it('should parse article.content.test.', () => {
  //   expect(service.parseKey('article.content.test.')).toEqual(['article', 'content', 'test']);
  // });
  //
  // it('should parse .article.content.test', () => {
  //   expect(service.parseKey('.article.content.test')).toEqual(['article', 'content', 'test']);
  // });

});
