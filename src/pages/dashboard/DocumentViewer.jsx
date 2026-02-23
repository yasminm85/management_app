import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "@/context/AppContext";

export default function DocumentViewer() {
  const { backendUrl } = useContext(AppContent);
  const { fileId } = useParams();
  const location = useLocation();

  const parentId = new URLSearchParams(location.search).get("parentId");
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (!parentId) return;

    axios
      .get(`/api/nested/path/${parentId}`, { withCredentials: true })
      .then(res => setPath(res.data.path))
      .catch(console.error);
  }, [parentId]);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-xl shadow">

      {/* FILE VIEW */}
      <iframe
        src={`/api/nested/get-file/${fileId}`}
        className="flex-1 w-full rounded-t-xl"
        title="Document Viewer"
      />

      {/* FOOTNOTE */}
      <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-600">
        📁 Lokasi Dokumen:&nbsp;
        <span className="font-medium">
          {path.map(p => p.name).join(" > ")}
        </span>
      </div>
    </div>
  );
}