import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import EmailValidator from 'email-validator';
import { AuthForm } from '../../auth/signup';
import { User } from '@models';
import connectDB from 'middleware/mongodb';

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { email, password, username, repeatPassword }: AuthForm = req.body;

      if (!EmailValidator.validate(email)) {
        return res.status(400).json({ message: 'Некорретный email', status: 'warning' });
      }

      if (password !== repeatPassword) {
        return res.status(400).json({ message: 'Пароли не совпадают', status: 'warning' });
      }

      const userExist = await User.exists({ email });
      if (userExist) {
        return res.status(422).json({ message: 'Профиль уже существует', status: 'warning' });
      }

      const hashedPassword = hashPassword(password);

      const newUser = { email, username, password: hashedPassword };

      await User.create(newUser);

      res.status(201).json({ message: 'Профиль успешно создан', status: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }
};

export default connectDB(handler);
