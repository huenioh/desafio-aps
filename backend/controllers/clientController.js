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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClient = exports.searchClients = void 0;
const clienteModel_1 = require("../models/clienteModel");
const connection_1 = __importDefault(require("../db/connection"));
const verificaCnpj_1 = __importDefault(require("../utils/verificaCnpj"));
const zod_1 = require("zod");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const cliente = clienteModel_1.clienteSchema.parse(req.body);
        console.log(cliente);
        if (yield (0, verificaCnpj_1.default)(conn, cliente.cliente.cnpj)) {
            res.status(409).send("Cliente já cadastrado na base.");
        }
        else {
            yield conn.query(`INSERT INTO clientes (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
            ]);
            res.status(201).json({ message: 'Cliente criado com sucesso!', cliente });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
const getAllClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const [rows] = yield conn.query('SELECT * FROM clientes');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const getClientByCnpj = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const [rows] = yield conn.query('SELECT * FROM clientes WHERE cnpj = ?', [req.params.cnpj]);
        const rowsData = rows;
        if (rowsData.length > 0) {
            res.status(200).json(rowsData[0]);
        }
        else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const searchClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const searchTerm = `%${req.params.data}%`;
        const [rows] = yield conn.query(`SELECT * FROM clientes 
       WHERE CONCAT_WS(' ', nome, nome_fantasia, cnpj, email, telefone, cep, logradouro, bairro, cidade, uf, complemento) LIKE ?`, [searchTerm]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.searchClients = searchClients;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const newClientData = clienteModel_1.clienteSchema.parse(req.body);
        if (yield (0, verificaCnpj_1.default)(conn, newClientData.cliente.cnpj)) {
            yield conn.query(`UPDATE clientes SET 
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
        WHERE cnpj = ?`, [
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
            ]);
            return res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
        }
        else {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: 'Erro de validação', errors: error.errors });
        }
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
    console.log("Entrou UPDATE");
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientCnpj = req.params.cnpj;
        const conn = yield connection_1.default;
        if (yield (0, verificaCnpj_1.default)(conn, clientCnpj)) {
            yield conn.query('DELETE FROM clientes WHERE cnpj = ?', [clientCnpj]);
            res.status(200).send('Cliente deletado com sucesso');
        }
        else {
            res.status(404).send('Cliente não encontrado');
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = {
    createClient,
    getAllClient,
    updateClient: exports.updateClient,
    deleteClient,
    getClientByCnpj,
    searchClients: exports.searchClients
};
