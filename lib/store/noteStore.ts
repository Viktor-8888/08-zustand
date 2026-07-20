import { create } from 'zustand';
import { CreateNoteRequest } from '@/types/note';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: CreateNoteRequest;
  setDraft: (note: CreateNoteRequest) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteRequest = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
