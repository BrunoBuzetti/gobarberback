import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address aldready used.');
    }

    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
/*
Cuando não se necesita metodos especificos para a clase não precisa do repository
import {getRepository} from 'typeorm';

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    (...)
    return user;
  }
}

export default CreateUserService;

*/
