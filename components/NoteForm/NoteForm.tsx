"use client";

import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NewNote } from "../../types/note";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import { useNoteDraftStore } from "@/lib/store/noteStore";
export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description: "Create a new note or task quickly and organize your ideas.",

  openGraph: {
    title: "NoteHub — Your Ideal Space for Notes",
    description: "Create, edit, and share your ideas quickly and easily.",

    url: "/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Social Media Cover",
      },
    ],
    type: "website",
  },
};
interface OrderFormValues {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
const initialValues: OrderFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft } = useNoteDraftStore();
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

  const { mutate } = useMutation({
    mutationFn: async (newNote: NewNote) => {
      return createNote(newNote);
    },
    onSuccess() {
      router.push("/notes/filter/all");
    },
  });
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNote;
    mutate(values);
  };
  const handleCancel = () => router.push("/notes/filter/all");
  return (
    <form className={css.form} action={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className="css.text"
        />
      </label>
      <label className={css.label}>
        Content
        <textarea
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          className=" css.textarea"
        ></textarea>
      </label>

      <label className={css.label}>
        Tag
        <select
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          {TAG_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
