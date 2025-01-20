import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PageNotFound.css";

function SuccessPage() {
  const location = useLocation();
  const data = location.state;
  console.log("data", data);

  const navigate = useNavigate();
  return (
    <div className="pageNotFound-container">
      <p>Order placed successfully ✅</p>

      <div className="card">
        {data ? (
          <div>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>City:</strong> {data.city}
            </p>
            <p>
              <strong>State:</strong> {data.state}
            </p>
            <p>
              <strong>PIN:</strong> {data.pin}
            </p>
          </div>
        ) : (
          <p>No data received!</p>
        )}
      </div>
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
