"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import type { Note } from "@/types/note";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";
import type { Tag } from "@/types/note";

interface NotesClientProps {
  tag?: Tag;
}
export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  const handleChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  useEffect(() => {
    if (isSuccess && query && notes.length === 0) {
      toast.error(`No notes found for your request: "${query}".`);
    }
  }, [isSuccess, notes.length, query]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageClick}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          + create note
        </Link>
      </header>
      <NoteList notes={notes} />
      <div>
        {isLoading && <Loader />}

        {isError && (
          <ErrorMessage
            message={
              error?.message || "An unexpected error occurred during search."
            }
          />
        )}
        {!isLoading && !isError && (
          <>
            {notes.length > 0 && (
              <div className={css.resultsMessage}>
                <p className={css.resultsText}>
                  Found {notes.length} notes.
                  <span className={css.resultsTextSecondary}>
                    (Page {page} of {totalPages})
                  </span>
                </p>
              </div>
            )}
          </>
        )}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
