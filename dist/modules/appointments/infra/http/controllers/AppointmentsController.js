"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { parseISO } from 'date-fns';
class AppointmentsController {
  async create(request, response) {
    const user_id = request.user.id;
    const {
      provider_user_id,
      date
    } = request.body; // const parsedDate = parseISO(date);

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      provider_user_id,
      user_id,
      date
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;