import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(2020, 10, 24, 11),
      provider_user_id: '1234123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_user_id).toBe('1234123456');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_user_id: '1234123456',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_user_id: '1234123789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create two appointment on the same time',
  //   () => {
  //     expect(1 + 2).toBe(3);
  //   });
});
