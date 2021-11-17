import { AuthData } from '~/types/auth';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  authData: AuthData;
}
