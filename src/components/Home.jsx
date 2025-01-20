import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="order-button-container">
      <button className="order-button" onClick={() => navigate("/place-order")}>
        Place order
      </button>
    </div>
  );
}

export default Home;
