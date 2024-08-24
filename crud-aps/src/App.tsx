import { ChakraProvider, Box, Container, VStack, Heading } from "@chakra-ui/react";
import { ClientsPage } from "./components/pageComp"

function App() {
  return (
    <ChakraProvider>
      <Box bg="gray.100" minHeight="100vh" py={5}>
        <Container maxWidth="container.xl">
          <VStack
            spacing={8}
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
          >
            <Heading as="h1" size="xl" textAlign="center">
              Gerenciamento de Clientes
            </Heading>
              <ClientsPage />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;