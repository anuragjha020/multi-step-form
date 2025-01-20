import { useNavigate } from "react-router-dom";
import "../styles/PageNotFound.css";

function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="pageNotFound-container">
      <p>Order placed successfully ✅</p>
      <div>
        <button
          type="button"
          className="home-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
