import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotesProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  if (tag === 'all') {
    return {
      title: 'All Notes | NoteHub',
      description: 'Browse all notes.',
      openGraph: {
        title: 'All Notes | NoteHub',
        description: 'Browse all notes.',
        url: '/notes/filter/all',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'All Notes | NoteHub',
          },
        ],
        type: 'website',
      },
    };
  }

  return {
    title: `${tag} Notes | NoteHub`,
    description: `Browse notes in the ${tag} category.`,
    openGraph: {
      title: `${tag} Notes | NoteHub`,
      description: `Browse notes in the ${tag} category.`,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag,
        },
      ],
      type: 'website',
    },
  };
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
