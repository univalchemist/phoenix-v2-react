import React, { useState } from 'react'

import { AdminSurveyContextProvider } from '@/contexts'
import { AdminAppLayout } from '@/layout'
import Header from './components/header/header'
import SurveysList from './components/surveys-list/surveys-list'
import './surveys.scss'

export const AdminSurveysPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')

  return (
    <AdminSurveyContextProvider>
      <AdminAppLayout
        className="surveys-content admin"
        headerEl={<Header onSearch={setSearch} />}
      >
        <SurveysList search={search} />
      </AdminAppLayout>
    </AdminSurveyContextProvider>
  )
}

export default AdminSurveysPage
