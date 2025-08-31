'use client';


// import { getNotes } from "@/lib/api";
import React, { useState } from 'react';
import css from './App.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import type { Note } from '../../types/note';

import { useDebounce } from 'use-debounce';


const PER_PAGE = 12;


const Notes: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedQuery] = useDebounce(query, 500);

  type FetchNotesResponse = { notes: Note[]; totalPages: number };
  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', { page, search: debouncedQuery }],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedQuery }) as Promise<FetchNotesResponse>,
    placeholderData: (prev) => prev,
  });



  const pageCount = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={value => {
          setQuery(value);
          setPage(1);
        }} />
        {pageCount > 1 && (
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data && Array.isArray(data.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Notes;
