import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import {
  FolderIcon,
} from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { AppContent } from "@/context/AppContext";
import axios from "axios";

export function Home() {
  const { backendUrl } = useContext(AppContent);
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [matrix, setMatrix] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 10 },
    (_, i) => currentYear - i
  );
  useEffect(() => {
    axios.get(
      `${backendUrl}/api/dashboard/audit-matrix?year=${year}`,
      { withCredentials: true }
    ).then(res => setMatrix(res.data));
  }, [year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          backendUrl + "/api/nested/total",
          { withCredentials: true }
        );

        const sortedData = (res.data.fileCount || [])
          .sort((a, b) => a.parentName.localeCompare(b.parentName));

        setData(sortedData);
      } catch (err) {
        console.error("Gagal ambil activity", err);
      }
    };

    fetchData();
  }, [backendUrl]);

  const getStatusConfig = (fulfilled, total) => {
    const percent = Math.round((fulfilled / total) * 100);

    if (percent === 100) {
      return {
        label: "Lengkap",
        bar: "bg-green-500",
        badgeBg: "bg-green-50",
        badgeText: "text-green-700",
      };
    }

    if (percent > 0) {
      return {
        label: "Sebagian",
        bar: "bg-amber-400",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-700",
      };
    }

    return {
      label: "Belum Ada",
      bar: "bg-red-500",
      badgeBg: "bg-red-50",
      badgeText: "text-red-700",
    };
  };

  const dummyMatrix = [
    {
      cabang: "Cabang Jakarta",
      fulfilled: 8,
      total: 8,
      status: "hijau",
    },
    {
      cabang: "Cabang Bandung",
      fulfilled: 6,
      total: 8,
      status: "kuning",
    },
    {
      cabang: "Cabang Surabaya",
      fulfilled: 3,
      total: 8,
      status: "merah",
    },
    {
      cabang: "Cabang Medan",
      fulfilled: 7,
      total: 8,
      status: "kuning",
    },
  ];

  const statisticsCards = data.map((item, index) => ({
    id: item.parentId,
    title: item.parentName,
    value: item.totalFolders,
    totalFiles: item.totalFiles,
    icon: FolderIcon,
    footer: {
      value: "Folder",
      label: "aktif",
      color: "text-blue-500",
    },
  }));



  return (
    <div className="mt-12 space-y-10">

      <div>
        <Typography variant="h2" className="font-bold text-gray-800">
          Dashboard Audit SPI Files
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCards.map(({ id, icon, title, value, totalFiles }) => (
          <div
            key={id}
          >
            <StatisticsCard
              title={title}
              value={value}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-600">
                    Total File
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-0.5 text-sm font-bold text-blue-700">
                    {totalFiles}
                  </span>
                </div>

              }
            />
          </div>
        ))}

      </div>

      {/* HEADER MATRKS + FILTER TAHUN */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" className="font-bold text-gray-800">
          Matriks Pemenuhan Dokumen Audit Operasional
        </Typography>

        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
          <span className="text-sm font-semibold text-blue-700">
            Tahun
          </span>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="
        max-h-32 overflow-y-auto
        text-sm font-semibold
        bg-white text-blue-700
        border border-blue-200
        rounded-md px-2 py-1
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* MATRIX CARD */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {dummyMatrix.map((item) => {
          const percent = Math.round((item.fulfilled / item.total) * 100);
          const status = getStatusConfig(item.fulfilled, item.total);

          return (
            <div
              key={item.cabang}
              className="
          bg-white rounded-2xl p-5
          shadow-sm hover:shadow-lg
          transition-all duration-300
          hover:-translate-y-1
        "
            >
              {/* HEADER */}
              <div className="flex items-start justify-between mb-3">
                <Typography className="font-bold text-gray-800">
                  {item.cabang}
                </Typography>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${status.badgeBg} ${status.badgeText}`}
                >
                  {status.label}
                </span>
              </div>

              {/* INFO */}
              <Typography className="text-sm text-gray-500 mb-2">
                {item.fulfilled} dari {item.total} dokumen terpenuhi
              </Typography>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`${status.bar} h-2 rounded-full transition-all duration-700`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* PERCENT */}
              <Typography className="text-right text-xs text-gray-400 mt-2">
                {percent}%
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
