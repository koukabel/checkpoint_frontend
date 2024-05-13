import AddCountryForm from "@/components/AddCountryForm";
import Header from "@/components/Header";
import { ChakraProvider, Box, HStack, Heading, Stack, Flex } from '@chakra-ui/react'
import { gql, useQuery } from "@apollo/client";
import { CountriesQuery } from "@/graphql/generated/schema";
import router from "next/router";

const GET_COUNTRIES_LIST = gql`
  query Countries {
    countries {
      id
      name
      emoji
      code
    }
  }
`;

export default function Home() {
const { data } = useQuery<CountriesQuery>(GET_COUNTRIES_LIST);

  return (
    <ChakraProvider> 
      <Header />
      <AddCountryForm />
       <Flex  direction={{ base: "column", md: "row" }}  p='50px' justifyContent={"center"} alignItems={"center"}>
       {data?.countries
  ? data.countries.map((country, index) => (  
    <Box key={index} cursor="pointer" w="8rem" h="5rem" margin='5px' display="flex" flexDirection="column" justifyContent={"center"} alignItems="center" 
     boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}onClick={() => router.push(`/${country.code}`)}> 
      <Heading as="h6" size="xs">{country.name}</Heading>
     <span>{country.code}</span>
    </Box>
    
  ))
  : null}

      </Flex>
      
    </ChakraProvider>
  );
}
