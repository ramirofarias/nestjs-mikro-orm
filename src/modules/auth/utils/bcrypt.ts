import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const SALT = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, SALT);
}

export function passwordIsCorrect(password: string, encryptedPassword: string) {
  return bcrypt.compareSync(password, encryptedPassword);
}
