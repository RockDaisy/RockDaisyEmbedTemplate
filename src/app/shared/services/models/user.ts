export class User {
  Id: string;
  LoggedInUserRole: string;
  Username: string;
  PhoneNumber: string;
  FullName: string;
  FirstName: string;
  LastName: string;
  CustomField: string;
  Password: string;
  ClientType: number;
  SubscriptionExpiration: boolean;
  CardLastNumber: string;
  IsWindowsAuth: boolean;
  UserGroups: Array<number> = [];
  UserGroupCustomFields: Array<string> = [];

  DontShowInstructionsAgain: boolean;
  IsPlayer: boolean;
  IsSportsScienceManager: boolean;
  PlayerId: string;
  DisableAdvancedDesign: boolean;
  DebugModeEnabled: boolean;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
