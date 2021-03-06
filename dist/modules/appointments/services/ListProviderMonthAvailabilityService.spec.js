"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderMonthAvailability;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 9, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 11, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 12, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 13, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 15, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 16, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 20, 17, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 22, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 23, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_user_id: 'user',
      user_id: 'user',
      date: new Date(2020, 11, 24, 10, 0, 0)
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_user_id: 'user',
      year: 2020,
      month: 12
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 20,
      available: false
    }, {
      day: 23,
      available: true
    }, {
      day: 24,
      available: true
    }]));
  });
});