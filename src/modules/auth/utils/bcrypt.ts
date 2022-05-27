import * as bcrypt from 'bcrypt';

export function hash(password: string) {
  const SALT = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, SALT);
}

export function inputMatchesEncryption(
  string: string,
  encryptedString: string,
) {
  return bcrypt.compareSync(string, encryptedString);
}
