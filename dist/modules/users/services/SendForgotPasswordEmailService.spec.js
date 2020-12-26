"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeMailProvider;
let sendForgotPasswordEmailService;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    sendForgotPasswordEmailService = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeUserTokensRepository, fakeMailProvider);
  });
  it('should be able to recover password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@email.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover password for a non-existing user', async () => {
    await expect(sendForgotPasswordEmailService.execute({
      email: 'johndoe@email.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });
    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@email.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});