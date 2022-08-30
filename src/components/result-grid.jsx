import { SimpleGrid } from "@chakra-ui/react";

export default function ResultGrid(props) {
  return (
    <SimpleGrid m={5} minChildWidth="250px" spacing={5}>
      {props.children}
    </SimpleGrid>
  );
}
