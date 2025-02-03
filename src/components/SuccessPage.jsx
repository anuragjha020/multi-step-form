import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PageNotFound.css";

function SuccessPage() {
  const location = useLocation();

  const data = location.state;
  console.log("data on success page :", data);

  const navigate = useNavigate();
  return (
    <div className="pageNotFound-container">
      <p>Successful !! ✅</p>

      <div className="card">
        {data ? (
          <div className="field-name">
            <div className="avatar-container">
              <img src={data.avatar} alt="Avatar Preview" className="avatar" />
            </div>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>DOB:</strong> {data.dob}
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
