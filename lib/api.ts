import axios from 'axios';
import type { Note, CreateNoteRequest } from '../types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag: string | undefined
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage: 12, tag },
  });
  return response.data;
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  const response = await axios.post<Note>('/notes', note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}
