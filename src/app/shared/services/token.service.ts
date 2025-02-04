import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import totp from 'totp-generator';
const TOTP_TOKEN = environment.totpToken;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  /**
   * It uses totp and generate a valid string token
   * @returns string
   */
  /* istanbul ignore file */
  generateToken(): string {
    const otp = totp(TOTP_TOKEN);
    return otp;
  }
}
