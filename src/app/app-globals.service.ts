import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalsService {

  readonly baseAppUrl: string = 'http://localhost:5000/';
  readonly repositiryAPIUrl: string = 'https://api.github.com/';
}

