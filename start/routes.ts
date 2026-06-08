import router from '@adonisjs/core/services/router'

// 1. Les imports dynamiques de tes contrôleurs
const StudentsController = () => import('#controllers/students_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const DirectorsController = () => import('#controllers/directors_controller')

// 2. Ta route d'accueil corrigée (elle affiche la page de sélection)
router.get('/', ({ view }) => {
  return view.render('pages/index')
})

// 3. Les autres routes de ton application
router.get('/student', [StudentsController, 'index'])
router.get('/teacher', [TeachersController, 'index'])
router.post('/api/attendance', [TeachersController, 'store'])
router.get('/director', [DirectorsController, 'index'])