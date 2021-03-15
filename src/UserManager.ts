import Oidc from 'oidc-client';

export class UserManager {

  constructor(private oidcManager: Oidc.UserManager) { }

  public init(oidcManager: Oidc.UserManager) {
    this.oidcManager = oidcManager;
  }

  public async getUserId(): Promise<string | null> {
    const user = await this.oidcManager.getUser();
    if (!user) {
      return null;
    }
    return user.profile.sub;
  }

  public signin(): Promise<any> {
    return this.oidcManager.signinRedirect();
  }

  public signInSilent(): Promise<any> {
    return this.oidcManager.signinSilent();
  }

  public signout(): Promise<any> {
    return this.oidcManager.signoutRedirect();
  }

  public async signedIn(): Promise<boolean> {
    const user = await this.oidcManager.getUser();
    return user != null;
  }

  public async accessToken(): Promise<string | null> {
    const user = await this.oidcManager.getUser();
    if (!user) {
      return null;
    }
    localStorage.setItem('accessToken', user.access_token);
    return user.access_token;
  }

  public async getUserRoles(): Promise<any> {
    const user = await this.oidcManager.getUser();
    if (!user) {
      return null;
    }
    return user.profile.role;
  }

  public checkITLabClaim(claim: string): boolean | null {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload || !payload.itlab) {
      return false;
    }

    (payload.itlab as string[]).find((_claim) => _claim === claim);

    return !!(payload.itlab as string[]).find((_claim) => _claim === claim);
  }

  public async userHasRole(userRoleName: string): Promise<boolean | null> {
    const user = await this.oidcManager.getUser();
    if (!user) {
      return null;
    }
    if (!user.profile.role) {
      return null;
    }
    return user.profile.role.includes(userRoleName);
  }
}
