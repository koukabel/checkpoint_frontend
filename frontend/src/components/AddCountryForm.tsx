import {
  GetContinentsQuery,
  MutationAddCountryArgs,
  NewCountryInput,
} from "@/graphql/generated/schema";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Center,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  Select,
  Flex,
  useBreakpointValue, 
  HStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const INSERT_NEW_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      emoji
      code
      id
      continent {
        id
        name
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

export default function AddCountryForm() {
  const router = useRouter();
  const [countryData, setCountryData] = useState<NewCountryInput>({
    code: "",
    continent: { id: 0 }, 
    emoji: "",
    name: "",
  });

  const [createNewCountryMutation] = useMutation<
    MutationAddCountryArgs,
    { data: NewCountryInput }
  >(INSERT_NEW_COUNTRY);

  const addNewCountry = (partialCountryData: Partial<NewCountryInput>) => {
    setCountryData({ ...countryData, ...partialCountryData });
  };

  const insertNewCountry = async () => {
    try {
      await createNewCountryMutation({
        variables: { data: countryData },
        refetchQueries: [{ query: GET_CONTINENTS }], 
      });
 
      setCountryData({
        code: "",
        continent: { id: 0 },
        emoji: "",
        name: "",
      });
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const { data } = useQuery<GetContinentsQuery>(GET_CONTINENTS);
 const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  return (
    <Center padding="2rem" margin="30px">
    <FormControl
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      flexDirection={stackDirection === "row" ? "row" : "column"}
    >
  
      {stackDirection === "row" ? (
        <HStack pr="10px">
          <FormLabel float="left">Name</FormLabel>
          <Input
            type="text"
            size="md"
            value={countryData.name}
            onChange={(event) => addNewCountry({ name: event.target.value })}
          />
        </HStack>
      ) : (
        <VStack pr="10px">
          <FormLabel float="left">Name</FormLabel>
          <Input
            type="text"
            size="md"
            value={countryData.name}
            onChange={(event) => addNewCountry({ name: event.target.value })}
          />
        </VStack>
      )}

      {stackDirection === "row" ? (
        <HStack pr="10px">
          <FormLabel float="left">Emoji</FormLabel>
          <Input
            type="text"
            size="md"
            value={countryData.emoji}
            onChange={(event) => addNewCountry({ emoji: event.target.value })}
          />
        </HStack>
      ) : (
        <VStack pr="10px">
          <FormLabel float="left">Emoji</FormLabel>
          <Input
            type="text"
            size="md"
            value={countryData.emoji}
            onChange={(event) => addNewCountry({ emoji: event.target.value })}
          />
        </VStack>
      )}

      {stackDirection === "row" ? (
        <HStack pr="10px">
          <FormLabel float="left">Code</FormLabel>
          <Input
            type="text"
            size="md"
            value={countryData.code}
            onChange={(event) => addNewCountry({ code: event.target.value })}
          />
        </HStack>
      ) : (
        <VStack pr="10px">
          <FormLabel float="left">Code</FormLabel>
          <Input
            type="text"
            size="md"
            value={countryData.code}
            onChange={(event) => addNewCountry({ code: event.target.value })}
          />
        </VStack>
      )}

      {stackDirection === "row" ? (
        <HStack pr="10px">
          <FormLabel float="left">Continent</FormLabel>
          <Select
            placeholder="Select Continent"
            value={countryData.continent?.id}
            onChange={(event) =>
              addNewCountry({ continent: { id: Number(event.target.value) } })
            }
          >
            {data?.continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </Select>
        </HStack>
      ) : (
        <VStack pr="10px">
          <FormLabel float="left">Continent</FormLabel>
          <Select
            placeholder="Select Continent"
            value={countryData.continent?.id}
            onChange={(event) =>
              addNewCountry({ continent: { id: Number(event.target.value) } })
            }
          >
            {data?.continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </Select>
        </VStack>
      )}

      <Button color="white" bg="#F70668" onClick={insertNewCountry}>
        Add
      </Button>
    </FormControl>
  </Center>
);
    
  
}
