import * as CryptoJS from 'crypto-js';
import { APP_CONFIGS } from '../clients/configs';

export const crypto = {
  encrypt: (plaintext: string): string => {
    const key = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const iv = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const x = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const cy = {
      ciphertext: x.ciphertext,
      iv: x.iv,
      key: x.key,
      salt: x.salt,
    };
    const encrypted: string = btoa(JSON.stringify(cy));
    return encrypted;
  },

  encryptWithKey: (plaintext: string, salt: string): string => {
    const key = salt || '_';
    return CryptoJS.AES.encrypt(plaintext, key).toString();
  },

  encrypttx: (plaintext: string): string => {
    const key = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const iv = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const x = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // const cy: ICypher = { ciphertext: x.ciphertext, iv: x.iv, key: x.key, salt: x.salt };
    const translatedtojson: string = x.toString();
    return translatedtojson;
  },

  decryptx: (cypher: string): string => {
    const key = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const iv = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const decrypted = CryptoJS.AES.decrypt(cypher, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  decrypt: (cypher: string = ''): string => {
    const key = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421' || '_');
    const iv = CryptoJS.enc.Utf8.parse('48656c6c6f2c20576f726c6421'|| '_');
    try {
      const cy = JSON.parse(atob(cypher)!);
      const value: any = {
        ciphertext: cy.ciphertext!,
        iv: cy.iv!,
        salt: cy.salt!,
        key: cy.key!,
      };

      const decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return '';
    }
  },
};
