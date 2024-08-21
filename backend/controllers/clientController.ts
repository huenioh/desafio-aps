import { Request, Response } from "express";
import { clienteSchema } from '../models/clienteModel';
import connection from '../db/connection';
import { validacao } from '../utils/validacao';

const createClient = async (req: Request, res: Response) => {
  // try {
  //   const newUser = validacao(req.body, clienteSchema);
  //   const conn = await connection;
  //   const [result] = await conn.query('INSERT INTO clientes (cliente) VALUES (?)', [JSON.stringify(newUser.cliente)]);
  //   res.status(201).json({ cliente: newUser.cliente });
  // } catch (error) {
  //   res.status(400).json({ error: (error as Error).message });
  // }
  console.log("Entrou CREATE")
};

const getAllClient = async (req: Request, res: Response) => {
  // try {
  //   const conn = await connection;
  //   const [rows] = await conn.query('SELECT * FROM clientes');
  //   const clientes = (rows as any[]).map(row => {
  //     const clienteData = row.cliente as string;
  //     return validacao({ cliente: JSON.parse(clienteData) }, clienteSchema).cliente;
  //   });
  //   res.json(clientes);
  // } catch (error) {
  //   res.status(500).json({ error: (error as Error).message });
  // }
  console.log("Entrou GET")
};

const updateClient = async (req: Request, res: Response) => {
  // try {
  //   const clientId = Number(req.params.id);
  //   const updatedUser = validacao({ cliente: { ...req.body.cliente, id: clientId } }, clienteSchema);
  //   const conn = await connection;
  //   await conn.query('UPDATE users SET cliente = ? WHERE id = ?', [JSON.stringify(updatedUser.cliente), updatedUser.cliente.id]);
  //   res.json(updatedUser.cliente);
  // } catch (error) {
  //   res.status(400).json({ error: (error as Error).message });
  // }
  console.log("Entrou UPDATE")
};

const deleteClient = async (req: Request, res: Response) => {
  // try {
  //   const userId = Number(req.params.id);
  //   const conn = await connection;
  //   await conn.query('DELETE FROM users WHERE id = ?', [userId]);
  //   res.sendStatus(204);
  // } catch (error) {
  //   res.status(500).json({ error: (error as Error).message });
  // }
  console.log("Entrou DELETE")
};

export default {
  createClient,
  getAllClient,
  updateClient,
  deleteClient
};