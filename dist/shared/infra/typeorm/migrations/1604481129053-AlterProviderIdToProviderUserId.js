"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterProviderIdToProviderUserId1604481129053 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_user_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProviderUser',
      columnNames: ['provider_user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: ''
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProviderUser');
    await queryRunner.dropColumn('appointments', 'provider_user_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'varchar'
    }));
  }

}

exports.default = AlterProviderIdToProviderUserId1604481129053;