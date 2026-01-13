import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const colors = ["blue", "black", "green", "white", "red", "yellow"];

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full px-4 py-2 flex gap-2">
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setTheme(c)}
          className={`w-5 h-5 rounded-full border ${
            theme === c ? "scale-125" : ""
          }`}
          style={{ backgroundColor: themes[c]["--primary"] }}
        />
      ))}
    </div>
  );
}
