import { Request, Response } from "express";
import { clienteSchema } from '../models/clienteModel';
import connection from '../db/connection';
import verificaCnpjCadastrado from "../utils/verificaCnpj"
import { validacao } from "../utils/validacao";



const createClient = async (req: Request, res: Response) => {
  try {
    const conn = await connection;
    const cliente = validacao(req.body, clienteSchema);
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
    res.status(500).json({ error: (error as Error).message });
  }
};

const getClientByCnpj = async (req: Request, res: Response) => {
  try {
    const conn = await connection;
    const [rows] = await conn.execute('SELECT * FROM clientes WHERE cnpj = ?', [req.params.cnpj]);
    const rowsData = rows as any[];
    if (rowsData.length > 0) {
      res.status(200).json(rowsData[0]);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


const updateClient = async (req: Request, res: Response) => {
  console.log("Entrou UPDATE")
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
  getClientByCnpj
};