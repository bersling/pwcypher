import { Component, ViewChild, ElementRef } from '@angular/core';
import { CypherService } from './cypher.service';
import { NotifyService } from '@tsmean/toast';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = '';
  secret = '';

  constructor(
    private cypherService: CypherService,
    private notifyService: NotifyService
  ) {}

  encrypt(text: string, secret: string) {
    const resp = this.cypherService.encrypt(text, secret);
    if (resp.err == null) {
      this.onEncryptAndDecrypt(resp.encrypted);
    } else {
      this.notifyService.error(resp.err);
    }
  }

  decrypt(text: string, secret: string) {
    const value = this.cypherService.decrypt(text, secret);
    this.onEncryptAndDecrypt(value);
  }

  onEncryptAndDecrypt(value) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.notifyService.success('copied to clipboard');
  }


}
