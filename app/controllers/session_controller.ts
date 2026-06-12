import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    
    // user.password est maintenant parfaitement reconnu par TypeScript !
    if (!user || !(await hash.verify(user.password, password))) {
      session.flash('errors', 'Identifiants invalides')
      return response.redirect().toPath('/') 
    }

    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }

  async destroy({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toPath('/')
  }
}