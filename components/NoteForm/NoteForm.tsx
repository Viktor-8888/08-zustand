'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import css from './NoteForm.module.css';
import type { NoteTag, CreateNoteRequest } from '@/types/note';
import { createNote } from '../../lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      toast.success('Note created');
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const handleCancel = () => router.back();

  const handleSubmit = (formData: FormData) => {
    const values: CreateNoteRequest = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
    mutate(values);
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" disabled={isPending} className={css.submitButton}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
