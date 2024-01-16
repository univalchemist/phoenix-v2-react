import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import Logo from '@/assets/images/logo.svg'
import { t } from '@/i18n'
import { Avatar, Container, Icon, Text } from '@/components'
import {
  homePath,
  projectPlanPath,
  vectorZoomMainPath,
  surveysPath,
  usersPath,
  settingsPath,
  fullName,
} from '@/utils'
import { INavItem } from '@/types'
import { useAuth } from '@/hooks'

import './app-nav.scss'

const navItems: INavItem[] = [
  {
    id: 'home',
    label: t('sidebar.home'),
    icon: 'home',
    activeIcon: 'home-filled',
    action: homePath,
  },
  {
    id: 'project-plan',
    label: t('sidebar.projectPlan'),
    icon: 'ruler-pen',
    activeIcon: 'ruler-pen-filled',
    action: projectPlanPath,
  },
  {
    id: 'vector-zoom',
    label: t('sidebar.vectorZoom'),
    icon: 'layer',
    activeIcon: 'layer-filled',
    action: vectorZoomMainPath,
  },
  {
    id: 'surveys',
    label: t('sidebar.surveys'),
    icon: 'data-2',
    activeIcon: 'data-2-filled',
    action: surveysPath,
  },
  {
    id: 'users',
    label: t('sidebar.users'),
    icon: 'people',
    activeIcon: 'people-filled',
    action: usersPath,
  },
  {
    id: 'settings',
    label: t('sidebar.settings'),
    icon: 'setting',
    activeIcon: 'setting-filled',
    action: settingsPath,
  },
]

export const CustomerAppNav: React.FC = () => {
  const navigate = useNavigate()
  const { me } = useAuth()
  const pathname = window.location.pathname

  return (
    <Container col gap={8} className="navbar customer">
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
      </ul>
      <Container align="center" gap={8} className="user-account">
        <Avatar size={24} imageUrl={me?.profilePicture} />
        <Text ellipsis font="medium" className="user-name">
          {fullName(me?.firstName, me?.lastName)}
        </Text>
        <Icon name="chevron-down" />
      </Container>
    </Container>
  )
}

export default CustomerAppNav
