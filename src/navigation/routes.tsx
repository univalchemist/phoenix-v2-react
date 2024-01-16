import React, { useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import {
  CustomerTokenWrapper,
  CustomerAuthWrapper,
  AdminTokenWrapper,
  AdminAuthWrapper,
} from '@/layout'
import {
  SignInPage,
  NotFoundPage,
  HomePage,
  VectorZoomPage,
  ProjectPlanPage,
  AdminHomePage,
  AdminCustomersPage,
  AdminProjectsPage,
  AdminSurveysPage,
  AdminUsersPage,
  ComingSoonPage,
} from '@/pages'

import {
  signInPath,
  notFoundPath,
  homePath,
  vectorZoomPath,
  projectPlanPath,
  adminSingInPath,
  adminHomePath,
  adminCustomersPath,
  adminProjectsPath,
  adminSurveysPath,
  adminUsersPath,
  adminProjectTypesPath,
  adminVectorsPath,
  adminSettingsPath,
  adminPrefix,
  surveysPath,
  usersPath,
  settingsPath,
} from '@/utils'

const AppRoutes: React.FC = () => {
  const onError = useCallback((e: Error) => {
    console.log({ appError: e })
  }, [])

  return (
    <ErrorBoundary onError={onError} fallback={<div />}>
      <Routes>
        <Route path={notFoundPath} element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to={homePath} />} />
        <Route
          path={`/${adminPrefix}`}
          element={<Navigate to={adminHomePath} />}
        />
        <Route element={<CustomerTokenWrapper />}>
          <Route path={signInPath} element={<SignInPage />} />
          <Route element={<CustomerAuthWrapper />}>
            <Route path={homePath} element={<HomePage />} />
            <Route path={vectorZoomPath} element={<VectorZoomPage />} />
            <Route path={projectPlanPath} element={<ProjectPlanPage />} />
            <Route path={surveysPath} element={<ComingSoonPage />} />
            <Route path={usersPath} element={<ComingSoonPage />} />
            <Route path={settingsPath} element={<ComingSoonPage />} />
          </Route>
        </Route>
        <Route element={<AdminTokenWrapper />}>
          <Route path={adminSingInPath} element={<SignInPage />} />
          <Route element={<AdminAuthWrapper />}>
            <Route path={adminHomePath} element={<AdminHomePage />} />
            <Route path={adminCustomersPath} element={<AdminCustomersPage />} />
            <Route path={adminProjectsPath} element={<AdminProjectsPage />} />
            <Route path={adminSurveysPath} element={<AdminSurveysPage />} />
            <Route path={adminUsersPath} element={<AdminUsersPage />} />
            <Route path={adminProjectTypesPath} element={<ComingSoonPage />} />
            <Route path={adminVectorsPath} element={<ComingSoonPage />} />
            <Route path={adminSettingsPath} element={<ComingSoonPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default AppRoutes
