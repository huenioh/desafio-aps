import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
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
import { fetchClients, deleteClient } from "../controller/clientController"


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

interface TableCompRef {
  addClient: (data: Cliente) => void;
  updateTable: () => Promise<void>;
  updateClients: (newClients: Cliente[]) => void;
}

export const TableComp = forwardRef<TableCompRef, {}>((_, ref) => {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateTable = async () => {
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error('Erro ao atualizar a tabela:', error);
    }
  };

  useEffect(() => {
    updateTable();
  }, []);

  useImperativeHandle(ref, () => ({
    addClient: (data: Cliente) => {
      setClients([...clients, data]);
    },
    updateTable: updateTable,
    updateClients: (newClients: Cliente[]) => {
      setClients(newClients);
    }
  }));

  const handleClientClick = (client: Cliente) => {
    setSelectedClient(client);
    onOpen();
  };

  const handleEdit = (cnpj: string) => {
    console.log(cnpj);
  };

  const handleDelete = async (cnpj: string) => {
    try {
      await deleteClient(cnpj);
      updateTable();
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
                    mr={3}
                    aria-label="Editar Cliente"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(client.cnpj)}
                  />
                  <IconButton
                    aria-label="Excluir Cliente"
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