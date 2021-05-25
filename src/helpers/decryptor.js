import crypto from 'crypto-browserify';

// const env = runtimeEnv();

const [algorithm, hex, iv, key, utf8] = [
  'aes-256-cbc',
  'hex',
  process.env.MY_IV,
  process.env.MY_SECRET_KEY,
  'utf-8',
];

console.log('iv, key', iv, key);

const decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, hex, utf8);
  decrypted += decipher.final(utf8);

  return decrypted;
};

const decryptUser = (user) => ({
  ...user,
  email: decrypt(user.email),
  username: decrypt(user.username),
});

export { decryptUser };
