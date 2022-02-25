import { Container, Heading, Text, VStack } from "@chakra-ui/layout";
import Head from "next/head";

export default function Terms(): JSX.Element {
  return (
    <>
      <Head>
        <title>Termos & Condições</title>
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
        <VStack spacing="8" alignItems="flex-start" mb="8">
          <Heading as="h2" color="brand">
            Termos & Condições
          </Heading>
          <Text as="p">
            Ao utilizar o site Leiloou.pt, concorda em cumprir estes termos de
            serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é
            responsável pelo cumprimento de todas as leis locais aplicáveis. Se
            você não concordar com algum desses termos, está proibido de usar ou
            utilizar este site. Os materiais contidos neste site são protegidos
            pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </Text>
        </VStack>
        <VStack spacing="10" alignItems="flex-start">
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              Isenção de responsabilidade
            </Heading>
            <Text as="p">
              <b>1.1</b> - A utilização do Serviço implica o conhecimento e
              aceitação do disposto nas presentes Condições, bem como da
              Política de Privacidade do site.
            </Text>
            <Text as="p">
              <b>1.2</b> - O Leiloou existe com o intuito de facilitar a
              pesquisa de leilões eletrónicos de várias entidades certificadas,
              centralizando a informação que existe nos seus diversos sites,
              proporcionando assim ao utilizador uma escolha informada.
            </Text>
            <Text as="p">
              <b>1.3</b> - O Leiloou não responde por quaisquer perdas ou danos,
              diretos ou indiretos, sofridos por qualquer utilizador,
              relativamente à informação contida neste site.
            </Text>
            <Text as="p">
              <b>1.4</b> - O Leiloou não é responsável pela exatidão, qualidade,
              segurança, legalidade ou licitude, incluindo o cumprimento das
              regras respeitantes a direitos de autor e direitos conexos,
              relativamente aos conteúdos, produtos ou serviços contidos neste
              site que tenham sido fornecidos ou recolhidos, de forma direta ou
              indireta.
            </Text>
            <Text as="p">
              <b>1.5</b> - O Leiloou atua como um intermediário entre diversas
              entidades responsáveis pela execução e funcionamento de leilões
              eletrónicos, e o utilizador. Como tal, toda e qualquer
              resposabilidade sobre a informação dos bens listados e da correta
              execução e participação nos bens eletrónicos, deve ser feita com a
              entidade responsável.
            </Text>
            <Text as="p">
              <b>1.6</b> - Certifique-se junto de cada leiloeira eletrónica
              quais os seus termos de utilização e as leis de utilização de
              leilões eletrónicos. O Leiloou.pt exclui-se de responsabilidade
              que advenha de qualquer atividade realizada nos sites por nós
              listados.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>2.</b> Conteúdos do site
            </Heading>
            <Text as="p">
              <b>2.1</b> - O site anunciante é o único responsável pelos
              conteúdos disponibilizados. Assim, quaisquer informações, dados,
              preços, textos, fotografias, gráficos, vídeos, imagens ou outros
              materiais expostos no mesmo são da responsabilidade do anunciante
              e devem ser verificadas junto do mesmo antes de efetuarem uma
              licitação.
            </Text>
            <Text as="p">
              <b>2.2</b> - Qualquer dúvida em relação ao bem, seja ele um
              imóvel, veículo, equipamento, ou de qualquer outra natureza,
              somente o anunciante poderá responder, pois a responsabilidade de
              criação e cumprimento do leilão recai sobre ele, assim como o
              acesso a demais informação que possa ser importante na hora de
              licitação, por nós não recolhida.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>3.</b> Alterações ao Serviço
            </Heading>
            <Text as="p">
              <b>3.1</b> - O Leiloou.pt reserva o direito de, a qualquer
              momento, modificar, suspender, descontinuar temporária ou
              permanentemente o serviço prestado, com ou sem aviso prévio, sem
              que tal fato dê lugar a qualquer forma de compensação ao
              Utilizador ou a terceiros.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>4.</b> Direito de propriedade
            </Heading>
            <Text as="p">
              <b>4.1</b> - O Utilizador reconhece que qualquer conteúdo que
              conste na publicidade, destaque, promoção ou menção de qualquer
              patrocinador ou anunciante está protegido pelas leis relativas a
              direitos de autor e direitos conexos, e a direitos de propriedade
              industrial e outras leis de proteção de propriedade exceto quando,
              expressamente e por escrito, autorizado pela Leiloou.pt ou pelos
              anunciantes ou patrocinadores, o Utilizador não poderá nunca
              modificar, alugar, dar, doar, emprestar, vender, distribuir ou
              criar trabalhos cuja base criativa seja quer parcial quer
              completamente, o Serviço ou o software nele aplicado quer qualquer
              conteúdo constante nas áreas públicas do site.
            </Text>
            <Text as="p">
              <b>4.2</b> - O Utilizador concorda em não tentar aceder ao serviço
              de nenhuma forma que não através dos meios disponibilizados
              formalmente pelo serviço para o efeito.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>5.</b> Isenção de garantias
            </Heading>
            <Text as="p">
              <b>5.1</b> - O Utilizador compreende expressamente que: a
              utilização do serviço é feita por sua conta e risco, o serviço é
              fornecido como apresentado.
            </Text>
            <Text as="p">
              <b>5.2</b> - O Leiloou.pt não garante de forma nenhuma que o
              serviço seja fornecido de forma ininterrupta, ou que seja eterno,
              seguro ou sem erros, os resultados obtidos através do uso do
              serviço sejam corretos, verdadeiros, próprios ou confiáveis, a
              qualidade de qualquer produto, serviço, informação ou qualquer
              outro material comprado ou obtido através do serviço vá de
              encontro a quaisquer expectativas.
            </Text>
            <Text as="p">
              <b>5.3</b> - Nenhum conselho ou informação, quer oral quer
              escrita, obtida pelo Utilizador de ou através do Serviço criará
              qualquer garantia que não venha expressa nestas regras.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>6.</b> Limitação de Responsabilidade
            </Heading>
            <Text as="p">
              <b>6.1</b> - O Utilizador compreende e concorda que o Leiloou.pt
              não pode de forma nenhuma ser responsabilizado por qualquer dano,
              direto ou indireto, casual, acidental, incluindo, mas não limitado
              a, danos por perdas de lucros, dados, conteúdos, ou outras perdas
              (mesmo que tenha sido previamente avisado sobre a possibilidade da
              ocorrência desses danos), resultantes de:
            </Text>
            <Text as="p">
              <b>6.1.1</b> - Uso ou impossibilidade de uso do serviço;
            </Text>
            <Text as="p">
              <b>6.1.2</b> - O custo de obtenção de qualquer substituto de bens
              ou serviços alternativos ou complementares do serviço;
            </Text>
            <Text as="p">
              <b>6.1.3</b> - Acesso não autorizado a bases de dados pessoais do
              serviço;
            </Text>
            <Text as="p">
              <b>6.1.4</b> - Modificação não autorizada nas bases de dados do
              serviço.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>7.</b> Links
            </Heading>
            <Text as="p">
              <b>7.1</b> - O Leiloou.pt não analisou todos os sites vinculados
              ao seu site e não é responsável pelo conteúdo de nenhum site
              vinculado. A inclusão de qualquer link não implica endosso por
              Leiloou.pt do site. O uso de qualquer site vinculado é por conta e
              risco do usuário.
            </Text>
          </VStack>
          <VStack spacing="2" alignItems="flex-start">
            <Heading as="h3" fontSize="24">
              <b>8.</b> Lei aplicável
            </Heading>
            <Text as="p">
              <b>8.1</b> - A todas as questões não reguladas expressamente nas
              presentes Regras de Utilização aplicar-se-á a Lei Portuguesa.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}
