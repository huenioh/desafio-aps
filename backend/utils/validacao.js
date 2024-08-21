"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacao = validacao;
const zod_1 = require("zod");
function validacao(data, schema) {
    try {
        return schema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            throw new Error(error.errors.map(e => e.message).join(', '));
        }
        throw error;
    }
}
