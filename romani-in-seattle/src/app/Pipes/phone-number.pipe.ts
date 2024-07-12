
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string | number | undefined): string {
    if (!value) {
      return '';
    }

    // Convert value to string and remove all non-digit characters
    let cleaned = ('' + value).replace(/\D/g, '');

    // Check if the cleaned value matches the expected 10-digit phone number format
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      // Format the matched parts into (XXX) XXX-XXXX
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    // Return the original value if it doesn't match the expected format
    return value.toString();
  }
}
