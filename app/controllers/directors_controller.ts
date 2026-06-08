import type { HttpContext } from '@adonisjs/core/http'
import Attendance from '#models/attendance'

export default class DirectorsController {
  // C'est cette méthode "index" que la route réclame !
  async index({ view }: HttpContext) {
    // On récupère toutes les présences et on charge les relations associées
    const attendances = await Attendance.query()
      .preload('student')
      .preload('teacher')
      .preload('course')
      .orderBy('createdAt', 'desc')

    // On renvoie la vue avec les données
    return view.render('pages/director', { attendances })
  }
}