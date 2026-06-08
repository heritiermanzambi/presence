 import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {

    async index({ view }: HttpContext) {
    return view.render('pages/student')
  }
}