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
                Ind\xEDtsa el saj\xE1t
                <Br /> SaaS szolg\xE1ltat\xE1s\xE1t
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                A HSWLP white-label hostinget, domainkezel\xE9st \xE9s statikus
                oldal gener\xE1l\xE1st biztos\xEDt.\x20
                Fejlett \xFCgyf\xE9lmenedzsmenttel seg\xEDtj\xFCk \xD6nt.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
                <NextjsLogo height="28px" /> <ChakraLogo height="20px" />
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Regisztr\xE1ci\xF3
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
                  Dem\xF3 megtekint\xE9se
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
            title: 'Saj\xE1t m\xE1rkan\xE9v',
            icon: FiSmile,
            description: 'Teljesen testreszabhat\xF3 fel\xFClet.',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: 'Domain kezel\xE9s',
            icon: FiSliders,
            description: 'Egyszer\xFBen regisztr\xE1lhat \xE9s kezelhet domaineket.',
            iconPosition: 'left',
            delay: 0.8,
          },
          {
            title: 'Statikus oldalak',
            icon: FiGrid,
            description: 'Automatikus gener\xE1l\xE1s \xE9s hosztol\xE1s.',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: '\xDCgyf\xE9lkezel\xE9s',
            icon: FiThumbsUp,
            description: 'Fejlett admin fel\xFCletek \xE9s integr\xE1ci\xF3k.',
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
            P\xE1r kattint\xE1ssal elind\xEDthatja saj\xE1t m\xE1rk\xE1s SaaS
            szolg\xE1ltat\xE1s\xE1t. A HSWLP automatikusan kezeli a domaineket
            \xE9s a statikus oldalak publik\xE1l\xE1s\xE1t.
          </Text>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Biztons\xE1gos alapok">
        <Text color="muted" fontSize="lg">
          Modern infrastrukt\xFAr\xE1ra \xE9p\xEDt\xFCnk, hogy \xD6n az
          \xFCzletre koncentr\xE1lhasson.
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
          A HSWLP integr\xE1lt \xFCgyf\xE9lkezel\xE9st \xE9s sk\xE1l\xE1zhat\xF3
          hostingot ny\xFAjt az \xF6n v\xE1llalkoz\xE1s\xE1nak.
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
          Teljes megold\xE1s
          <Br /> SaaS szolg\xE1ltat\xE1sokhoz
        </Heading>
      }
      description={
        <>
          A HSWLP minden eszk\xF6zt biztos\xEDt a saj\xE1t m\xE1rk\xE1s
          szolg\xE1ltat\xE1s ind\xEDt\xE1s\xE1hoz.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: 'Automatikus deploy',
          icon: FiBox,
          description: 'A statikus oldalakat \xE9s alkalmaz\xE1sokat automatikusan publik\xE1ljuk.',
          variant: 'inline',
        },
        {
          title: 'API integr\xE1ci\xF3k',
          icon: FiLock,
          description: 'K\xF6nnyed kapcsol\xF3d\xE1s saj\xE1t rendszereihez.',
          variant: 'inline',
        },
        {
          title: 'Rugalmas csomagok',
          icon: FiSearch,
          description: 'V\xE1lassza ki az \xD6nnek megfelel\xF5 el\xF5fizet\xE9si szintet.',
          variant: 'inline',
        },
        {
          title: 'Szem\xE9lyre szabhat\xF3 fel\xFClet',
          icon: FiUserPlus,
          description: 'Saj\xE1t m\xE1rk\xE1j\xE1t helyezheti el minden oldalon.',
          variant: 'inline',
        },
        {
          title: 'Val\xF3sidej\xFB statisztik\xE1k',
          icon: FiFlag,
          description: 'K\xF6vesse nyomon szolg\xE1ltat\xE1sai teljes\xEDtm\xE9ny\xE9t.',
          variant: 'inline',
        },
        {
          title: 'Professzion\xE1lis t\xE1mogat\xE1s',
          icon: FiTrendingUp,
          description: 'Csapatunk seg\xEDt a bevezet\xE9sben \xE9s az \xFCzemeltet\xE9sben.',
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
