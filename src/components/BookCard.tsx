// src/components/BookCard.tsx
import React from 'react';
import { type Book } from '../types/Book';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  
  // Função que será chamada ao clicar em Editar
  const handleEditClick = () => {
    // É crucial passar o ID correto na edição.
    // Criamos uma cópia para garantir que o objeto está fresco.
    const bookToEdit: Book = { ...book };
    onEdit(bookToEdit);
  }

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Ano: {book.year}</p>
      <div className="actions">
        {/* Usamos o novo handler que garante a passagem do objeto com ID */}
        <button className="edit-button" onClick={handleEditClick}>Editar</button> 
        <button className="delete-button" onClick={() => book.id && onDelete(book.id)}>Excluir</button>
      </div>
    </div>
  );
};