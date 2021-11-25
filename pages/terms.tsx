import { Container, Heading, Text, VStack } from '@chakra-ui/layout';
import Head from 'next/head';

export default function Terms(): JSX.Element {

  return (
    <>
      <Head>
        <title>Terms & Conditions</title>
      </Head>
      <Container maxWidth="container.lg" py="12">
        <Heading as="h2" mb="8" color="brand">
          Terms & Conditions
        </Heading>

        <VStack spacing="4" alignItems="flex-start">
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              Defined words
            </Heading>
            <Text as="p">
              Hello
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              These Terms are Binding
            </Heading>
            <Text as="p">
              Please read these Terms carefully and make sure that you
              understand them before using the Website including to use any
              Services. If you do not understand any of these Terms you can ask
              us to explain them further using the email address given above.
              Your use of the Website indicates your unconditional agreement
              that you accept and agree to be bound by the Terms in effect at
              the time of usage. We may alter all or any part of these Terms
              (including the Services which are available from the Website) at
              any time. If you do not accept the Terms, you should not use the
              Website. You should review these Terms regularly as your continued
              use of the Website means you accept the Terms as modified. Please
              understand that if you refuse to accept the Terms, you will not be
              able to use any services from the Website.
            </Text>
            <Text as="p">
              These Terms were last updated on: 2nd of May 2021
            </Text>
            <Text as="p">
              You should print a copy of these Terms for future reference.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              1 GENERAL
            </Heading>
            <Text as="p">
              1.1 The Services available via the Website may include the
              following as well as others:
            </Text>
            <Text as="p">
              1.2 We specialise in the Passenger Locator Form Measures. The
              information provided is based on publicly available information,
              our interpretation and experience concerning the Passenger Locator
              Form Measures. Every effort is made to provide current and
              up-to-date information. However, we cannot warrant the
              information. We provide the text on this website for information
              purposes and offers a submission service for a fee. The visitor
              relies on the information provided at their own risk. If you have
              any questions about the content of our website, please feel free
              to contact us.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}