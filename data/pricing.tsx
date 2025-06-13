import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Csomagok',
  description: 'Válassz igényeid szerint',
  plans: [
    {
      id: 'start',
      title: 'Start',
      description: 'Alapcsomag induláshoz',
      price: '2 990 Ft/hó',
      features: [
        { title: '1 projekt' },
        { title: 'Korlátozott támogatás' },
      ],
      action: {
        href: 'https://app.hswlp.hu/register?plan=start',
        label: 'Regisztráció',
      },
    },
    {
      id: 'pro',
      title: 'Pro',
      description: 'Növekvő vállalkozásoknak',
      price: '5 990 Ft/hó',
      isRecommended: true,
      features: [
        { title: 'Korlátlan projekt' },
        { title: 'E-mail támogatás' },
      ],
      action: {
        href: 'https://app.hswlp.hu/register?plan=pro',
        label: 'Regisztráció',
      },
    },
    {
      id: 'reseller',
      title: 'Reseller',
      description: 'Viszonteladóknak',
      price: '14 990 Ft/hó',
      features: [
        { title: 'Saját márka' },
        { title: 'Prémium támogatás' },
      ],
      action: {
        href: 'https://app.hswlp.hu/register?plan=reseller',
        label: 'Regisztráció',
      },
    },
  ],
}
