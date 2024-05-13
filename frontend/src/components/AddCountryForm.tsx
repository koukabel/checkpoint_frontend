import {
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";

export default function AddCountryForm() {
  return (
    <Center
      boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
      padding={"2rem"}
      margin={"30px"}>
    
      <FormControl display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"} >
        <VStack pr={"10px"}> 
        <FormLabel float="left">Name</FormLabel>
        <Input type="text" size="lg"/>
        </VStack>
        <VStack  pr={"10px"}>
        <FormLabel>Emoji</FormLabel>
        <Input type="text" size="lg" />
         </VStack>
         <VStack> 
        <FormLabel>Code</FormLabel>
        <Input type="text"  size="lg"/>
        </VStack>
        <Button color="white" bg='#F70668'>Add</Button>
      </FormControl>
     

   </Center>
  );
}
