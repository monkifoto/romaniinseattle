import { DomSanitizer } from '@angular/platform-browser';
import { UrlHelperPipe , InstagramHandlePipe, InstagramLinkPipe} from '../Pipes/url-helper.pipe';
import { TestBed } from '@angular/core/testing';


describe('Custom Pipes', () => {
  let urlHelperPipe: UrlHelperPipe;
  let instagramHandlePipe: InstagramHandlePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    });

    sanitizer = TestBed.inject(DomSanitizer);
    urlHelperPipe = new UrlHelperPipe(sanitizer);
    instagramHandlePipe = new InstagramHandlePipe(sanitizer);
  });

  describe('UrlHelperPipe', () => {
    it('create an instance', () => {
      expect(urlHelperPipe).toBeTruthy();
    });

    it('transforms URL to a clickable link', () => {
      const url = 'https://www.example.com';
      const transformed = urlHelperPipe.transform(url);
      expect(transformed).toContain('<a href="https://www.example.com" target="_blank">https://www.example.com</a>');
    });

    it('returns empty SafeHtml if input is undefined', () => {
      const transformed = urlHelperPipe.transform(undefined);
      expect(transformed).toEqual(sanitizer.bypassSecurityTrustHtml(''));
    });
  });

  describe('InstagramHandlePipe', () => {
    it('create an instance', () => {
      expect(instagramHandlePipe).toBeTruthy();
    });

    it('transforms @handle to a clickable link', () => {
      const handle = '@testhandle';
      const transformed = instagramHandlePipe.transform(handle);
      expect(transformed).toContain('https://www.instagram.com/testhandle');
      expect(transformed).toContain('<a href="https://www.instagram.com/testhandle" target="_blank">@testhandle</a>');
    });

    it('returns empty SafeHtml if input is undefined', () => {
      const transformed = instagramHandlePipe.transform(undefined);
      expect(transformed).toEqual(sanitizer.bypassSecurityTrustHtml(''));
    });
  });

  describe('InstagramLinkPipe', () => {
    let instagramLinkPipe: InstagramLinkPipe;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DomSanitizer]
      });

      sanitizer = TestBed.inject(DomSanitizer);
      instagramLinkPipe = new InstagramLinkPipe(sanitizer);
    });

    it('create an instance', () => {
      expect(instagramLinkPipe).toBeTruthy();
    });

    it('transforms Instagram handle to a clickable link with SVG', () => {
      const handle = '@example_handle';
      const svg = '<svg></svg>';
      const transformed = instagramLinkPipe.transform(handle, svg);
      expect(transformed).toContain(`<a href="https://www.instagram.com/example_handle" target="_blank">${svg}</a>`);
    });


  });
});
