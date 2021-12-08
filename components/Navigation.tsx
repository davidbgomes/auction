import {
  Box,
  Container,
  HStack,
  Heading,
  VStack,
  FormLabel,
  Button,
  useMediaQuery,
  FormControl,
} from "@chakra-ui/react";

import CheckboxField, { CheckboxOption } from "./fields/CheckboxField";
import SelectField from "./fields/SelectField";
import { useRouter } from "next/router";

import { useForm, FormProvider } from "react-hook-form";

import areaOptions from "@/utils/data/area.json";
import cityOptions from "@/utils/data/cities.json";
import priceOptions from "@/utils/data/price.json";
import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  defaultDistrict: string;
  defaultCounty: string;
  defaultParish: string;
  defaultMinPrice: string;
  defaultMaxPrice: string;
  defaultMinArea: string;
  defaultMaxArea: string;
  defaultHouseType: string[];
  defaultTypology: string[];
  defaultOrderBy: string;
  endpoint: string;
  setEndpoint: Dispatch<SetStateAction<string>>;
  closeDrawer?: () => void;
};

export default function Navigation({
  defaultDistrict,
  defaultCounty,
  defaultParish,
  defaultMinPrice,
  defaultMaxPrice,
  defaultMinArea,
  defaultMaxArea,
  defaultHouseType,
  defaultTypology,
  defaultOrderBy,
  endpoint,
  setEndpoint,
  closeDrawer,
}: Props): JSX.Element {
  const router = useRouter();

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const resetValues = {
    district: "",
    county: "",
    parish: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    houseType: [],
    typology: [],
    orderBy: "",
  };

  const formMethods = useForm<any>({
    mode: "onBlur",
    defaultValues: {
      district: defaultDistrict || "",
      county: defaultCounty || "",
      parish: defaultParish || "",
      minPrice: defaultMinPrice || "",
      maxPrice: defaultMaxPrice || "",
      minArea: defaultMinArea || "",
      maxArea: defaultMaxArea || "",
      houseType: defaultHouseType || [],
      typology: defaultTypology || [],
      orderBy: defaultOrderBy || "",
    },
  });
  const { handleSubmit, watch, reset } = formMethods;

  const district = watch("district");
  const county = watch("county");

  const districtOptions = cityOptions
    .filter(({ level }) => level === 1)
    .map(({ name, code }) => {
      return { label: name, value: code.toString() };
    });

  const countyOptions = cityOptions
    .filter(
      ({ level, code }) =>
        level === 2 && code >= district * 100 + 1 && code <= district * 100 + 99
    )
    .map(({ name, code }) => {
      return { label: name, value: code.toString() };
    });

  const parishOptions = cityOptions
    .filter(
      ({ level, code }) =>
        level === 3 && code >= county * 100 + 1 && code <= county * 100 + 99
    )
    .map(({ name, code }) => {
      return { label: name, value: code.toString() };
    });

  const houseTypeOptions: CheckboxOption[] = [
    {
      label: "Apartamento",
      value: "Apartamento",
    },
    {
      label: "Moradia",
      value: "Moradia",
    },
  ];

  const typologyOptions: CheckboxOption[] = [
    {
      label: "T0",
      value: "T0",
    },
    {
      label: "T1",
      value: "T1",
    },
    {
      label: "T2",
      value: "T2",
    },
    {
      label: "T3",
      value: "T3",
    },
    {
      label: "T4",
      value: "T4",
    },
    {
      label: "T5",
      value: "T5",
    },
    {
      label: "T6 ou superior",
      value: "T6 ou superior",
    },
  ];

  const orderByOptions: CheckboxOption[] = [
    {
      label: "Maior preço",
      value: "currentBid_desc",
    },
    {
      label: "Menor preço",
      value: "currentBid_asc",
    },
    {
      label: "Mais recentes",
      value: "createdAt_desc",
    },
    {
      label: "Mais antigos",
      value: "createdAt_asc",
    },
    {
      label: "Maior área",
      value: "area_desc",
    },
    {
      label: "Menor área",
      value: "area_asc",
    },
  ];

  const filter = (e: BaseSyntheticEvent<object, any, any>) => {
    e.preventDefault();

    handleSubmit(async (filters: Record<string, string>) => {
      const pathname = router.pathname;
      const usedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v.length !== 0)
      );
      const searchParams = new URLSearchParams(usedFilters);
      const queryString = searchParams.toString();
      router.push(`${pathname}?${queryString}`);

      if (isSmallerThan768 && typeof closeDrawer !== "undefined") {
        closeDrawer();
      }
    })(e);
  };

  const clearFilters = () => {
    reset(resetValues);
    const pathname = router.pathname;
    router.push(pathname);
  };

  return (
    <Box
      pt="2"
      pb="6"
      borderRadius={{ base: "none", md: "xl" }}
      borderWidth={{ base: "inherit", md: "thin" }}
      boxShadow={{ base: "inherit", md: "md" }}
    >
      <Container maxW="container.xl">
        <FormProvider {...formMethods}>
          <form onSubmit={filter} noValidate>
            <VStack spacing={{ base: "3", md: "10" }}>
              {!isSmallerThan768 && (
                <Heading fontWeight="normal" fontSize="25px">
                  Filtros
                </Heading>
              )}
              <SelectField
                name="district"
                label="Distrito"
                options={districtOptions}
                placeholder="Escolha o Distrito"
              />
              <SelectField
                name="county"
                label="Concelho"
                options={countyOptions}
                disabled={!district}
                placeholder="Escolha o Concelho"
              />
              <SelectField
                name="parish"
                label="Freguesia"
                options={parishOptions}
                disabled={!district && !county}
                placeholder="Escolha a Freguesia"
              />
              <FormControl id="price">
                <FormLabel>Preço</FormLabel>
                <HStack>
                  <SelectField
                    name="minPrice"
                    label=""
                    options={priceOptions}
                    placeholder="Min"
                  />
                  <SelectField
                    name="maxPrice"
                    label=""
                    options={priceOptions}
                    placeholder="Max"
                  />
                </HStack>
              </FormControl>
              <FormControl id="area">
                <FormLabel>Área</FormLabel>
                <HStack>
                  <SelectField
                    name="minArea"
                    label=""
                    options={areaOptions}
                    placeholder="Min"
                  />
                  <SelectField
                    name="maxArea"
                    label=""
                    options={areaOptions}
                    placeholder="Max"
                  />
                </HStack>
              </FormControl>
              <CheckboxField
                name="houseType"
                label="Tipo de casa"
                options={houseTypeOptions}
                direction={isSmallerThan768 ? "row" : "column"}
              />
              <CheckboxField
                name="typology"
                label="Tipologia"
                options={typologyOptions}
                direction={isSmallerThan768 ? "row" : "column"}
              />
              <SelectField
                name="orderBy"
                label="Ordenar por"
                options={orderByOptions}
                placeholder="Escolha a ordenação"
              />
              <HStack>
                <Button colorScheme="blackAlpha" onClick={clearFilters}>
                  Limpar
                </Button>
                <Button type="submit" colorScheme="green">
                  Filtrar
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormProvider>
      </Container>
    </Box>
  );
}
