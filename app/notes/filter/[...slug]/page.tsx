import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ searchParams, params }: NotesProps) => {
  const { search = '', page = '1' } = await searchParams;
  const pageNumber = Number(page) || 1;
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, pageNumber, tag],
    queryFn: () => fetchNotes(search, pageNumber, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
