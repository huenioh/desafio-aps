import { FormComp } from "./components/FormComp";
import { TableComp } from "./components/TableComp";
import { Flex, Container, Text } from "@chakra-ui/react";

function App() {
  return (
    <Container maxW="container.xl" mt={10}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl">Tabela de Clientes</Text>
        <FormComp />
      </Flex>
      <TableComp />
    </Container>
  );
}

export default App;