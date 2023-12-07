import { User } from 'src/modules/users/schemas/user.schema';

export class RequestWithUser extends Request {
  user: User;
}
