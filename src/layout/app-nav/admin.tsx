import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import Logo from '@/assets/images/logo.svg'
import { t } from '@/i18n'
import { Avatar, Container, Icon, Text } from '@/components'
import {
  fullName,
  adminProjectTypesPath,
  adminUsersPath,
  adminSurveysPath,
  adminProjectsPath,
  adminCustomersPath,
  adminHomePath,
  adminVectorsPath,
} from '@/utils'
import { INavItem } from '@/types'
import { useAdminAuth } from '@/hooks'
import { UserSettings } from '@/pages/admin/user-settings'

import './app-nav.scss'

const navItems: INavItem[] = [
  {
    id: 'home',
    label: t('sidebar.home'),
    icon: 'home',
    activeIcon: 'home-filled',
    action: adminHomePath,
  },
  {
    id: 'customers',
    label: t('sidebar.customers'),
    icon: 'user-octagon',
    activeIcon: 'user-octagon-filled',
    action: adminCustomersPath,
  },
  {
    id: 'projects',
    label: t('sidebar.projects'),
    icon: 'user-circle',
    activeIcon: 'user-circle-filled',
    action: adminProjectsPath,
  },
  {
    id: 'surveys',
    label: t('sidebar.surveys'),
    icon: 'task',
    activeIcon: 'task-filled',
    action: adminSurveysPath,
  },
  {
    id: 'users',
    label: t('sidebar.users'),
    icon: 'people',
    activeIcon: 'people-filled',
    action: adminUsersPath,
  },
  {
    id: 'project-types',
    label: t('sidebar.projectTypes'),
    icon: 'ruler-pen',
    activeIcon: 'ruler-pen-filled',
    action: adminProjectTypesPath,
  },
  {
    id: 'vectors',
    label: t('sidebar.vectors'),
    icon: 'layer',
    activeIcon: 'layer-filled',
    action: adminVectorsPath,
  },
]

const navSecondaryItems: INavItem[] = [
  {
    id: 'settings',
    label: t('sidebar.settings'),
    icon: 'setting',
    activeIcon: 'setting-filled',
  },
]

export const AdminAppNav: React.FC = () => {
  const navigate = useNavigate()
  const { me } = useAdminAuth()
  const pathname = window.location.pathname
  const [showSettings, setShowSettings] = useState<boolean>(false)

  return (
    <Container col gap={8} className="navbar admin">
      <span className="app-logo">
        <Logo />
      </span>
      <ul>
        {navItems.map(item => (
          <li
            key={item.id}
            onClick={() => (item.action ? navigate(item.action) : null)}
            className={pathname.startsWith(item.action || '') ? 'active' : ''}
          >
            <NavLink
              to={item.action || ''}
              onClick={e => {
                e.preventDefault()
              }}
            >
              <Icon
                name={
                  pathname.startsWith(item.action || '')
                    ? item.activeIcon
                    : item.icon
                }
              />
              {item.label}
            </NavLink>
          </li>
        ))}
        <li className="nav-divider" />
        {navSecondaryItems.map(item => (
          <li
            key={item.id}
            onClick={() => (item.action ? navigate(item.action) : null)}
            className={pathname.startsWith(item.action || '') ? 'active' : ''}
          >
            <NavLink
              to={item.action || ''}
              onClick={e => {
                e.preventDefault()
                if (item.id === 'settings') {
                  setShowSettings(true)
                }
              }}
            >
              <Icon
                name={
                  pathname.startsWith(item.action || '')
                    ? item.activeIcon
                    : item.icon
                }
              />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <Container align="center" gap={8} className="user-account">
        <Avatar size={24} imageUrl={me?.profilePicture} />
        <Text ellipsis font="medium" className="user-name">
          {fullName(me?.firstName, me?.lastName)}
        </Text>
        <Icon name="chevron-down" />
      </Container>
      {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}
    </Container>
  )
}

export default AdminAppNav
