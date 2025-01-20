import { useNavigate } from "react-router-dom";
import "../styles/PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="pageNotFound-container">
      <p>❌ 404 : page not found 🥺</p>
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

export default PageNotFound;
