import { Injectable } from '@angular/core';
import { NotifyService } from '@tsmean/toast';

declare var aesjs;

@Injectable({
  providedIn: 'root'
})
export class CypherService {

  constructor(
  ) { }

  encrypt(text: string, secret: string): {
    encrypted?: string;
    err?: 'DECRYPTION_UNEQUAL_ENCRYPTION'
  } {
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const key = this.getAESKey(secret);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key);
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    const decryptionWorks = this.decrypt(encryptedHex, secret) === text;
    return {
      encrypted: encryptedHex,
      err: decryptionWorks ? null : 'DECRYPTION_UNEQUAL_ENCRYPTION'
    };
  }

  decrypt(encryptedHex: string, secret: string) {
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    const key = this.getAESKey(secret);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  }

  getAESKey(secret: string) {
    const key256: number[] = [];
    for (let i = 0; i < 32; i++) {
      key256.push(secret.charCodeAt(i % secret.length));
    }
    return key256;
  }

}
