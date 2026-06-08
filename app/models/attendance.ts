import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Course from './course.js'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare studentId: number

  @column()
  declare teacherId: number

  @column()
  declare courseId: number

  // Liaison vers l'étudiant
  @belongsTo(() => User, { foreignKey: 'studentId' })
  declare student: BelongsTo<typeof User>

  // Liaison vers le professeur
  @belongsTo(() => User, { foreignKey: 'teacherId' })
  declare teacher: BelongsTo<typeof User>

  // Liaison vers le cours
  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}