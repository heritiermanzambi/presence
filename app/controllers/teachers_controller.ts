import type { HttpContext } from '@adonisjs/core/http'
import Course from '#models/course'
import Attendance from '#models/attendance'
import User from '#models/user'

export default class TeachersController {
  // 1. Afficher la page du prof avec la liste des cours
  async index({ view }: HttpContext) {
    const courses = await Course.all()
    return view.render('pages/teacher', { courses })
  }

  // 2. Enregistrer la présence envoyée par le scanner
  async store({ request, response }: HttpContext) {
    const { studentName, courseId } = request.only(['studentName', 'courseId'])

    if (!studentName || !courseId) {
      return response.badRequest({ error: 'Données manquantes' })
    }

    // On cherche l'étudiant par son nom dans la base Neon
    let student = await User.query().where('fullName', studentName).where('role', 'student').first()

    // Si l'étudiant n'existe pas encore dans la base, on le crée automatiquement pour le test !
    if (!student) {
      student = await User.create({
        fullName: studentName,
        email: `${studentName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        role: 'student'
      })
    }

    // Par défaut, on attribue ce scan au Professeur Ndonda (ID 3 créé par notre seeder)
    const teacherId = 3 

    // On enregistre la présence dans la base Neon
    const attendance = await Attendance.create({
      studentId: student.id,
      teacherId: teacherId,
      courseId: Number(courseId),
    })

    return response.ok({ 
      success: true, 
      message: `Présence validée pour ${studentName} !`,
      attendance 
    })
  }
}