import * as CryptoJS from 'crypto-js';
import {UserSession} from "../../core/models/UserSession";
import {Injectable} from "@angular/core";
import {SessionStorageService} from "ngx-webstorage";
@Injectable({
  providedIn: 'root'
})
export class CryptoData{
  secretKey = 'miClaveSecreta';
  constructor(private sessionStorageService: SessionStorageService) { }

  EncryptAndSetObjectToStorage(sessionStorage: UserSession) {
    const jsonString = JSON.stringify(sessionStorage);
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.secretKey).toString();
    this.sessionStorageService.store('session', encrypted);
  }

  getDecryptObjectFromStorage() {
    const userSession = this.sessionStorageService.retrieve('session');
    const decrypted = CryptoJS.AES.decrypt(userSession, this.secretKey).toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decrypted);
    return decryptedObject
  }

  encryptPageId(pageId: string) {
    const encrypted = CryptoJS.AES.encrypt(pageId, this.secretKey).toString();
    return encrypted
  }
  decryptPageId(encryptedPageId: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedPageId, this.secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted
  }
}
