import axios from "axios";
import type { Note } from '../types/note';

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

axios.defaults.baseURL = "https://next-docs-api.onrender.com";

export const getNotes = async () => {
  const res = await axios.get<NoteListResponse>("/notes");
  return res.data;
};


// код з ДЗ 5
const API_URL = 'https://notehub-public.goit.study/api/';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
    Authorization: `Bearer ${token}`,
    },
});

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
    const { page = 1, perPage = 12, search = '' } = params;
    const response = await axiosInstance.get<FetchNotesResponse>('/notes', { params: { page, perPage, search } });
    return response.data;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: string;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
const response = await axiosInstance.post<Note>('/notes', data);
    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
const response = await axiosInstance.delete<Note>(`/notes/${id}`);
    return response.data;
}

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};