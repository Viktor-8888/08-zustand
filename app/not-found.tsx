import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'The page is not exist',

  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Sorry, the page you are looking for does not exist.',
    url: '/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
