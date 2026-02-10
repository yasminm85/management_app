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

export function ReviewTable({ reviewId, onBack }) {
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

  const formatRegex = /^\d{4}-\d{2}-\d{2}\s.+$/;
  const isValid = formatRegex.test(fileName);

  const saveFile = () => {
    const dateFromName = fileName.substring(0, 10);

    setFiles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: fileName,
        date: dateFromName,
        version: 1,
        size: `${(Math.random() * 4 + 1).toFixed(2)} MB`,
        uploadedAt: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Draft",
      },
    ]);

    setFileName("");
    setShowModal(false);
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) &&
      (date ? f.date === date : true)
  );

  return (
    <>
      <Card className="m-6 shadow-md">
        <CardBody>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Kembali ke Struktur File
            </button>

            <Button
              size="sm"
              color="blue"
              className="flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <PlusIcon className="w-4 h-4" />
              Add Evidence
            </Button>
          </div>

          <Typography variant="h5" className="mb-1">
            Review {reviewId}
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
                    className={`border-t transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
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
      </Card>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
            <Typography variant="h6" className="mb-1">
              Add Evidence
            </Typography>
            <Typography className="text-sm text-gray-600 mb-4">
              Format nama file <b>WAJIB</b>:
              <br />
              <span className="font-mono text-xs">
                YYYY-MM-DD Nama File.ext
              </span>
            </Typography>

            <Input
              label="Nama File"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              error={fileName && !isValid}
            />

            {fileName && !isValid && (
              <Typography className="text-xs text-red-600 mt-1">
                ❌ Format tidak valid
              </Typography>
            )}

            <div className="flex justify-end gap-2 mt-6">
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
