import "../styles/Modal.css";

const SummaryModal = ({ isModalOpen, onClose, formData, onSubmit }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Review Your Details</h2>

        <div className="modal-body">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {formData.dob}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>City:</strong> {formData.city}
          </p>
          <p>
            <strong>State:</strong> {formData.state}
          </p>
          <p>
            <strong>PIN Code:</strong> {formData.pin}
          </p>
        </div>

        <div className="modal-footer">
          <button className="edit-btn" onClick={onClose}>
            Edit
          </button>
          <button
            className="confirm-btn"
            onClick={() => {
              onSubmit(formData);
              onClose();
            }}
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
