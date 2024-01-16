export const notFoundPath = '/404'
export const signInPath = '/sign-in'
export const homePath = '/home'
export const projectPlanPath = '/project-plan'
export const vectorZoomMainPath = '/vector-zoom'
export const vectorZoomPath = `${vectorZoomMainPath}/:id?`
export const surveysPath = '/surveys'
export const usersPath = '/users'
export const settingsPath = '/settings'

// Admin routes
export const adminPrefix = 'admin'
export const adminHomePath = `/${adminPrefix}/home`
export const adminCustomersPath = `/${adminPrefix}/customers`
export const adminProjectsPath = `/${adminPrefix}/projects`
export const adminSurveysPath = `/${adminPrefix}/surveys`
export const adminUsersPath = `/${adminPrefix}/users`
export const adminProjectTypesPath = `/${adminPrefix}/project-types`
export const adminVectorsPath = `/${adminPrefix}/vectors`
export const adminSettingsPath = `/${adminPrefix}/settings`
export const adminSingInPath = `/${adminPrefix}/sign-in`

export const publicPath: string[] = []

export const isActiveLink = (locationPath: string, path: string): boolean => {
  const _path = locationPath.split('/')

  return _path.includes(path)
}

export const generatePath = (
  path: string,
  params: { [x: string]: string | number | undefined | null } = {},
  queryData?: Record<string, string>[],
  fullUrl?: boolean,
): string => {
  let newPath: string = path
  Object.keys(params).forEach(param => {
    newPath = newPath.replace(`:${param}`, `${params[param] || ''}`)
  })

  if (queryData && queryData.length > 0) {
    const query = queryData
      .map(item => Object.keys(item)[0] + '=' + Object.values(item)[0])
      .join('&')
    newPath = newPath + '?' + query
  }

  if (fullUrl) {
    const baseUrl = `${window.location.protocol}//${window.location.host}`
    return `${baseUrl}${newPath}`
  }

  return newPath
}

export const generateUrl = (
  pathData: string[],
  queryData?: Record<string, string>[],
): string => {
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  let path = pathData.join('/')
  if (queryData && queryData.length > 0) {
    const query = queryData
      .map(item => Object.keys(item)[0] + '=' + Object.values(item)[0])
      .join('&')
    path = path + '?' + query
  }

  return `${baseUrl}/${path}`
}
