import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export const compare = async (roughPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(roughPassword, hashedPassword);
  } catch (err) {
    console.error('Error al comparar:', err);
    return false;
  }
}

export const hash = (password:string) => bcrypt.hashSync(password, SALT_ROUND);