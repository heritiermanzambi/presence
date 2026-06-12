import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class NewAccountController {
  async index({ view }: HttpContext) {
    return view.render('pages/index')
  }

  async store({ request, response, auth }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    
    // @ts-ignore
    const user = await User.create({
      fullName: data.fullName || '',
      email: data.email,
      password: data.password,
    })

    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }
}