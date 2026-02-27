import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  CardBody
} from "@material-tailwind/react";
import {
  FolderIcon,
} from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { AppContent } from "@/context/AppContext";
import axios from "axios";

export function Home() {
  const { backendUrl } = useContext(AppContent);
  const [year, setYear] = useState(new Date().getFullYear());
  const [summaryData, setSummaryData] = useState([]);
  const [operasionalData, setOperasionalData] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [openYear, setOpenYear] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 20 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    if (!operasionalData.length) {
      setMatrix([]);
      return;
    }

    const fetchMatrix = async () => {
      try {
        const results = await Promise.all(
          operasionalData.map(async (item) => {
            const res = await axios.get(
              `${backendUrl}/api/nested/detection-completed/${item.parentId}`,
              { withCredentials: true }
            );

            return {
              cabang: item.parentName,
              fulfilled: res.data.fulfilled,
              total: res.data.totalKategori,
              percent: res.data.percent,
            };
          })
        );

        setMatrix(results);
      } catch (err) {
        console.error("Gagal ambil matrix", err);
        setMatrix([]);
      }
    };

    fetchMatrix();
  }, [operasionalData, backendUrl]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          backendUrl + "/api/nested/total",
          { withCredentials: true }
        );

        const sorted = (res.data.fileCount || [])
          .sort((a, b) => a.parentName.localeCompare(b.parentName));

        setSummaryData(sorted);
      } catch (err) {
        console.error("Gagal ambil summary", err);
      }
    };

    fetchSummary();
  }, [backendUrl]);

  useEffect(() => {
    const fetchOperasional = async () => {

      setOperasionalData([]);
      setMatrix([]);

      try {
        const res = await axios.get(
          backendUrl + "/api/nested/operasional-folder",
          {
            params: { year },
            withCredentials: true,
          }
        );

        const mapped = (res.data.folders || []).map(f => ({
          parentId: f._id,
          parentName: f.name,
        }));

        setOperasionalData(mapped);
      } catch (err) {
        console.error("Gagal ambil folder operasional", err);
      }
    };

    fetchOperasional();
  }, [backendUrl, year]);


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


  const statisticsCards = summaryData.map((item, index) => ({
    id: item.parentId,
    title: item.parentName,
    value: item.totalFolders,
    totalFiles: item.totalFiles,
    icon: FolderIcon,
    iconLabel: "Total Folder",
    footer: {
      value: "Folder",
      label: "aktif",
      color: "text-blue-500",
    },
  }));



  return (
    <CardBody
      className="
        relative
        h-[80vh]
        flex flex-col
        rounded-3xl
        bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
        border border-white/60
        shadow-[0_20px_60px_rgba(59,130,246,0.25)]
        overflow-hidden
      "
    >
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative mt-8 space-y-10">
        <div>
          <Typography
            variant="h2"
            className="font-bold text-3xl md:text-4xl tracking-wide text-gray-800 relative"
          >
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
                iconLabel="Total Folder"
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


        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-bold text-gray-800">
            Matriks Pemenuhan Dokumen Audit Operasional
          </Typography>

          <div className="relative">
            <button
              onClick={() => setOpenYear(!openYear)}
              className="flex items-center gap-3 bg-white/70 backdrop-blur 
                border border-blue-200 px-4 py-2 rounded-xl text-sm font-bold 
                text-blue-700 shadow hover:shadow-md transition"
            >
              <span>Tahun</span>
              <span className="bg-white px-3 py-1 rounded-lg border">
                {year}
              </span>
              <span className="text-xs">▾</span>
            </button>

            {openYear && (
              <div
                className="
                  absolute right-0 mt-2 z-20
                  w-32
                  max-h-40   /* ≈ 5 tahun */
                  overflow-y-auto
                  rounded-xl
                  border border-blue-200
                  bg-white
                  shadow-xl
                "
              >
                {years.map((y) => (
                  <div
                    key={y}
                    onClick={() => {
                      setYear(y);
                      setOpenYear(false);
                    }}
                    className={`
                      px-4 py-2
                      text-sm font-semibold
                      cursor-pointer
                      transition
                      ${y === year
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-blue-50"}
                    `}
                  >
                    {y}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {matrix.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-blue-50 px-4 py-2 text-blue-600 text-sm font-semibold">
                Tahun {year}
              </div>

              <Typography className="text-gray-700 font-semibold text-lg">
                Tidak ada data Audit Operasional
              </Typography>

              <Typography className="text-gray-500 text-sm mt-1 italic text-center">
                Belum terdapat folder atau dokumen Audit Operasional untuk tahun yang dipilih.
              </Typography>
            </div>
          )}

          {matrix.map((item) => {
            const percent = Math.round((item.fulfilled / item.total) * 100);
            const status = getStatusConfig(item.fulfilled, item.total);

            return (
              <div
                key={item.cabang}
                className="
                  bg-white/80 backdrop-blur
                  rounded-2xl p-5
                  border border-gray-200
                  shadow-md
                  transition-all duration-300
                "
              >
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

                <Typography className="text-sm text-gray-500 mb-2">
                  {item.fulfilled} dari {item.total} dokumen terpenuhi
                </Typography>

                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${status.bar} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <Typography className="text-right text-xs text-gray-400 mt-2">
                  {percent}%
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </CardBody>
  );
}

export default Home;
