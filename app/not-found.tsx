import css from "./Home.module.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  // Назва сторінки
  title: "404 | Сторінку не знайдено",

  // Короткий опис сторінки
  description:
    "На жаль, сторінка, яку ви шукаєте, не існує. Будь ласка, перевірте URL або поверніться на головну сторінку NoteHub.",

  // URL сторінки помилки
  url: "https://notehub.com/404",

  // Open Graph мета-теги
  openGraph: {
    title: "404 | Сторінку не знайдено (NoteHub)",
    description:
      "На жаль, сторінка, яку ви шукаєте, не існує. Перевірте посилання.",
    url: "https://localhost:3000/",
    siteName: "NoteHub",
    images: [
      {
        // Використовуємо загальну картинку Open Graph
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Page Not Found",
      },
    ],
    type: "website",
  },
};
const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
