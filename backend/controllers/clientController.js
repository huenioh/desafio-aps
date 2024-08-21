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
const connection_1 = __importDefault(require("../db/connection"));
const verificaCnpj_1 = __importDefault(require("../utils/verificaCnpj"));
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entrou CREATE");
});
const getAllClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const [rows] = yield conn.query('SELECT * FROM clientes');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const getClientByCnpj = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.default;
        const clientCnpj = Number(req.params.cnpj);
        const [rows] = yield conn.query('SELECT * FROM clientes WHERE cnpj = ?', [clientCnpj.toString()]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entrou UPDATE");
});
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
    updateClient,
    deleteClient,
    getClientByCnpj
};
