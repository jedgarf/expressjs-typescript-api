import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePasswords = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    const match: boolean = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
