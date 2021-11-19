import {
  Box,
  Container,
  HStack,
  Heading,
  VStack,
  Flex,
  FormLabel,
  Button,
} from "@chakra-ui/react";

import CheckboxField, {CheckboxOption} from "./fields/CheckboxField";
import RadioField from "./fields/RadioField";
import SelectField from "./fields/SelectField";

import { useForm, FormProvider } from "react-hook-form";

import areaOptions from "@/utils/data/area.json"
import cityOptions from "@/utils/data/cities.json"
import priceOptions from "@/utils/data/price.json"
import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  defaultDistrict : number,
  setEndpoint : Dispatch<SetStateAction<string>>,
  currentDistrict : number | undefined,
  setDistrict: Dispatch<SetStateAction<number | undefined>>,
}


export default function Navigation({defaultDistrict, setEndpoint, currentDistrict, setDistrict} : Props) : JSX.Element {

  useEffect(() => {
    if(defaultDistrict){
      console.log("defaultDistrict", defaultDistrict)
      console.log(districtOptions.find(({value}) => parseInt(value) === defaultDistrict))
      setValue("district", districtOptions.find(({value}) => parseInt(value) === defaultDistrict)?.value)
    }
  },[])

  const defaultValues = {
    district: "",
    county: "",
    parish: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    houseType: [],
    rooms: [],
  }

  const formMethods = useForm<any>({
    mode: 'onBlur',
    defaultValues: defaultValues
  });
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
  } = formMethods;

  const district = watch('district')
  const county = watch('county')

  const districtOptions = cityOptions.filter(({level}) => level === 1).map(({name, code}) => {
    return({label: name, value: code.toString()})
  })

  const countyOptions = cityOptions.filter(({level, code}) => level === 2 && code >= district*100 +1 && code <= district*100 +99).map(({name, code}) => {
    return({label: name, value: code.toString()})
  })

  const parishOptions = cityOptions.filter(({level, code}) => level === 3 && code >= county * 100 + 1 && code <= county * 100 + 99).map(({name, code}) => {
    return({label: name, value: code.toString()})
  })

  const houseTypeOptions : CheckboxOption[] = [
    {
      label: "Apartamento",
      value: "apartment"
    },
    {
      label: "Moradia",
      value: "house"
    },
  ]

  const roomsOptions : CheckboxOption[] = [
    {
      label: "T0",
      value: "t0",
    },
    {
      label: "T1",
      value: "t1",
    },
    {
      label: "T2",
      value: "t2",
    },
    {
      label: "T3",
      value: "t3",
    },
    {
      label: "T4 ou +",
      value: "t4+",
    },
  ]

  const filter = (e : BaseSyntheticEvent<object, any, any>) =>{
    e.preventDefault();

    handleSubmit(async (filters: Record<string, string>) => {
      const usedFilters = Object.fromEntries(Object.entries(filters).filter(([_,v]) => v.length !== 0))
      console.log("usedFilters", usedFilters)
      const searchParams = new URLSearchParams(usedFilters)
      const queryString = searchParams.toString();
      setEndpoint(queryString)
      console.log("filters", filters)
      console.log("queryString", queryString)
    })(e)
  }

  const getDistrictValueByLabel = (name: string) => {
    setValue("district", districtOptions.find(({label}) => label.toLowerCase() === name.toLowerCase())?.value)
  }



  return(
    <Box py="6" borderRadius="xl" borderWidth="thin" boxShadow="md">
      <Container maxW="container.xl">
        <FormProvider {...formMethods}>
          <form onSubmit={filter} noValidate>
            <VStack spacing="10">
              <Heading fontWeight="thin" fontSize="25px">Filtros</Heading>
              <SelectField name="district" label="Distrito" options={districtOptions} placeholder="Escolha o Distrito" />
              <SelectField name="county" label="Concelho" options={countyOptions} disabled={!district} placeholder="Escolha o Concelho"/>
              <SelectField name="parish" label="Freguesia" options={parishOptions} disabled={!district && !county} placeholder="Escolha o Distrito"/>
              <Flex flexWrap="wrap">
                <FormLabel>Preço</FormLabel>
                <HStack>
                  <SelectField name="minPrice" label="" options={priceOptions} placeholder="Min"/>
                  <SelectField name="maxPrice" label="" options={priceOptions} placeholder="Max"/>
                </HStack>
              </Flex>
              <Flex flexWrap="wrap">
                <FormLabel>Área</FormLabel>
                <HStack>
                  <SelectField name="minArea" label="" options={areaOptions} placeholder="Min"/>
                  <SelectField name="maxArea" label="" options={areaOptions} placeholder="Max"/>
                </HStack>
              </Flex>
              <CheckboxField name="houseType" label="Tipo de casa" options={houseTypeOptions}/>
              <CheckboxField name="rooms" label="Tipologia" options={roomsOptions}/>
              <HStack>
                <Button
                  colorScheme="blackAlpha"
                  onClick={() => reset(defaultValues)}>Limpar</Button>
                <Button type="submit" colorScheme="green">
                  Filtrar
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormProvider>
      </Container>
    </Box>
  )
}