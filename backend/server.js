"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/clientes', clientRoutes_1.default);
app.use((0, cors_1.default)({
    origin: "http://localhost:5173/"
}));
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
