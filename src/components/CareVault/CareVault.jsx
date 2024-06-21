import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CareVault() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.careVault.files);

  // NEED TO COME BACK TO THIS AND REFACTOR LOVEDONEID !!
  // FILE UPLOADS!!
  const upload = () => {
    dispatch({ type: "UPLOAD_FILE", payload: { file, lovedOneId: 1 } });
  };

  // DELETE FILES!!
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_FILE", payload: { id } });
  };

  // DOWNLOAD FILES!!
  const handleDownload = (id, fileName) => {
    window.open(`/api/care-vault/download/${id}`, '_blank');
  };

  // RETRIEVES LIST OF ALL FILES!!
  useEffect(() => {
    dispatch({ type: "FETCH_FILES" });
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" onClick={upload}>
        Upload
      </button>

      <div>
        {files.map((file) => (
          <div key={file.id}>
            <span>{file.document_name}</span>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
            <button onClick={() => handleDownload(file.id, file.document_name)}>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CareVault;
