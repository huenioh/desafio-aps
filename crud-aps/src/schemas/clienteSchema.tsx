import { z } from 'zod';

export const clienteSchema = z.object({
  cliente: z.object({
    nome: z.string().min(1, "Por favor, informe um nome válido"),
    nomeFantasia: z.string().optional(),
    cnpj: z.string().length(14, "Por favor, informe um CNPJ válido"), // Ajustado para comprimento fixo
    email: z.string().email("Por favor, informe um E-mail válido."),
    telefone: z.string().min(14, "Por favor, informe um telefone válido"), // Ajustado para comprimento mínimo
    cep: z.string().length(8, "Por favor, informe um CEP válido"), // Ajustado para comprimento fixo
    logradouro: z.string().min(1, "Por favor, informe um logradouro válido"),
    bairro: z.string().min(1, "Por favor, informe um bairro válido"),
    cidade: z.string().min(1, "Por favor, informe uma cidade válida"),
    uf: z.string().length(2, "Por favor, informar UF válido"), // Ajustado para comprimento fixo
    complemento: z.string().optional(),
  }),
});

export type FormClientData = z.infer<typeof clienteSchema>;