// src/components/BookForm.tsx
import React, { useState, useEffect } from 'react';
import { type Book } from '../types/Book';
import { createBook, updateBook } from '../services/bookApi';

interface BookFormProps {
  bookToEdit: Book | null; 
  onSave: () => void;
  onCancel: () => void;
}

const initialBookState: Omit<Book, 'id'> = {
  title: '',
  author: '',
  year: 0,
  isbn: '',
};

export const BookForm: React.FC<BookFormProps> = ({ bookToEdit, onSave, onCancel }) => {
  // Inicialização do estado com o objeto de livro vazio
  const [formData, setFormData] = useState<Book>(initialBookState as Book);

  // useEffect para carregar os dados do livro quando for uma EDIÇÃO
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit); // Carrega o objeto completo, incluindo o ID
    } else {
      setFormData(initialBookState as Book); // Limpa para um novo cadastro
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.id) { // Se tem ID, é Edição (UPDATE)
        await updateBook(formData);
        alert('Livro editado com sucesso!');
      } else { // Se não tem ID, é Criação (CREATE)
        const { id, ...newBookData } = formData;
        await createBook(newBookData);
        alert('Livro adicionado com sucesso!');
      }
      
      onSave(); // Chama o callback para fechar o formulário e recarregar a lista
    } catch (error) {
      console.error('Erro ao salvar o livro:', error);
      alert('Ocorreu um erro ao salvar. Verifique o console.');
    }
  };

  const isEditing = !!formData.id;

  return (
    <div className="book-form-overlay">
      <div className="book-form-container">
        <h2>{isEditing ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Autor:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Ano de Publicação:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year || ''}
              onChange={handleChange}
              min="1000"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Livro'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};