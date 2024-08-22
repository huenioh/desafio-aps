"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteSchema = void 0;
const zod_1 = require("zod");
exports.clienteSchema = zod_1.z.object({
    cliente: zod_1.z.object({
        nome: zod_1.z.string().min(1, "Por favor, informe um nome válido"),
        nomeFantasia: zod_1.z.string().optional(),
        cnpj: zod_1.z.string().min(14, "Por favor, informe um CNPJ válido").max(14, "Por favor, informe um CNPJ válido"),
        email: zod_1.z.string().email("Por favor, informe um E-mail válido."),
        telefone: zod_1.z.string().min(11, "Por favor, informe um telefone válido"),
        cep: zod_1.z.string().min(8, "Por favor, informe um CEP válido"),
        logradouro: zod_1.z.string().min(1, "Por favor, informe um logradouro válido"),
        bairro: zod_1.z.string().min(1, "Por favor, informe um bairro válido"),
        cidade: zod_1.z.string().min(1, "Por favor, informe uma cidade válida"),
        uf: zod_1.z.string().min(2, "Por favor, informar UF válido").max(2, "Por favor, informar UF válido"),
        complemento: zod_1.z.string().optional(),
    }),
});
