const { useState } = React;

const tasks = [
  "Onboarding Call",
  "Google Search Console Access",
  "Google Analytics Access",
  "Website Access",
  "Technical Audit",
  "Anchor Text and Semantic Analysis",
  "Competitor Analysis",
  "Anchor Text / URL Mapping",
  "Google Data Studio Report + Local Reporting Suite",
  "Site Level Optimization",
  "On Page Optimization",
  "Content Creation",
  "Content Publishing",
  "Premium Press Release",
  "Authority Niche Placements",
  "Review Management",
  "Index Links",
  "Video Recap",
];

const Table = () => {
  const [values, setValues] = useState(
    Array(tasks.length)
      .fill()
      .map(() => ["", "", "", "", ""])
  );

  const handleEdit = (taskIndex, columnIndex, newValue) => {
    const newValues = [...values];
    newValues[taskIndex][columnIndex] = newValue;
    setValues(newValues);
  };

  const handleSave = () => {
    const dataToPost = tasks.map((task, i) => ({
      task,
      values: values[i],
    }));

    console.log("Data ready for API submission:", dataToPost);
    alert("Data ready to submit " + JSON.stringify(dataToPost));
  };

  const styles = {
    container: {
      maxWidth: "100%",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    button: {
      backgroundColor: "green",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      marginBottom: "16px",
      cursor: "pointer",
      border: "none",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #d1d5db",
    },
    tableHead: {
      backgroundColor: "#e5e7eb",
    },
    taskCell: {
      padding: "8px",
      fontWeight: "500",
      width: "25%",
    },

    input: {
      width: "97%",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleSave}>
        Submit Data
      </button>

      <table border={1} style={styles.table}>
        <thead>
          <tr style={styles.tableHead}>
            <th>MONTH 1</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9fafb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <td style={styles.taskCell}>{task}</td>
              {[0, 1, 2, 3, 4].map((colIndex) => (
                <td key={colIndex} style={styles.tableCell}>
                  <input
                    type="text"
                    value={values[index][colIndex]}
                    onChange={(e) =>
                      handleEdit(index, colIndex, e.target.value)
                    }
                    style={styles.input}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Table />);
