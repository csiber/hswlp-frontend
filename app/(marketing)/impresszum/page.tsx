import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'

export default function ImpresszumPage() {
  return (
    <>
      <Head>
        <title>Impresszum - HSWLP</title>
        <meta name="description" content="Cégadatok és jogi információk" />
      </Head>
      <Container maxW="container.md" py="16">
        <Stack spacing="2">
          <Heading as="h1" size="lg" mb="4">
            Impresszum
          </Heading>
          <Text>PromNET - Polyák Csaba E.V.</Text>
          <Text>4324 Kállósemjén, Kölcsey Ferenc út 11</Text>
          <Text>Adószám: 68747961-1-35</Text>
          <Text>Nyilvántartási szám: 52193909</Text>
          <Text>Telefon: +36 20 549 4107</Text>
          <Text>
            Email:{' '}
            <a href="mailto:info@promnet.hu" className="text-primary-500">
              info@promnet.hu
            </a>
          </Text>
        </Stack>
      </Container>
    </>
  )
}
