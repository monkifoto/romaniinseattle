import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'urlHelper'
})
export class UrlHelperPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value?: string): SafeHtml {
    if (!value) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }

    // Regular expression to detect URLs
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const newValue = value.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');

    return this.sanitizer.bypassSecurityTrustHtml(newValue);
  }
}


@Pipe({
  name: 'instagramHandle'
})
export class InstagramHandlePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | undefined): SafeHtml {
    if (!value) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }

    const handlePattern = /@([a-zA-Z0-9._]+)/ig;
    const newValue = value.replace(handlePattern, (match, p1) => {
      return `<a href="https://www.instagram.com/${p1}" target="_blank">${match}</a>`;
    });
    console.log(newValue);
    return this.sanitizer.bypassSecurityTrustHtml(newValue);
  }
}

@Pipe({
  name: 'instagramLink'
})
export class InstagramLinkPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(instagramHandle: string | undefined, svgIconUrl: string): SafeHtml {
    if (!instagramHandle) return '';
    const handle = instagramHandle.startsWith('@') ? instagramHandle.substring(1) : instagramHandle;
    const instagramLink = `https://www.instagram.com/${handle}`;
    const svgIcon = `<a target="_blank" href="${instagramLink}">
                      <img src="${svgIconUrl}" alt="Instagram Icon">
                    </a><br>`;

    return this.sanitizer.bypassSecurityTrustHtml(svgIcon);
  }
}
