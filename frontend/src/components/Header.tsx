import { Center, Flex, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <VStack
      className="header"
      bg="#F70668"
      minW={"50rem"}
      minHeight={"5rem"}
      p={"20px"}
    >
      <Heading color={"white"}>Checkpoint : frontend</Heading>
      <Link className="link" color="white" href="/">
        Countries
      </Link>
    </VStack>
  );
}
