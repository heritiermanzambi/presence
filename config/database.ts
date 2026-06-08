import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'pg',

  prettyPrintDebugQueries: true,

  connections: {
    pg: {
      client: 'pg',
      // On reconstruit proprement l'URL de connexion attendue par le client pg brut
      connection: `postgres://${env.get('DB_USER')}:${env.get('DB_PASSWORD')}@${env.get('DB_HOST')}:${env.get('DB_PORT')}/${env.get('DB_DATABASE')}?sslmode=require`,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      debug: app.inDev,
    },
  },
})

export default dbConfig