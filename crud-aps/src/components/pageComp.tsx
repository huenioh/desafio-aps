import React, { useRef } from 'react';
import { FormComp } from './FormComp';
import { TableComp } from './TableComp';
import { InputComp } from './InputComp';
import { Box, Container, Flex } from '@chakra-ui/react';

export function ClientsPage() {
  const tableRef = useRef<React.ElementRef<typeof TableComp>>(null);

  const handleClientAdded = () => {
    if (tableRef.current) {
      tableRef.current.updateTable();
    }
  };

  const handleSearch = (clients: any[]) => {
    if (tableRef.current) {
      tableRef.current.updateClients(clients);
    }
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Box flex={1} mr={4}>
          <InputComp onSearch={handleSearch} />
        </Box>
        <Box>
          <FormComp onClientAdded={handleClientAdded} />
        </Box>
      </Flex>
      <Box overflowX="auto">
        <TableComp ref={tableRef} />
      </Box>
    </Container>
  );
}