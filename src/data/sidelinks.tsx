import {
  IconChecklist,
  IconLayoutDashboard,
  IconSettings,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Inspections',
    label: '3',
    href: '/inspections',
    icon: <IconChecklist size={18} />,
  },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: 'Reports',
  //   label: '',
  //   href: '/reports',
  //   icon: <IconReport size={18} />,
  // },
  // {
  //   title: 'Missions',
  //   label: '',
  //   href: '/missions',
  //   icon: <IconShip size={18} />,
  // },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
