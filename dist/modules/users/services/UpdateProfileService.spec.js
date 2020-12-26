"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      old_password: '123456',
      password: '123456'
    });
    expect(updatedUser.name).toBe('Jane Doe');
    expect(updatedUser.email).toBe('janedoe@email.com');
  });
  it('should not be able to update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Jane Doe',
      email: 'janedoe@email.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change email to an axisting one', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'johndoe@email.com',
      old_password: '123456',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      old_password: '123456',
      password: '987654'
    });
    expect(updatedUser.password).toBe('987654');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      password: '987654'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      old_password: 'wrong-old-password',
      password: '987654'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});