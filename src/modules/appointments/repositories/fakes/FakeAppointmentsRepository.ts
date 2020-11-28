import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      // appointment => appointment.date === date,
      appointment => isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    provider_user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_user_id });
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_user_id = provider_user_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
