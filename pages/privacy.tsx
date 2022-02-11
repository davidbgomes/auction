import { Container, Heading, Text, VStack } from "@chakra-ui/layout";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function Privacy(): JSX.Element {
  return (
    <>
      <Head>
        <title>Política de Privacidade</title>
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
        <Heading as="h2" mb="8" color="brand">
          Política de Privacidade
        </Heading>
        <VStack spacing="4" alignItems="flex-start" mb="8">
          <Text as="p">
            A sua privacidade é importante para nós. Aqui fazemos referência a
            qualquer informação que nós ou serviços de terceiros possamos
            recolher no site.
          </Text>
          <Text as="p">
            A Leiloou.pt não pede nem retem quaisquer dados pessoais dos nossos
            utilizadores. Quaisquer informação recolhida será meramente de
            serviços terceiros, e com dois fins:
          </Text>
          <UnorderedList listStylePos="inside" spacing="2">
            <ListItem>
              <span>
                Recolher métricas de utilização do site, através do Google
                Analytics;
              </span>
            </ListItem>
            <ListItem>
              <span>
                Mostrar anúncios relevantes para o utilizador, através do Google
                Adsense;
              </span>
            </ListItem>
          </UnorderedList>
          <Text as="p">
            Para mais informação, veja a nossa política de Cookies nesta página.
          </Text>
          <Text as="p">
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não controlamos o conteúdo e práticas
            desses sites e não podemos aceitar responsabilidade por suas
            respectivas políticas de privacidade.
          </Text>
          <Text as="p">
            O uso do nosso site será considerado como aceitação de nossas
            práticas em torno de privacidade e informações pessoais.
          </Text>
        </VStack>
        <VStack spacing="7" alignItems="flex-start">
          <VStack spacing="4" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              1. Política de Cookies
            </Heading>
            <Text as="p">
              <b>1.1</b> - Como é prática comum em quase todos os sites
              profissionais, este site usa cookies. Esta página descreve que
              informações eles recolhem e como as usamos.
            </Text>
            <Text as="p">
              <b>1.3</b> - Você pode impedir a configuração de cookies ajustando
              as configurações do seu navegador (consulte a Ajuda do navegador
              para saber como fazer isso). Esteja ciente de que a desativação de
              cookies afetará a funcionalidade deste site.
            </Text>
            <Text as="p">
              <b>1.4</b> - Vendedores terceiros, incluindo a Google, usam
              cookies para servir anúncios com base no histórico e perfil do
              utilizador, nomeadamente visitas anteriores a este ou a outros
              websites. O uso de cookies de publicidade por parte da Google,
              permite-nos e aos nossos parceiros exibir publicidade com base nas
              suas visitas a este ou outros websites na internet. Como
              utilizador, pode optar pela não permissão de utilização de
              anúncios personalizados visitando as{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://adssettings.google.com/authenticated"
              >
                definições de anúncios da Google
              </a>
              . (Alternativamente, pode somente não permitir a utilização de
              cookies de terceiros relativos a publicidade personalizada ao
              visitar{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.aboutads.info"
              >
                www.aboutads.info
              </a>
              )
            </Text>
            <Text as="p">
              <b>1.5</b> - Cookies que usamos:
            </Text>
            <Text as="p">
              Este site usa o Google Analytics, que é uma das soluções de
              análise mais difundidas e confiáveis da Web, para nos ajudar a
              entender como você utiliza o site e como podemos melhorar a sua
              experiência. Esses cookies podem gravar métricas de utilização,
              como por exemplo quanto tempo você navega no site e quais as
              páginas visitadas, para que possamos continuar a produzir conteúdo
              relevante para os nossos utilizadores.
            </Text>
            <Text as="p">
              Para mais informações sobre cookies do Google Analytics, consulte
              a página oficial do Google Analytics.
            </Text>
            <UnorderedList listStylePos="inside" spacing="4">
              <ListItem>
                <span>
                  As análises de terceiros são usadas para analisar e medir o
                  uso deste site, para que possamos continuar a produzir
                  conteúdo atrativo. Esses cookies podem rastrear itens como o
                  tempo que você passa no site ou as páginas visitadas, o que
                  nos ajuda a entender como podemos melhorar o site para você.
                </span>
              </ListItem>
              <ListItem>
                <span>
                  Periodicamente, testamos novos recursos e fazemos alterações
                  subtis na maneira como o site se apresenta. Quando ainda
                  estamos a testar novos recursos, esses cookies podem ser
                  usados para garantir que você receba uma experiência
                  consistente enquanto estiver no site, enquanto entendemos
                  quais otimizações os nossos usuários mais apreciam.
                </span>
              </ListItem>
              <ListItem>
                <span>
                  É importante entendermos as estatísticas sobre quantos
                  visitantes do nosso site realmente se interessam pelo seu
                  conteúdo e é esse o tipo de dados que esses cookies irão
                  recolher. Isso é importante para você, pois significa que
                  podemos fazer alterações e melhoria com precisão que nos
                  permitem, por exemplo, analizar os nossos custos de
                  publicidade e produtos para garantir o melhor serviço
                  possível.
                </span>
              </ListItem>
              <ListItem>
                <span>
                  O serviço Google AdSense, que usamos para mostrar publicidade,
                  usa um cookie DoubleClick para apresentar anúncios mais
                  relevantes em toda a Web e limitar o número de vezes que um
                  determinado anúncio é exibido para você. Para mais informações
                  sobre o Google AdSense, consulte as FAQs oficiais sobre
                  privacidade do Google AdSense.
                </span>
              </ListItem>
              <ListItem>
                <span>
                  Utilizamos anúncios para compensar os custos de funcionamento
                  deste site e fornecer financiamento para futuros
                  desenvolvimentos. Os cookies de publicidade comportamental
                  usados ​​por este site foram projetados para garantir que você
                  veja os anúncios mais relevantes sempre que possível,
                  analisando anonimamente os seus interesses e apresentando
                  anúncios de conteúdo semelhante que possam ser do seu
                  interesse.
                </span>
              </ListItem>
            </UnorderedList>
          </VStack>
          <VStack spacing="4" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              2. Compromisso do Utilizador
            </Heading>
            <Text as="p">
              <b>2.1</b> - O utilizador compromete-se a fazer uso adequado dos
              conteúdos e da informação que o oferece no site, e de cumprir esta
              Política de Privacidade. Caso não conconde com a mesma, não
              utilize o nosso site.
            </Text>
          </VStack>
          <VStack spacing="4" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              3. Mais informações
            </Heading>
            <Text as="p">
              <b>3.1</b> - Esperemos que esteja esclarecido e, como mencionado
              anteriormente, se houver algo que você não tem certeza se precisa
              ou não, geralmente é mais seguro deixar os cookies ativados, caso
              interaja com um dos recursos que você usa em nosso site.
            </Text>
          </VStack>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
