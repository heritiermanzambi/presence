import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'students.index': { paramsTuple?: []; params?: {} }
    'teachers.index': { paramsTuple?: []; params?: {} }
    'teachers.store': { paramsTuple?: []; params?: {} }
    'directors.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'students.index': { paramsTuple?: []; params?: {} }
    'teachers.index': { paramsTuple?: []; params?: {} }
    'directors.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'students.index': { paramsTuple?: []; params?: {} }
    'teachers.index': { paramsTuple?: []; params?: {} }
    'directors.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'teachers.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}