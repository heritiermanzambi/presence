import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import Attendance from './attendance.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'student' | 'teacher' | 'director'

  @hasMany(() => Attendance, { foreignKey: 'studentId' })
  declare studentAttendances: HasMany<typeof Attendance>

  @hasMany(() => Attendance, { foreignKey: 'teacherId' })
  declare teacherAttendances: HasMany<typeof Attendance>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}