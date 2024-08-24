import { clienteSchema } from '../schemas/clienteSchema';
import { z } from "zod"

export async function addClient(client: unknown) {
  try {
    const validatedClient = clienteSchema.parse(client);

    const response = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedClient),
    });

    if (!response.ok) {
      throw new Error('Falha ao adicionar cliente');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação:', error.errors);
    } else {
      console.error('Erro ao adicionar cliente:', error);
    }
    throw error;
  }
}

export async function deleteClient(cnpj: string) {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${cnpj}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao deletar cliente');
      }
      return true;
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw error;
    }
  }

  export async function fetchClients() {
    try {
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar clientes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  }

  export async function searchClients(data: string) {
    try {
      const response = await fetch(`http://localhost:3000/clientes/search/${data}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar clientes');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  }
