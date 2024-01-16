import React, { useCallback, useState } from 'react'

import { AdminProjectContextProvider } from '@/contexts'
import { AdminAppLayout } from '@/layout'
import { IProject, IProjectForm } from '@/types'
import Header from './components/header/header'
import ProjectsList from './components/projects-list/projects-list'
import ProjectDetail from './components/project-detail/project-detail'
import ProjectForm from './components/project-form/project-form'
import './projects.scss'

export const AdminProjectsPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [project, setProject] = useState<IProject | undefined>()
  const [modal, setModal] = useState<'detail' | 'form' | null>(null)

  const onSave = useCallback((_data: IProjectForm, _id?: string) => {
    console.log({ _data, _id })
  }, [])

  const onClose = useCallback(() => {
    setModal(null)
    setTimeout(() => {
      setProject(undefined)
    }, 500)
  }, [])

  return (
    <AdminProjectContextProvider>
      <AdminAppLayout
        className="projects-content admin"
        headerEl={
          <Header onSearch={setSearch} onAddNew={() => setModal('form')} />
        }
      >
        <ProjectsList
          search={search}
          onEdit={p => {
            setProject(p)
            setModal('form')
          }}
          onSelect={p => {
            setProject(p)
            setModal('detail')
          }}
        />
        <ProjectDetail
          isOpen={modal === 'detail'}
          project={project}
          onClose={() => setProject(undefined)}
        />
        <ProjectForm
          isOpen={modal === 'form'}
          data={project}
          onSave={onSave}
          onClose={onClose}
        />
      </AdminAppLayout>
    </AdminProjectContextProvider>
  )
}

export default AdminProjectsPage
