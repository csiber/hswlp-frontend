import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Árazás',
  description: 'Válassza ki az Önnek megfelelő csomagot.',
  plans: [
    {
      id: 'basic',
      title: 'Alap',
      description: 'Belépő szint kisebb szolgáltatásokhoz.',
      price: 'Ingyenes',
      features: [
        { title: 'Saját márkanév' },
        { title: 'Statikus oldalak' },
        { title: 'Alap ügyfélkezelő' },
      ],
      action: { href: '#' },
    },
    {
      id: 'pro',
      title: 'Pro',
      description: 'Fejlettebb funkciók és támogatás.',
      price: '9 990 Ft/hó',
      isRecommended: true,
      features: [
        { title: 'Domain regisztráció' },
        { title: 'Automatikus deploy' },
        { title: 'Korlátlan ügyfélfiók' },
      ],
      action: { href: '#' },
    },
    {
      id: 'enterprise',
      title: 'Vállalati',
      description: 'Személyre szabott megoldások nagyvállalatoknak.',
      price: 'Egyedi ajánlat',
      features: [
        { title: 'Dedikált támogatás' },
        { title: 'Integrációk API-val' },
        { title: 'Személyre szabott SLA' },
      ],
      action: { href: '#' },
    },
  ],
}
