import { AuthData } from '~/types/auth';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  authData: AuthData;
  slogan: String;
  gamertag: String;
  avatar: String;
}
