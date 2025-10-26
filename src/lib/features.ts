import type { Feature } from '../types'

import easy from '../assets/easy.svg?raw'
import tracking from '../assets/tracking.svg?raw'
import dashboard from '../assets/dashboard.svg?raw'
import framework from '../assets/framework.svg?raw'

export const features: Feature[] = [
  {
    id: 1,
    title: 'Easy Ticket Creation',
    description:
      'Log new issues or requests in seconds with our intuitive form and instant validation.',
    image: easy,
  },
  {
    id: 2,
    title: 'Real-Time Status Tracking',
    description:
      'Stay updated as tickets move from Open to In Progress to Closed effortlessly.',
    image: tracking,
  },
  {
    id: 3,
    title: 'Powerful Dashboard',
    description:
      'Monitor total, open, and resolved tickets in a clean and interactive dashboard view.',
    image: dashboard,
  },
  {
    id: 4,
    title: 'Multi-Framework',
    description:
      'Explore our versatile ticketing system in React, Vue, and Twig versions.',
    image: framework,
  },
]