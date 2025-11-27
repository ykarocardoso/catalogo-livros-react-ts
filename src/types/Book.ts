// src/types/Book.ts

/**
 * Define a estrutura de dados para um Livro.
 * O 'id' é opcional ao CRIAR um livro (pois o JSON Server o gera),
 * mas obrigatório ao LISTAR, EDITAR ou EXCLUIR.
 */
export interface Book {
  id?: number; // Opcional, será gerado pelo JSON Server
  title: string;
  author: string;
  year: number; // Opcional, pode ser 'string' se preferir flexibilidade.
  isbn: string; // Exemplo de campo único
}