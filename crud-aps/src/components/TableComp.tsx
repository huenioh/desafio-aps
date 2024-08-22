import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  IconButton,
} from "@chakra-ui/react";
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

interface TableCompProps {}

interface Cliente {
  cnpj: string;
  nome: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento: string;
}

export const TableComp = forwardRef<unknown, TableCompProps>((_, ref) => {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      if (!response.ok) {
        throw new Error('Falha ao buscar clientes');
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    addClient: (data: Cliente) => {
      setClients([...clients, data]);
    },
  }));

  const handleClientClick = (client: Cliente) => {
    setSelectedClient(client);
    onOpen();
  };

  const handleEdit = (cnpj: string) => {
    // Implementar lógica de edição
    console.log('Editar cliente:', cnpj);
  };

  const handleDelete = async (cnpj: string) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${cnpj}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir cliente');
      }
      fetchClients();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
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
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client) => (
              <Tr key={client.cnpj}>
                <Td onClick={() => handleClientClick(client)} cursor="pointer">{client.nome}</Td>
                <Td>{client.cnpj}</Td>
                <Td>{client.email}</Td>
                <Td>{client.telefone}</Td>
                <Td>
                  <IconButton
                    aria-label="Editar cliente"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(client.cnpj)}
                    mr={2}
                  />
                  <IconButton
                    aria-label="Excluir cliente"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(client.cnpj)}
                  />
                </Td>
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