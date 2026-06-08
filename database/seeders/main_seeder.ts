import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Course from '#models/course'

export default class extends BaseSeeder {
  async run() {
    // 1. Création des utilisateurs de test
    await User.createMany([
      { fullName: 'Christian Kabeya', email: 'christian@student.com', role: 'student' },
      { fullName: 'Sarah Mwamba', email: 'sarah@student.com', role: 'student' },
      { fullName: 'Professeur Ndonda', email: 'ndonda@teacher.com', role: 'teacher' },
      { fullName: 'Directeur Malasi', email: 'malasi@director.com', role: 'director' },
    ])

    // 2. Création de quelques cours
    await Course.createMany([
      { name: 'Développement Mobile avec React Native' },
      { name: 'Architecture Web avec AdonisJS' },
    ])
  }
}