// src/pages/BookList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { type Book } from '../types/Book';
import { getBooks, deleteBook } from '../services/bookApi';
import { BookCard } from '../components/BookCard';
import { BookForm } from '../components/BookForm';

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao carregar os livros:', error);
      alert('Não foi possível conectar ao servidor. Verifique se o JSON Server está rodando (npm run server).');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Lógica de Exclusão (Delete)
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
        alert('Livro excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir o livro.');
      }
    }
  };

  // Lógica para lidar com a Edição (UPDATE)
  const handleEdit = (book: Book) => {
      setEditingBook(book);
  };

  // Lógica para lidar com a conclusão de um formulário (Criação ou Edição)
  const handleFormSubmit = () => {
    setEditingBook(null); // Fecha o formulário de edição
    loadBooks(); // Recarrega a lista para mostrar a mudança
  };

  if (isLoading) {
    return <h2>Carregando catálogo...</h2>;
  }

  return (
    <div className="book-list-page">
      <h1 className="main-title">📚 Meu Catálogo de Livros</h1>
      
      {/* Botão para abrir o formulário em modo de CRIAÇÃO */}
      <button className="add-button" onClick={() => setEditingBook({} as Book)}>
        Adicionar Novo Livro
      </button>

      {/* Renderiza o formulário se editingBook não for null */}
      {editingBook && (
        <BookForm 
          bookToEdit={editingBook} 
          onSave={handleFormSubmit} 
          onCancel={() => setEditingBook(null)}
        />
      )}

      <div className="books-grid">
        {books.length === 0 ? (
          <p>Nenhum livro cadastrado. Adicione um!</p>
        ) : (
          books.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onEdit={handleEdit} // Usa a nova função de handler
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};