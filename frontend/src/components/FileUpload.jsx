import API from "../api/axios";

function FileUpload({ fetchTasks }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      fetchTasks();

      e.target.value = "";

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Upload Failed"
      );
    }
  };

  return (
    <div className="card">
      <h3>
        Upload CSV/XLS/XLSX
      </h3>

      <input
        type="file"
        accept=".csv,.xls,.xlsx"
        onChange={handleUpload}
      />
    </div>
  );
}

export default FileUpload;