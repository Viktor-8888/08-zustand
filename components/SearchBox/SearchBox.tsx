import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (newValue: string) => void;
}
export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search notes"
    />
  );
}
