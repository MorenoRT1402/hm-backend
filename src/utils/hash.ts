import bcrypt from 'bcrypt';

export const compare = async (roughPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(roughPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error('Error al comparar:', err);
    return false;
  }
}