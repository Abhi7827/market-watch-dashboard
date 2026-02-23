interface HeaderProps {
    lastUpdated: string;
    onRefresh: () => void;
    search: string;
    setSearch: (value: string) => void;
  }
  
  export default function Header({
    lastUpdated,
    onRefresh,
    search,
    setSearch
  }: HeaderProps) {
    return (
      <>
        <h2>📈 Market Watch Dashboard</h2>
  
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
  
        <button onClick={onRefresh}>Refresh</button>
  
        {lastUpdated && <p>Last Updated: {lastUpdated}</p>}
      </>
    );
  }