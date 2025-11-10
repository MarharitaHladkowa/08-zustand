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

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
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
