import { Beer }   from './beer';
import { User }   from './user';

export class Passport{
  id: number;
  name: string;
  beers: Beer[];
  customer: User;
}

export class PassportPost{
  passport: Passport;
}
