import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { CypherService } from './cypher.service';
import { NotifyService } from '@tsmean/toast';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import * as clipboard from 'clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  text = '';
  secret = '';
  secretValidation = '';
  output = '';

  constructor(
    private cypherService: CypherService,
    private notifyService: NotifyService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const clip = new clipboard('button');
    clip.on('success', (e) => {
      e.clearSelection();
      this.output = '';
      this.cdr.detectChanges();
    });
  }

  encrypt(text: string, secret: string) {
    if (secret === this.secretValidation) {
      this.encryptWithoutValidation(text, secret);
    } else {
      this.notifyService.error(`Secrets don't match`);
    }
  }

  encryptWithoutValidation(text, secret) {
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
    this.output = value;
    this.notifyService.success('copied to clipboard');
  }

}
