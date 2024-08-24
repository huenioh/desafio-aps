import { Request, Response } from "express";
import { clienteSchema } from '../models/clienteModel';
import connection from '../db/connection';
import verificaCnpjCadastrado from "../utils/verificaCnpj"
import { RowDataPacket } from "mysql2";
import { z } from "zod";


const createClient = async (req: Request, res: Response) => {
  try {
    const conn = await connection;
    const cliente = clienteSchema.parse(req.body);
    console.log(cliente);
    if (await verificaCnpjCadastrado(conn, cliente.cliente.cnpj)) {
      res.status(409);
    } else {
      await conn.query(
        `INSERT INTO clientes (
          nome, 
          nome_fantasia, 
          cnpj, 
          email, 
          telefone, 
          cep, 
          logradouro, 
          bairro, 
          cidade, 
          uf, 
          complemento
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cliente.cliente.nome,
          cliente.cliente.nomeFantasia,
          cliente.cliente.cnpj,
          cliente.cliente.email,
          cliente.cliente.telefone,
          cliente.cliente.cep,
          cliente.cliente.logradouro,
          cliente.cliente.bairro,
          cliente.cliente.cidade,
          cliente.cliente.uf,
          cliente.cliente.complemento || null
        ]
      );
      res.status(201).json({ message: 'Cliente criado com sucesso!', cliente });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllClient = async (req: Request, res: Response) => {
  try {
    const conn = await connection;
    const [rows] = await conn.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getClientByCnpj = async (req: Request, res: Response) => {
  try {
    const conn = await connection;
    const [rows] = await conn.query('SELECT * FROM clientes WHERE cnpj = ?', [req.params.cnpj]);
    const rowsData = rows as any[];
    if (rowsData.length > 0) {
      res.status(200).json(rowsData[0]);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchClients = async (req: Request, res: Response) => {
  try {
    const conn = await connection;
    const searchTerm = `%${req.params.data}%`;
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM clientes 
       WHERE CONCAT_WS(' ', nome, nome_fantasia, cnpj, email, telefone, cep, logradouro, bairro, cidade, uf, complemento) LIKE ?`,
      [searchTerm]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const conn = await connection;

    const newClientData = clienteSchema.parse(req.body);

    if (await verificaCnpjCadastrado(conn, newClientData.cliente.cnpj)) {
      await conn.query(
        `UPDATE clientes SET 
          nome = ?,
          nome_fantasia = ?,
          cnpj = ?,
          email = ?,
          telefone = ?,
          cep = ?,
          logradouro = ?,
          bairro = ?,
          cidade = ?,
          uf = ?,
          complemento = ?
        WHERE cnpj = ?`,
        [
          newClientData.cliente.nome,
          newClientData.cliente.nomeFantasia,
          newClientData.cliente.cnpj,
          newClientData.cliente.email,
          newClientData.cliente.telefone,
          newClientData.cliente.cep,
          newClientData.cliente.logradouro,
          newClientData.cliente.bairro,
          newClientData.cliente.cidade,
          newClientData.cliente.uf,
          newClientData.cliente.complemento,
          newClientData.cliente.cnpj
        ]
      );

      return res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    } else {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Erro de validação', errors: error.errors });
    }
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }

  console.log("Entrou UPDATE");
};

const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientCnpj = req.params.cnpj;
    const conn = await connection;
    if (await verificaCnpjCadastrado(conn, clientCnpj)) {
      await conn.query('DELETE FROM clientes WHERE cnpj = ?', [clientCnpj]);
      res.status(200).send('Cliente deletado com sucesso');
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default {
  createClient,
  getAllClient,
  updateClient,
  deleteClient,
  getClientByCnpj,
  searchClients
};