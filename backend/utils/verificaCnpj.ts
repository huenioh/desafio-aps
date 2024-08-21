import { Connection } from 'mysql2/promise';

async function verificaCnpjCadastrado(connection: Connection, cnpj: string): Promise<boolean> {
  try {
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM clientes WHERE cnpj = ?',
      [cnpj]
    );

    const count = (rows as any[])[0].count;
    return count;
  } catch (error) {
    console.error('Erro ao verificar o CNPJ:', error);
    throw new Error('Erro ao acessar o banco de dados');
  }
}

export default verificaCnpjCadastrado;