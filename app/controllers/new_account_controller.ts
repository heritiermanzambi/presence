import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class NewAccountController {
  async index({ view }: HttpContext) {
    return view.render('pages/index')
  }

  async store({ request, response, auth }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    
    const user = await User.create({
      fullName: data.fullName || '',
      email: data.email,
      password: data.password,
    })

    await auth.use('web').login(user)
    
    // Correction ici : on utilise toPath pour éviter le conflit de nom de route
    return response.redirect().toPath('/')
  }
}