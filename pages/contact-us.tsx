import { useState } from 'react'
import { Container, Heading, Text, VStack, Stack, Box } from "@chakra-ui/layout";
import { ListItem, UnorderedList, useToast, Image, Grid, GridItem, Button  } from "@chakra-ui/react";
import Head from "next/head";
import TextField from "@/components/fields/TextField";
import TextAreaField from "@/components/fields/TextAreaField";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const schema = yup.object({
  name: yup.string().required('Nome é um campo obrigatório'),
  email: yup.string().email('Por favor, introduza um email válido').required('Email é um campo obrigatório'),
  subject: yup.string().required('Assunto é um campo obrigatório'),
  message: yup.string().required('Mensagem é um campo obrigatório'),
});

export default function ContactUs() : JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const formMethods = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async(formData: FormInputs) => {
    console.log("formData", formData)
    setIsLoading(true)
    const data = {
      service_id: 'service_f229dwb',
      template_id: 'template_db6y157',
      user_id: 'user_jRsWYNJ8D5fEIyDRJxvwf',
      template_params: {
        ...formData
      }
    }
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(() => {
      setIsLoading(false)
      toast({
        title: `O Email foi enviado com sucesso`,
        status: "success",
        isClosable: true,
      })
    })
    .finally(() => reset({}))
    .catch(err => {
      setIsLoading(false)
      toast({
        title: `Houve um erro ao enviar o email. Por favor tente novamente.`,
        status: "error",
        isClosable: true,
      })
      console.log(err)
    })
  }

  return(
    <>
      <Head>
        <title>Leiloou - Contactos</title>
      </Head>
      <Container maxW="container.xl" my="12">
        <VStack spacing={{base:"10", md:"20"}}>
          <VStack>
            <Heading
              fontSize={{
                base: "2xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
              }}>Contacte-nos</Heading>
            <Heading fontSize={{base:"sm", md:"lg"}} fontWeight="light" textAlign={{base:"center", md:"initial"}} color="gray.500">Tem alguma dúvida? Quer dar um feedback ou sugestão?</Heading>
            <Heading fontSize={{base:"sm", md:"lg"}} fontWeight="light" textAlign={{base:"center", md:"initial"}} color="gray.500">Fale connosco usando o formulário abaixo ou diretamente em <b><a href="mailto:geral@leiloou.pt">geral@leiloou.pt</a></b></Heading>
          </VStack>
          <Grid templateColumns='repeat(5, 1fr)' gap={6} w="full" alignItems="center" justifyContent="center">
            <GridItem colSpan={{base:5, md:3}}>
              <Box borderWidth="1px" borderRadius="lg" boxShadow="lg" p="7">
                <FormProvider {...formMethods}>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <VStack w="full" spacing={4}>
                      <Stack direction={{base:"column", md:"row"}} spacing="2" w="full">
                        <TextField name="name" label="Nome:" />
                        <TextField name="email" label="Email:" type="email"/>
                      </Stack>
                      <TextField name="subject" label="Assunto:" />
                      <TextAreaField name="message" label="Mensagem:" height="200px"/>
                      <Box d="flex" w="full" justifyContent="flex-end">
                        <Button
                          type="submit"
                          size="md"
                          bg="#2697b1"
                          _hover={{ bg: "#2697b1a1", color: "white" }}
                          transition="0.3s ease-in-out"
                          color="white"
                          width="36"
                          isLoading={isLoading}
                        >
                          Enviar
                        </Button>
                      </Box>
                    </VStack>
                  </form>
                </FormProvider>
              </Box>
            </GridItem>
            <GridItem colSpan={{base:5, md:2}} d="flex" justifyContent="center" display={{base:"none", md:"flex"}}>
              <Image src="/contact-us.svg" alt="Contacte-nos" w="800px" h="auto"/>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </>
  )
}