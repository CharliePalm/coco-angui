import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Amplify } from 'aws-amplify';
import * as Auth from 'aws-amplify/auth';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthed: BehaviorSubject<boolean>;
  public isResetting: BehaviorSubject<boolean>;
  public oldPassword?: string;
  public userId?: string;
  private token?: string;
  
  constructor(
    private router: Router,
    private toastService: ToastService,
  ) {
    if (!environment.local) {
      Amplify.configure({
        Auth: { Cognito: environment.cognito as any },
      });
    } else {
      this.token = 'token';
    }
    this.isAuthed = new BehaviorSubject<boolean>(false);
    this.isResetting = new BehaviorSubject<boolean>(false);
  }

  public async signIn(email: string, password: string): Promise<any> {
    try {
      const result = await Auth.signIn({ username: email, password });
      console.log(result);
      if (['RESET_PASSWORD', 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'].includes(result.nextStep.signInStep)) {
        this.isResetting.next(true);
        await this.router.navigate(['/resetPassword']);
      } else {
        await this.getCurrentUser();
        await this.router.navigate(['/home']);
      }
    } catch (e) {
      console.log(e);
      this.toastService.show('Incorrect username or password', 'error');
      this.isAuthed.next(false);
    }
  }

  public async firstTimePassword(newPassword: string): Promise<any> {
    await Auth.confirmSignIn({ challengeResponse: newPassword });
    this.isResetting.next(false);
  }

  public async signOut(): Promise<any> {
    await Auth.signOut();
    this.isAuthed.next(false);
    this.router.navigate(['/login']);
  }

  public async getCurrentUser(): Promise<Auth.GetCurrentUserOutput | null> {
    try {
      const authResponse = !environment.local ? await Auth.getCurrentUser() : { userId: 'userId' } as any;
      this.userId = authResponse.userId;
      this.isAuthed.next(!!this.userId);
      return authResponse;
    } catch {
      return null;
    }
  }

  public getToken(): Observable<string | undefined> {
    return !this.token ? from(Auth.fetchAuthSession().then((v) => v?.tokens?.idToken?.toString())) : of(this.token);
  }
}