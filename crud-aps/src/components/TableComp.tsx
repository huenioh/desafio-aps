// TableComp.tsx
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useState, forwardRef, useImperativeHandle } from 'react';
  
  interface TableCompProps {}
  
  interface Cliente {
    id: string;
    nome: string;
    nomeFantasia: string;
    cnpj: string;
    email: string;
    telefone: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento: string;
  }
  
  export const TableComp = forwardRef<any, TableCompProps>((_, ref) => {
    const [clients, setClients] = useState<Cliente[]>([
      {
        id: '1',
        nome: 'João da Silva',
        nomeFantasia: 'Empresa XYZ',
        cnpj: '12.345.678/0001-90',
        email: 'joao@empresa.com',
        telefone: '(11) 9 9999-9999',
        cep: '12345-678',
        logradouro: 'Rua dos Exemplos',
        bairro: 'Bairro Fictício',
        cidade: 'São Paulo',
        uf: 'SP',
        complemento: 'Apto 123',
      },
      {
        id: '2',
        nome: 'Maria Oliveira',
        nomeFantasia: 'Empresa ABC',
        cnpj: '98.765.432/0001-12',
        email: 'maria@empresa.com',
        telefone: '(21) 9 8888-8888',
        cep: '87654-321',
        logradouro: 'Avenida Exemplo',
        bairro: 'Bairro Imaginário',
        cidade: 'Rio de Janeiro',
        uf: 'RJ',
        complemento: 'Sala 456',
      },
    ]);
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    useImperativeHandle(ref, () => ({
      addClient: (data: Cliente) => {
        setClients([...clients, data]);
      },
    }));
  
    const handleClientClick = (client: Cliente) => {
      setSelectedClient(client);
      onOpen();
    };
  
    return (
      <>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CNPJ</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client) => (
                <Tr key={client.id} onClick={() => handleClientClick(client)} cursor="pointer">
                  <Td>{client.nome}</Td>
                  <Td>{client.cnpj}</Td>
                  <Td>{client.email}</Td>
                  <Td>{client.telefone}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
  
        {selectedClient && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Detalhes do Cliente</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>Nome: {selectedClient.nome}</p>
                <p>Nome Fantasia: {selectedClient.nomeFantasia}</p>
                <p>CNPJ: {selectedClient.cnpj}</p>
                <p>Email: {selectedClient.email}</p>
                <p>Telefone: {selectedClient.telefone}</p>
                <p>CEP: {selectedClient.cep}</p>
                <p>Logradouro: {selectedClient.logradouro}</p>
                <p>Bairro: {selectedClient.bairro}</p>
                <p>Cidade: {selectedClient.cidade}</p>
                <p>UF: {selectedClient.uf}</p>
                <p>Complemento: {selectedClient.complemento}</p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  });