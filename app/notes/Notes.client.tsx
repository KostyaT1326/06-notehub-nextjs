'use client';

import React, { useState } from 'react';
import css from './NotesClient.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';


const NotesClient = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    React.useEffect(() => {
      const handler = setTimeout(() => {
        setQuery(searchInput);
        setPage(1);
      }, 400);
      return () => clearTimeout(handler);
    }, [searchInput]);

    const { data } = useQuery({
        queryKey: ["notes", page, query],
        queryFn: () => fetchNotes({page, search: query}),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    const pageCount = data?.totalPages || 0;

    return (
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchInput} onChange={setSearchInput} />
          {pageCount > 1 && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={() => setModalIsOpen(true)}>
            Create note +
          </button>
        </header>
        {data && Array.isArray(data.notes) && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <NoteForm onCancel={() => setModalIsOpen(false)} />
        </Modal>
      </div>
    );
};

export default NotesClient;
