import Link from "next/link";
import type { Tag } from "@/types/note";
import css from "./SidebarNotes.module.css";
export const tags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
export default function SidebarNotes({}) {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag} notes
          </Link>
        </li>
      ))}
    </ul>
  );
}
