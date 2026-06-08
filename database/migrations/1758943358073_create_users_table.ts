import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').notNullable() // Nom complet de la personne
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', ['student', 'teacher', 'director']).notNullable() // Le rôle !

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}