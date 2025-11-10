"use client";
import React from "react";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/dist/client/components/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";

export default function NotePreviewClients() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const noteId = params.id;
  const close = () => {
    router.back();
  };
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId!),
    enabled: !!noteId,
    refetchOnMount: false,
  });
  if (!noteId) {
    return (
      <Modal isOpen={true} onClose={close}>
        <ErrorMessage message="Помилка: Ідентифікатор нотатки відсутній у URL." />
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={close}>
        <div className={css.loading}>
          <Loader />
          <p>Завантаження деталей нотатки...</p>
        </div>
      </Modal>
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Сталася невідома помилка при завантаженні нотатки.";
    return (
      <Modal isOpen={true} onClose={close}>
        <ErrorMessage message={errorMessage} />
      </Modal>
    );
  }

  // 4. ПРЯМОЙ РЕНДЕРИНГ ДЕТАЛЕЙ НОТАТКИ
  if (note) {
    return (
      <Modal isOpen={true} onClose={close}>
        <div className={css.container}>
          <div className={css.item}>
            <button onClick={close} className={css.backBtn}>
              ← Назад
            </button>

            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>

            <div className={css.content}>{note.content}</div>

            <div className={css.date}>
              Создано: {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  // 5. Заметка не найдена (неуспешный запрос, но без ошибки сети)
  return (
    <Modal isOpen={true} onClose={close}>
      <ErrorMessage message="Заметка не найдена." />
    </Modal>
  );
}
