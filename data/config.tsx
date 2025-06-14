import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'HSWLP',
    description: 'White-label SaaS hosting viszonteladóknak',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Funkciók',
      },
      {
        id: 'pricing',
        label: 'Árazás',
      },
      {
        id: 'faq',
        label: 'GYIK',
      },
      {
        label: 'Bejelentkezés',
        href: '/login',
      },
      {
        label: 'Regisztráció',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>Készítette a HSWLP csapat</>
    ),
    links: [
      {
        href: 'mailto:info@hswlp.hu',
        label: 'Kapcsolat',
      },
      {
        href: 'https://twitter.com/saas_js',
        label: <FaTwitter size="14" />,
      },
      {
        href: 'https://github.com/saas-js/saas-ui',
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: 'Kezdje el a HSWLP használatát',
    features: [
      {
        icon: FiCheck,
        title: 'Saját márkanév',
        description: 'Teljesen személyre szabható felület.',
      },
      {
        icon: FiCheck,
        title: 'Domain regisztráció',
        description: 'Könnyedén kezelheti ügyfelei domaineit.',
      },
      {
        icon: FiCheck,
        title: 'Statikus oldal generálás',
        description: 'Automatikus build és hosztolás.',
      },
      {
        icon: FiCheck,
        title: 'Ügyfélmenedzsment',
        description: 'Fejlett eszközök felhasználói kiszolgálásához.',
      },
    ],
  },
}

export default siteConfig
