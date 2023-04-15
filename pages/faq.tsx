import { Container, Heading, Text, VStack } from "@chakra-ui/layout";
import Head from "next/head";
import Link from "next/link";

export default function Terms(): JSX.Element {
  return (
    <>
      <Head>
        <title>Leiloou - FAQ&apos;s</title>
      </Head>
      <Container
        maxWidth="container.lg"
        pb="12"
        pt="5"
        mt="12"
        boxShadow={{ base: "inherit", md: "md" }}
        px={{ base: "5", md: "10" }}
        className="privacy-policy-container"
      >
        <VStack spacing={"14"} alignItems="flex-start">
          <Heading as="h2" color="brand">
            FAQ&apos;s
          </Heading>
          <VStack spacing="10" alignItems="flex-start">
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                1. O que é o Leiloou.pt?
              </Heading>
              <Text as="p">
                Leiloou.pt é um site de listagem de leilões eletrónicos em
                Portugal.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                2. São uma leiloeira?
              </Heading>
              <Text as="p">
                <b>Não</b>, somente listamos os vários leilões existentes das
                diversas leiloeiras certificadas. Não temos quaisquer afiliações
                a leiloeiras nem mediamos quaisquer leilões.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                3. Que tipo de leilões são listados?
              </Heading>
              <Text as="p">
                De momento somente listamos imóveis (apartamentos & moradias).
                Estamos em constante desenvolvimento, e esperamos em breve
                aumentar a lista de leilões de imóveis e listar leilões de
                outros bens.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                4. Posso listar um leilão no leiloou.pt?
              </Heading>
              <Text as="p">
                Não, somente listamos de entidades devidamente certificadas.
                Caso seja o caso, talvez no futuro iremos incluir os seus
                leilões.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                5. Porque não posso licitar a um leilão?
              </Heading>
              <Text as="p">
                Não mediamos nem temos qualquer envolvimento na realização do
                leilão, apenas listamos os diversos leilões e redirecionamos
                para a página do leilão eletrónico correspondente.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                6. Algo correu mal com um leilão que vi aqui, o que posso fazer?
              </Heading>
              <Text as="p">
                A leiloou.pt não tem qualquer responsabilidade em relação aos
                bens apresentados no site, nem com as licitações feitas. Antes
                de fazer uma licitação deve ler os termos e condições da
                respetiva leiloeira, e terá que tratar com eles quaisquer
                complicações ou litígios ocorrentes.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                7. Porque é que o leilão que vi não tinha a informação correta?
              </Heading>
              <Text as="p">
                É muito raro mas pode acontecer, como o leilão não é realizado
                por nós, apenas recolhemos a informação de leiloeiras, é
                possível que algum dado aqui mencionado estar temporariamente
                incorreto/desatualizado. Quando redirecionado, deverá confirmar
                todas as informações com a leiloeira antes de realizar alguma
                ação.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                8. Como é que funciona o leiloou.pt?
              </Heading>
              <Text as="p">
                Pode pensar no leiloou.pt como um motor de busca. Apesar de
                listarmos diversos leilões, não temos qualquer envolvimento nos
                mesmos. Somos uma forma simplificada e melhorada de aceder a
                leilões espalhados pela internet.
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                9. O site é gratuito?
              </Heading>
              <Text as="p">
                <b>Sim</b>, o site é 100% gratuito! Espalhe a palavra caso goste
                do site, será ótimo para nós :)
              </Text>
            </VStack>
            <VStack spacing="2" alignItems="flex-start">
              <Heading as="h3" fontSize="24">
                10. Posso fazer alguma recomendação ou dar algum feedback?
              </Heading>
              <Text as="p">
                Claro! Entre na página{" "}
                <Link href="/contact-us" passHref legacyBehavior>
                  <a>contacte-nos</a>
                </Link>{" "}
                e escreva a sua mensagem! Estamos sempre disponíveis para ouvir
                novas ideias e agradeçemos qualquer crítica construtiva.
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}
