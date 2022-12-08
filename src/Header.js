export default function Header({ handleChange, search }) {
  return (
    <header>
      <h1>Pokedex</h1>
      <input
        placeholder="Search"
        type="text"
        onChange={handleChange}
        value={search}
      />
    </header>
  );
}
