interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
}

interface TableProps {
  data: Coin[];
}

export default function MarketTable({ data }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>24h Change</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.name}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td
              className={
                (coin.price_change_percentage_24h ?? 0) >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {(coin.price_change_percentage_24h ?? 0) >= 0 ? "↑ " : "↓ "}
              {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
