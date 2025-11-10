import React from "react";
import { ALL_NOTES } from "@/lib/constants";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Tag } from "@/types/note";
import type { Metadata } from "next";
interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag: Tag | undefined =
    slug[0] === ALL_NOTES || !slug[0] ? undefined : (slug[0] as Tag);
  const pageTitle = tag ? `${tag} Notes` : "All Notes";

  const pageDescription = tag
    ? `Browse all notes tagged with ${tag} on NoteHub.`
    : "Discover and browse all available notes on NoteHub.";
  const slugPath = slug?.join("/") || ALL_NOTES;
  const pageUrl = `https://notehub.com/notes/${slugPath}`;

  return {
    title: pageTitle,
    description: pageDescription,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Обложка для сторінки ${pageTitle}`,
        },
      ],
      type: "website", // Используем 'website' для страницы-списка/фильтра
    },
  };
}

const NotesPage = async ({ params }: FilterPageProps) => {
  const { slug } = await params;
  const tag: Tag | undefined =
    slug[0] === ALL_NOTES || !slug[0] ? undefined : (slug[0] as Tag); // <-- Принудительное приведение к типу Tag
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { pages: 1, searchValue: "", tag }],
    queryFn: () => fetchNotes(``, 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
