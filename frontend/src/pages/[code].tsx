// import { useQuery, ChakraProvider } from "@chakra-ui/react";
// import { useRouter } from "next/router";

import Header from "@/components/Header";
import { gql, useQuery } from "@apollo/client";
import { Box, Center, ChakraProvider, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const GET_COUNTRY = gql`
query Country($code: String!) {
  country(code: $code) {
    code
    name
    id
    emoji
    continent {
      id
      name
    }
  }
}
`;

 export default function Country() {
	const router = useRouter();
	const { code } = router.query;
  
	const { data } = useQuery(GET_COUNTRY, {
		variables: { code: code as string },
	});

	if (data) {
		const { country } = data;

		return (
			<ChakraProvider>
      <Header/>
      <VStack minHeight={"50rem"} minW={"100%"} justifyContent={"center"} spacing={6}>

      <Heading as="h1" >{country.emoji}</Heading>
      <Heading as="h6" size="md">Name: {country.name}</Heading>
      <span>Continent: {country.continent ? country.continent.name : 'Unknown'}</span>

  
    </VStack>
			</ChakraProvider>
		);
	}
}
