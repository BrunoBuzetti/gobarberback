"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(request, response) {
    console.log(request.file);

    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(user)); // const userWithoutPassword = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   avatar: user.avatar,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };
    // // es lo mismo que delete user.password,
    // return response.json(userWithoutPassword);
  }

}

exports.default = UserAvatarController;