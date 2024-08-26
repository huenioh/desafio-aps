import { useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { searchClients } from '../controller/clientController';

interface InputCompProps {
  onSearch: (clients: any[]) => void;
}

export function InputComp({ onSearch }: InputCompProps) {
  const [inputValue, setInputValue] = useState('');

  const handleClick = async () => {
    try {
      const clients = await searchClients(inputValue);
    
      onSearch(clients);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  return (
    <HStack>
      <Input 
        placeholder='Pesquisar' 
        mr={2}
        width={250}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant='solid' width='auto' onClick={handleClick}>
        <Search2Icon />
      </Button>
    </HStack>
  );
}