import AddCountryForm from "@/components/AddCountryForm";
import Header from "@/components/Header";
import { ChakraProvider, Box, HStack } from '@chakra-ui/react'
import { gql, useQuery } from "@apollo/client";
import { CountriesQuery } from "@/graphql/generated/schema";

const GET_COUNTRIES_LIST = gql`
  query Countries {
    countries {
      id
      name
      emoji
    }
  }
`;

export default function Home() {
 const { loading, error, data } = useQuery<CountriesQuery>(GET_COUNTRIES_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <ChakraProvider> 
      <Header />
      <AddCountryForm />
      {/* <HStack spacing='24px'>
      {data?.getAds
          ? data.getAds.map((country) => (  
        <Box w='40px' h='40px' bg='yellow.200'> {{country}}</Box>
      ))
      : null}

      </HStack> */}
    </ChakraProvider>
  );
}
