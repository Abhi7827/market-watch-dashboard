import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./Header";
import MarketTable from "./MarketTable";

interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
}

export default function App() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );

      if (!res.ok) throw new Error("API Error");

      const result: Coin[] = await res.json();
      setData(result.slice(0, 10));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={fetchMarketData}
        search={search}
        setSearch={setSearch}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && <MarketTable data={filteredData} />}
    </div>
  );
}
