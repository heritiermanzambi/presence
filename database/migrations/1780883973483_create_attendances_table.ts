import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attendances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      // Liaison avec l'étudiant
      table.integer('student_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // Liaison avec le professeur
      table.integer('teacher_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // Liaison avec le cours
      table.integer('course_id').unsigned().references('id').inTable('courses').onDelete('CASCADE')

      // Date et Heure automatique du scan
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}