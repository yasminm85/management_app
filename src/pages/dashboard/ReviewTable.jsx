import {
  Card,
  CardBody,
  Input,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  PlusIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export function ReviewTable({ onBack }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "2024-01-12 Laporan Audit Jan.pdf",
      date: "2024-01-12",
      version: 1,
      size: "2.4 MB",
      uploadedAt: "12 Jan 2024",
      status: "Approved",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDate, setFileDate] = useState("");
  const isValid =
    fileDate &&
    fileName.startsWith(fileDate) &&
    /^\d{4}-\d{2}-\d{2}\s.+\..+$/.test(fileName);


  const saveFile = () => {
    setFiles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: fileName,
        date: fileDate,
        originalFile: true,
        version: 1,
        size: `${(Math.random() * 4 + 1).toFixed(2)} MB`,
        uploadedAt: new Date(fileDate).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Draft",
      },
    ]);

    setFileName("");
    setFileDate("");
    setShowModal(false);
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) &&
      (date ? f.date === date : true)
  );

  const handleDateChange = (value) => {
    setFileDate(value);

    if (!value) return;

    const cleanedName = fileName.replace(/^\d{4}-\d{2}-\d{2}\s*/, "");
    setFileName(`${value} ${cleanedName}`.trim());
  };

  return (
    <>
      <CardBody>
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

          {/* Add Evidence */}
          <Button
            size="sm"
            color="blue"
            className="flex items-center gap-2 shadow-md"
            onClick={() => setShowModal(true)}
          >
            <PlusIcon className="w-4 h-4" />
            Add Evidence
          </Button>
        </div>

        <Typography variant="h4" className="font-semibold text-gray-800 mb-1">
          Daftar File 
        </Typography>
        <Typography className="text-sm text-gray-500 mb-4">
          Evidence & dokumen pendukung hasil review
        </Typography>

        {/* Filter */}
        <div className="flex gap-4 mb-5">
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
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">File</th>
                <th className="py-3 px-4">Versi</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Ukuran</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredFiles.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-500"
                  >
                    <ArrowUpTrayIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    Belum ada evidence pada folder ini
                  </td>
                </tr>
              )}

              {filteredFiles.map((file, index) => (
                <tr
                  key={file.id}
                  className={`border-t transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } `}
                >
                  {/* File */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Evidence Document
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Version */}
                  <td className="py-3 px-4 text-center">
                    <Chip
                      value={`v${file.version}`}
                      size="sm"
                      className="bg-blue-100 text-blue-700"
                    />
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-center text-gray-700">
                    {file.uploadedAt}
                  </td>

                  {/* Size */}
                  <td className="py-3 px-4 text-center text-gray-700">
                    {file.size}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-center">
                    <Chip
                      value={file.status}
                      size="sm"
                      color={
                        file.status === "Approved"
                          ? "green"
                          : file.status === "Draft"
                            ? "amber"
                            : "gray"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-2xl border border-gray-200">

            {/* HEADER */}
            <div className="mb-4">
              <Typography variant="h6" className="font-semibold">
                Add Evidence
              </Typography>
              <Typography className="text-xs text-gray-500 mt-1">
                Format nama file harus mengikuti tanggal evidence
              </Typography>
            </div>


            {/* FORMAT INFO */}
            <div className="mb-5 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Typography className="text-xs text-blue-700 font-mono text-center">
                YYYY-MM-DD Nama File.ext
              </Typography>
            </div>
            <div className="mb-4">
              <Typography className="text-xs font-medium text-gray-700 mb-1">
                Upload File
              </Typography>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setFileName(file.name);
                }}
                className="w-full text-sm file:mr-3 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
              />

              <Typography className="text-[11px] text-gray-500 mt-1">
                Nama file harus mengikuti format standar
              </Typography>
            </div>

            {/* TANGGAL */}
            <div className="mb-4">
              <Typography className="text-xs font-medium text-gray-700 mb-1">
                Tanggal Evidence
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
                className="bg-gray-100 cursor-not-allowed"
                error={fileName && !isValid}
              />
              <Typography className="text-[11px] text-gray-500 mt-1">
                Nama file dibuat otomatis dari tanggal evidence.
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
