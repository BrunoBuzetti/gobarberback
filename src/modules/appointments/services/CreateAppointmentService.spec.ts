import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 10, 24, 11),
      provider_user_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_user_id).toBe('123456');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 10, 24, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_user_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create two appointment on the same time',
  //   () => {
  //     expect(1 + 2).toBe(3);
  //   });
});
