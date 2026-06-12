import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // 1. Trouver l'utilisateur par son email
    const user = await User.findBy('email', email)
    
    // 2. Vérifier si le mot de passe correspond
    if (!user || !(await hash.verify(user.password, password))) {
      session.flash('errors', 'Identifiants invalides')
      return response.redirect().toPath('/') // Redirige vers l'accueil
    }

    // 3. Connecter l'utilisateur
    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }

  async destroy({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toPath('/')
  }
}