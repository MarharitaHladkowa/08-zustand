export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
  updatedAt: string;
}
export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// Тип для совместимости с компонентами, ожидающими getCategories() output
export interface CategoryType {
  id: string; // Будет именем тега (Tag Name)
  name: Tag;
}
