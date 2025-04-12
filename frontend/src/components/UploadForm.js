import React, { useState } from "react";
import axios from "axios";
import VisualTimeline from "./VisualTimeline";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [structure, setStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStructure([]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("song", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/music/analyze", formData);
      setStructure(res.data);
      setError("");
    } catch (err) {
      console.error("Upload error:", err.message);
      setError("Failed to analyze the song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>🎵 Upload a Song for Analysis</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{ marginBottom: "0.5rem" }}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {structure.length > 0 && (
        <>
          <div style={{ marginTop: "1rem" }}>
            <h3>🧠 Detected Song Structure:</h3>
            <ul>
              {structure.map((section, index) => (
                <li key={index}>
                  <strong>{section.label}</strong>:{" "}
                  {section.start.toFixed(2)}s – {section.end.toFixed(2)}s
                </li>
              ))}
            </ul>
          </div>

          <VisualTimeline structure={structure} />
        </>
      )}
    </div>
  );
};

export default UploadForm;
