'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { Features } from '#components/features'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Hero } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import { ChakraLogo, NextjsLogo } from '#components/logos'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Pricing } from '#components/pricing/pricing'
import { Testimonial, Testimonials } from '#components/testimonials'
import { Em } from '#components/typography'
import faq from '#data/faq'
import pricing from '#data/pricing'
import testimonials from '#data/testimonials'

export const metadata: Metadata = {
  title: 'HSWLP',
  description: 'White-label SaaS hosting viszonteladóknak',
}


const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />

      <HighlightsSection />

      <FeaturesSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Indítsa el saját
                <Br /> SaaS szolgáltatását
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                A HSWLP white-label hostinget, domainkezelést és statikus oldal
                generálást biztosít. Fejlett ügyfélmenedzsmenttel segítjük Önt.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
                <NextjsLogo height="28px" /> <ChakraLogo height="20px" />
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink
                  colorScheme="primary"
                  size="lg"
                  href="https://hswlp.csumpinet.hu/"
                >
                  Regisztráció
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="https://demo.saas-ui.dev"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  Demó megtekintése
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/list.png"
                  width={1200}
                  height={762}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: 'Saját márkanév',
            icon: FiSmile,
            description: 'Teljesen testreszabható felület.',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: 'Domain kezelés',
            icon: FiSliders,
            description: 'Egyszerűen regisztrálhat és kezelhet domaineket.',
            iconPosition: 'left',
            delay: 0.8,
          },
          {
            title: 'Statikus oldalak',
            icon: FiGrid,
            description: 'Automatikus generálás és hosztolás.',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Ügyfélkezelés',
            icon: FiThumbsUp,
            description: 'Fejlett admin felületek és integrációk.',
            iconPosition: 'left',
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard('yarn add @saas-ui/react')

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Gyors indulás">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Pár kattintással elindíthatja saját márkás SaaS szolgáltatását. A
            HSWLP automatikusan kezeli a domaineket és a statikus oldalak
            publikálását.
          </Text>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Biztonságos alapok">
        <Text color="muted" fontSize="lg">
          Modern infrastruktúrára építünk, hogy Ön az üzletre
          koncentrálhasson.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        “Saas UI helped us set up a beautiful modern UI in no time. It saved us
        hundreds of hours in development time and allowed us to focus on
        business logic for our specific use-case from the start.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Minden egy helyen"
      >
        <Text color="muted" fontSize="lg">
          A HSWLP integrált ügyfélkezelést és skálázható hostingot nyújt az Ön
          vállalkozásának.
        </Text>
      </HighlightsItem>
    </Highlights>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Teljes megoldás
          <Br /> SaaS szolgáltatásokhoz
        </Heading>
      }
      description={
        <>
          A HSWLP minden eszközt biztosít a saját márkás szolgáltatás
          indításához.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: 'Automatikus deploy',
          icon: FiBox,
          description: 'A statikus oldalakat és alkalmazásokat automatikusan publikáljuk.',
          variant: 'inline',
        },
        {
          title: 'API integrációk',
          icon: FiLock,
          description: 'Könnyed kapcsolódás saját rendszereihez.',
          variant: 'inline',
        },
        {
          title: 'Rugalmas csomagok',
          icon: FiSearch,
          description: 'Válassza ki az Önnek megfelelő előfizetési szintet.',
          variant: 'inline',
        },
        {
          title: 'Személyre szabható felület',
          icon: FiUserPlus,
          description: 'Saját márkáját helyezheti el minden oldalon.',
          variant: 'inline',
        },
        {
          title: 'Valósidejű statisztikák',
          icon: FiFlag,
          description: 'Kövesse nyomon szolgáltatásai teljesítményét.',
          variant: 'inline',
        },
        {
          title: 'Professzionális támogatás',
          icon: FiTrendingUp,
          description: 'Csapatunk segít a bevezetésben és az üzemeltetésben.',
          variant: 'inline',
        },
      ]}
    />
  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)

        return columns
      },
      [[], [], []],
    )
  }, [])

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  )
}

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default Home
