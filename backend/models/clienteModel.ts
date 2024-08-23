import { z } from 'zod';

export const clienteSchema = z.object({
  cliente: z.object({
    nome: z.string().min(1, "Por favor, informe um nome válido"),
    nomeFantasia: z.string(),
    cnpj: z.string().min(14, "Por favor, informe um CNPJ válido").max(14, "Por favor, informe um CNPJ válido"),
    email: z.string().email("Por favor, informe um E-mail válido."),
    telefone: z.string().min(11, "Por favor, informe um telefone válido"),
    cep: z.string().min(8, "Por favor, informe um CEP válido"),
    logradouro: z.string().min(1, "Por favor, informe um logradouro válido"),
    bairro: z.string().min(1, "Por favor, informe um bairro válido"),
    cidade: z.string().min(1, "Por favor, informe uma cidade válida"),
    uf: z.string().min(2, "Por favor, informar UF válido").max(2, "Por favor, informar UF válido"),
    complemento: z.string().optional(),

  }),
});
