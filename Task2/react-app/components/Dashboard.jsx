import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsperPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((x) =>
    x.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsperPage);
  const startIndex = (currentPage - 1) * itemsperPage;
  const currentData = filteredUsers.slice(
    startIndex,
    startIndex + itemsperPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        paddingBottom: "3rem",
      }}
    >
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom border-white border-opacity-25">
          <div className="d-flex flex-column flex-md-row align-items-center">
            <h1 className="text-white ">User Dashboard</h1>
            <div className="ms-md-auto mt-3 mt-md-0">
              <div className="input-group">
                <span className="input-group-text bg-white text-black">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Search users by name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="alert alert-danger mb-4">
            Error loading users: {error}
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {currentData.length > 0 ? (
            currentData.map((user) => (
              <div className="col" key={user.id}>
                <div
                  className="card h-100 border-0 shadow"
                  style={{
                    borderRadius: "1rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="card-header border-0"
                    style={{
                      background:
                        "linear-gradient(to right,rgb(14, 45, 118), #8E54E9)",
                      padding: "1.5rem 1rem",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <h5 className="card-title mb-0 text-white">
                        {user.name}
                      </h5>
                    </div>
                  </div>
                  <div className="card-body bg-white p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="bg-light rounded-circle p-2 me-3"
                        style={{ color: "#4776E6" }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                      <div>
                        <h6 className="mb-0">Email</h6>
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div
                        className="bg-light rounded-circle p-2 me-3"
                        style={{ color: "#8E54E9" }}
                      >
                        <FontAwesomeIcon icon={faPhone} />
                      </div>
                      <div>
                        <h6 className="mb-0">Phone</h6>
                        <p className="text-muted mb-0">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-4">
              <div className="alert alert-warning fw-bold py-3 shadow">
                No users found matching your search
              </div>
            </div>
          )}
        </div>

        {filteredUsers.length > 0 && (
          <div className="d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link shadow-sm border-0"
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{
                      borderRadius: "0.5rem 0 0 0.5rem",
                      background: currentPage === 1 ? "#e9ecef" : "white",
                      color: currentPage === 1 ? "#6c757d" : "#8E54E9",
                    }}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link border-0 shadow-sm"
                        onClick={() => handlePageChange(page)}
                        style={{
                          background:
                            currentPage === page
                              ? "linear-gradient(to right, #4776E6, #8E54E9)"
                              : "white",
                          color: currentPage === page ? "white" : "#6c757d",
                        }}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link shadow-sm border-0"
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{
                      borderRadius: "0 0.5rem 0.5rem 0",
                      background:
                        currentPage === totalPages ? "#e9ecef" : "white",
                      color: currentPage === totalPages ? "#6c757d" : "#8E54E9",
                    }}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
