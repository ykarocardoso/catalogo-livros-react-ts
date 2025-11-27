// src/services/bookApi.ts
import { type Book } from '../types/Book'; // Importação de tipo corrigida

const API_BASE_URL = 'http://localhost:3001/books'; 

/**
 * Lógica: Read (Listagem)
 */
export async function getBooks(): Promise<Book[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error('Falha ao buscar os livros.');
  }

  return response.json();
}

/**
 * Lógica: Create (Criação)
 */
export async function createBook(newBook: Omit<Book, 'id'>): Promise<Book> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error('Falha ao adicionar o livro.');
  }

  return response.json();
}

/**
 * Lógica: Update (Edição)
 */
export async function updateBook(book: Book): Promise<Book> {
  // O ID do livro é adicionado à URL para o JSON Server saber qual livro editar
  const response = await fetch(`${API_BASE_URL}/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(`Falha ao editar o livro com ID ${book.id}.`);
  }

  return response.json();
}

/**
 * Lógica: Delete (Exclusão)
 */
export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Falha ao excluir o livro com ID ${id}.`);
  }
}