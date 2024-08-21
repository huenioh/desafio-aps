"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const newUser = validacao(req.body, clienteSchema);
    //   const conn = await connection;
    //   const [result] = await conn.query('INSERT INTO clientes (cliente) VALUES (?)', [JSON.stringify(newUser.cliente)]);
    //   res.status(201).json({ cliente: newUser.cliente });
    // } catch (error) {
    //   res.status(400).json({ error: (error as Error).message });
    // }
    console.log("Entrou CREATE");
});
const getAllClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log("Entrou GET");
});
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const clientId = Number(req.params.id);
    //   const updatedUser = validacao({ cliente: { ...req.body.cliente, id: clientId } }, clienteSchema);
    //   const conn = await connection;
    //   await conn.query('UPDATE users SET cliente = ? WHERE id = ?', [JSON.stringify(updatedUser.cliente), updatedUser.cliente.id]);
    //   res.json(updatedUser.cliente);
    // } catch (error) {
    //   res.status(400).json({ error: (error as Error).message });
    // }
    console.log("Entrou UPDATE");
});
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const userId = Number(req.params.id);
    //   const conn = await connection;
    //   await conn.query('DELETE FROM users WHERE id = ?', [userId]);
    //   res.sendStatus(204);
    // } catch (error) {
    //   res.status(500).json({ error: (error as Error).message });
    // }
    console.log("Entrou DELETE");
});
exports.default = {
    createClient,
    getAllClient,
    updateClient,
    deleteClient
};
