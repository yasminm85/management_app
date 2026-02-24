import {
  CardBody,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useContext, useEffect } from "react";
import {
  PlusIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "@/context/AppContext";

export function ReviewTable({ parentId, onBack, path }) {
  const { backendUrl } = useContext(AppContent);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [newFile, setNewFile] = useState({
    name: "",
    file: null,
  });
  const [fileCategory, setFileCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [openViewer, setOpenViewer] = useState(false);
  const [activeFileId, setActiveFileId] = useState(null);
  const [path1, setPath] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDate, setFileDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [parentFolderName, setParentFolderName] = useState("");
  const isValid =
    fileDate &&
    fileCategory &&
    fileName.startsWith(fileDate) &&
    /^\d{4}-\d{2}-\d{2}\s.+\..+$/.test(fileName);

  const buildFileName = () => {
    if (!fileDate || !newFile.file) return "";

    const ext = newFile.file.name.split(".").pop();
    const { level1, level2 } = getFolderLevels();

    return [
      fileDate,
      level1,
      getCategoryCode(fileCategory),
      level2,
    ]
      .filter(Boolean)
      .join(" ")
      .concat(`.${ext}`);
  };

  const cleanLevel2Name = (name = "") => {
    return name
      .replace(/^cabang\s+/i, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const FILE_CATEGORIES = [
    "Proposal Audit",
    "Surat Perintah Tugas",
    "Laporan Hasil Audit Sementara",
    "Laporan Hasil Audit Final",
    "Arahan DU ke Auditee",
    "Arahan DU ke Unit Terkait",
    "Kertas Kerja Audit",
    "Tindak Lanjut",
    "Lainnya",
  ];

  const FILE_CATEGORY_MAP = {
    "Proposal Audit": "PA",
    "Surat Perintah Tugas": "SPT",
    "Laporan Hasil Audit Sementara": "LHAS",
    "Laporan Hasil Audit Final": "LHAF",
    "Arahan DU ke Auditee": "ADU-Auditee",
    "Arahan DU ke Unit Terkait": "ADU-UT",
    "Kertas Kerja Audit": "KKA",
    "Tindak Lanjut": "TinJut",
    "Lainnya": "LAIN",
  };

  const getCategoryCode = (category) => {
    return FILE_CATEGORY_MAP[category] || category;
  };

  const fetchFiles = async () => {
    if (!parentId) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${backendUrl}/api/nested/files/${parentId}`,
        { withCredentials: true }
      );


      const rawFiles =
        res.data?.item ||
        res.data?.files ||
        res.data?.data ||
        [];

      if (!Array.isArray(rawFiles)) {
        console.error("Expected array, got:", res.data);
        setFiles([]);
        return;
      }

      const transformedFiles = rawFiles.map(file => ({
        id: file._id,
        fileId: file.fileId,
        name: file.name,
        date: file.tanggal_file
          ? new Date(file.tanggal_file).toISOString().split("T")[0]
          : "",
        size: file.size ?? null,
        uploadedAt: new Date(file.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));

      setFiles(transformedFiles);
    } catch (err) {
      console.error("Gagal fetch files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (parentId) {
      fetchFiles();
    }
  }, [parentId]);

  const getFolderLevels = () => {
    if (!path || path.length < 2) {
      return { level1: "", level2: "" };
    }

    return {
      level1: path[path.length - 2]?.name || "",
      level2: path[path.length - 1]?.name || "",
    };
  };

  useEffect(() => {
    if (!fileDate || !newFile.file || !fileCategory) return;

    const ext = newFile.file.name.split(".").pop();
    const { level1, level2 } = getFolderLevels();

    const cleanLevel2 = cleanLevel2Name(level2);

    const finalName = [
      fileDate,
      level1,
      getCategoryCode(fileCategory),
      cleanLevel2,
    ]
      .filter(Boolean)
      .join(" ")
      .concat(`.${ext}`);

    setFileName(finalName);
  }, [fileDate, fileCategory, newFile.file, path]);

  const formatSize = (bytes) => {
    if (!bytes && bytes !== 0) return "";

    const mb = bytes / (1024 * 1024);
    return mb < 1
      ? `${Math.round(bytes / 1024)} KB`
      : `${mb.toFixed(2)} MB`;
  };

  const saveFile = async () => {
    if (!fileName || !newFile.file) {
      toast.error("Nama file dan file wajib diisi");
      return;
    }

    if (!isValid) {
      toast.error("Format nama file tidak valid");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", fileName);
      formData.append("file_nested", newFile.file);
      formData.append("parentId", parentId);
      formData.append("type", "file");
      formData.append("tanggal_file", fileDate);

      const { data } = await axios.post(
        backendUrl + "/api/nested/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("File berhasil ditambahkan!");
        fetchFiles();

        setFileName("");
        setFileDate("");
        setNewFile({ name: "", file: null });
        setShowModal(false);
      } else {
        toast.error(data.message || "Gagal menyimpan file");
      }

    } catch (err) {
      console.error("Gagal upload file:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Gagal upload file");
    }
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) &&
      (date ? f.date === date : true)
  );

  const handleDateChange = (value) => {
    setFileDate(value);
  };

  const handleOpenFile = async (fileId) => {
    setActiveFileId(fileId);
    setOpenViewer(true);

    try {
      const res = await axios.get(
        `${backendUrl}/api/nested/name/${parentId}`,
        { withCredentials: true }
      );
      setPath(res.data.path1 || []);
    } catch (err) {
      console.error("Gagal ambil path", err);
    }
  };

  useEffect(() => {
    if (path?.length > 1) {
      setParentFolderName(path[path.length - 2].name);
    }
  }, [path]);

  const auditTitle = () => {
    if (!path || path.length < 2) return "";

    const level1 = path[path.length - 2]?.name;
    const level2 = path[path.length - 1]?.name;

    return `${level1} ${level2}`;
  };

  return (
    <>
      <CardBody className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="
      flex items-center gap-2 px-4 py-2
      rounded-full bg-blue-50 text-blue-700
      hover:bg-blue-100 hover:gap-3
      transition-all duration-200
      shadow-sm
    "
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
              ←
            </span>
            <span className="text-sm font-medium">
              Kembali ke Struktur File
            </span>
          </button>

          {/* KETERANGAN LOKASI AUDIT */}
          {auditTitle() && (
            <div className="mb-2 flex justify-center">
              <div className="rounded-full shadow-sm">
                <span className="text-base md:text-lg font-bold text-indigo-400 tracking-wide">
                  {auditTitle()}
                </span>
              </div>
            </div>
          )}

          <Button
            size="sm"
            color="blue"
            className="flex items-center gap-2 shadow-md"
            onClick={() => setShowModal(true)}
          >
            <PlusIcon className="w-4 h-4" />
            Add File
          </Button>
        </div>



        <Typography variant="h4" className="font-semibold text-gray-800 mb-1">
          Daftar File
        </Typography>

        <Typography className="text-sm text-gray-500 mb-4">
          File pendukung hasil review
        </Typography>

        {/* Filter */}
        <div className="flex gap-4 mb-5 ">
          <Input
            label="Cari nama file"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Input
            type="date"
            label="Filter tanggal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-blue-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-blue-900 ">
                  Nama File
                </th>
                <th className="py-3 px-4 text-center font-semibold text-blue-900">
                  Tanggal
                </th>
                <th className="py-3 px-4 text-center font-semibold text-blue-900">
                  Ukuran
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-50">
              {!loading && filteredFiles.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                      <ArrowUpTrayIcon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      Belum ada file
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Upload dokumen untuk melengkapi audit
                    </div>
                  </td>
                </tr>
              )}

              {!loading && filteredFiles.map((file) => (
                <tr key={file.id}>
                  {/* FILE */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 group">
                      <div
                        onClick={() => handleOpenFile(file.fileId)}
                        className="
        h-10 w-10
        rounded-xl
        bg-gradient-to-br from-green-500 to-indigo-500
        flex items-center justify-center
        shadow-sm
        cursor-pointer
        transition-all duration-200
        group-hover:scale-105
        group-hover:shadow-md
      "
                      >
                        <DocumentTextIcon
                          className="
          w-5 h-5 text-white
          transition-colors
          group-hover:text-yellow-200
        "
                        />
                      </div>

                      <div>
                        <div className="font-medium text-gray-900 ">
                          {file.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="py-4 px-4 text-center text-gray-700">
                    {file.date}
                  </td>

                  {/* SIZE */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-black-700">
                      {formatSize(file.size)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openViewer && (
          <div className="fixed inset-0 z-50 bg-black/40 flex flex-col">
            {/* HEADER */}
            <div className="bg-white px-4 py-2 flex justify-between items-center border-b">
              <span className="text-sm font-semibold">Preview Dokumen</span>
              <button
                onClick={() => setOpenViewer(false)}
                className="text-sm text-red-500 hover:underline"
              >
                Tutup
              </button>
            </div>

            {/* VIEWER */}
            <iframe
              src={`${backendUrl}/api/nested/get-file/${activeFileId}`}
              className="flex-1 w-full bg-gray-100"
              title="Document Viewer"
            />

            {/* FOOTER */}
            <div className="bg-gray-50 border-t px-4 py-2 text-xs text-gray-600">
              Lokasi Dokumen:&nbsp;
              {path1.map((p, i) => (
                <span key={p._id}>
                  {p.name}
                  {i < path1.length - 1 && " > "}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardBody>



      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-2xl border border-gray-200">

            {/* HEADER */}
            <div className="mb-4">
              <Typography variant="h6" className="font-semibold">
                Add File
              </Typography>
              <Typography className="text-xs text-gray-500 mt-1">
                Format nama file harus mengikuti tanggal yang terdapat dalam file.
              </Typography>
            </div>

            {/* FORMAT INFO */}
            <div className="mb-5 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Typography className="text-xs text-blue-700 font-mono text-center">
                YYYY-MM-DD Nama File.ext
              </Typography>
            </div>
            <div className="mb-4">
              <div className="mb-4">
                <Typography className="text-xs font-medium text-gray-700 mb-1">
                  Kategori Dokumen
                </Typography>

                <select
                  value={fileCategory}
                  onChange={(e) => setFileCategory(e.target.value)}
                  className="
      w-full px-3 py-2 rounded-lg border
      focus:outline-none focus:ring-2 focus:ring-blue-400
      text-sm
    "
                >
                  <option value="">-- Pilih Kategori --</option>
                  {FILE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <Typography className="text-xs font-medium text-gray-700 mb-1">
                Upload File
              </Typography>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                // disabled={!fileDate || !fileCategory}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setNewFile({ ...newFile, file });

                  const ext = file.name.split(".").pop();
                  const { level1, level2 } = getFolderLevels();
                  const cleanLevel2 = cleanLevel2Name(level2);

                  const finalName = [
                    fileDate,
                    level1,
                    getCategoryCode(fileCategory),
                    cleanLevel2,
                  ]
                    .filter(Boolean)
                    .join(" ")
                    .concat(`.${ext}`);

                  setFileName(finalName);
                }}
                className="
    w-full text-sm
    file:mr-3 file:py-2 file:px-4
    file:rounded-lg file:border-0
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
    disabled:opacity-50
  "
              />

              <Typography className="text-[11px] text-gray-500 mt-1">
                Nama file harus mengikuti format standar
              </Typography>
            </div>

            {/* TANGGAL */}
            <div className="mb-4">
              <Typography className="text-xs font-medium text-gray-700 mb-1">
                Tanggal Terbit Dokumen
              </Typography>
              <input
                type="date"
                value={fileDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="
            w-full px-3 py-2 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-blue-400
            transition
          "
              />
              <Typography className="text-[11px] text-gray-500 mt-1">
                Tanggal ini <b>harus sama</b> dengan tanggal di nama file
              </Typography>
            </div>

            {/* NAMA FILE */}
            <div className="mb-1">
              <Input
                label="Nama File (Auto)"
                value={fileName}
                readOnly
                className="bg-gray-100 cursor-not-allowed "
                error={!!fileName && !isValid}
              />
              <Typography className="text-[11px] text-gray-500 mt-1">
                Nama file dibuat otomatis dari tanggal terbit dokumen.
                Jika format tidak sesuai, file <b>tidak bisa disimpan</b>.
              </Typography>
            </div>

            {fileName && !isValid && (
              <Typography className="text-xs text-red-600 mt-1">
                ❌ Format tidak valid atau tanggal tidak sesuai
              </Typography>
            )}

            {/* ACTION */}
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button variant="text" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button color="blue" disabled={!isValid} onClick={saveFile}>
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}