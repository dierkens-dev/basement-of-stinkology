import AuthUser from './auth-user.interface';
import { JwtPayload } from './jwt-payload.interface';

export type Payload = JwtPayload & Pick<AuthUser, 'password' | 'username'>;
