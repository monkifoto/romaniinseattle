import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorLoggingService } from '../Services/error-logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const errorLoggingService = this.injector.get(ErrorLoggingService);
    errorLoggingService.logError(error);
  }
}
