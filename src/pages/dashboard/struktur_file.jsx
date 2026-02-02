import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ReviewTable } from '../dashboard/ReviewTable'


export function StrukturFile() {
  const [treeData, setTreeData] = useState([
    {
      id: "1",
      name: "Audit",
      type: "folder",
      icon: FolderIcon,
      color: "blue",
      children: [
        {
          id: "1-1",
          name: "Operasional",
          type: "folder",
          icon: FolderIcon,
          color: "purple",
          children: [
            {
              id: "1-1-1",
              name: "Cabang A",
              type: "folder",
              icon: FolderIcon,
              color: "pink",
              year: 2024,
              children: [
                {
                  id: "1-1-1-1",
                  name: "Perencanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                },
                {
                  id: "1-1-1-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                },
                {
                  id: "1-1-1-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                }
              ]
            },
            {
              id: "1-1-2",
              name: "Cabang B",
              type: "folder",
              icon: FolderIcon,
              color: "brown",
              year: 2024,
              children: [
                {
                  id: "1-1-2-1",
                  name: "Perencanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                },
                {
                  id: "1-1-2-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                },
                {
                  id: "1-1-2-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                }
              ]
            },
            {
              id: "1-1-3",
              name: "Cabang C",
              type: "folder",
              icon: FolderIcon,
              color: "green",
              year: 2023,
              children: [
                {
                  id: "1-1-3-1",
                  name: "Perencanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                },
                {
                  id: "1-1-3-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                },
                {
                  id: "1-1-3-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                }
              ]
            },
          ]
        },
        {
          id: "1-2",
          name: "Tematik",
          type: "folder",
          icon: FolderIcon,
          color: "green",
          children: [
            {
              id: "1-2-1",
              name: "Fokus A",
              type: "folder",
              icon: FolderIcon,
              color: "purple",
              year: 2024
            },
            {
              id: "1-2-2",
              name: "Fokus B",
              type: "folder",
              icon: FolderIcon,
              color: "red",
              year: 2023
            },
            {
              id: "1-2-3",
              name: "Fokus C",
              type: "folder",
              icon: FolderIcon,
              color: "black",
              year: 2025
            },
          ]
        },
        {
          id: "1-3",
          name: "Investigasi",
          type: "folder",
          icon: FolderIcon,
          color: "orange",
          children: [
            {
              id: "1-3-1",
              name: "Invest A",
              type: "folder",
              icon: FolderIcon,
              color: "purple",
              year: 2024
            },
            {
              id: "1-3-2",
              name: "Invest B",
              type: "folder",
              icon: FolderIcon,
              color: "red",
              year: 2023,
            },
            {
              id: "1-3-3",
              name: "Invest C",
              type: "folder",
              icon: FolderIcon,
              color: "black",
              year: 2025
            },
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Review/Evaluasi",
      type: "folder",
      icon: FolderIcon,
      color: "brown",
      children: [
        {
          id: "2-1",
          name: "RE 1",
          type: "folder",
          icon: FolderIcon,
          color: "green",
        },
        {
          id: "2-2",
          name: "RE 2",
          type: "folder",
          icon: FolderIcon,
          color: "blue",
        },
        {
          id: "2-3",
          name: "RE 3",
          type: "folder",
          icon: FolderIcon,
          color: "orange",
        },
      ]
    },
    {
      id: "3",
      name: "Konsultasi",
      type: "folder",
      icon: FolderIcon,
      color: "pink",
      children: [
        {
          id: "3-1",
          name: "Teknik",
          type: "folder",
          icon: FolderIcon,
          color: "indigo",
        },
        {
          id: "3-2",
          name: "Keuangan",
          type: "folder",
          icon: FolderIcon,
          color: "grey",
        },
        {
          id: "3-3",
          name: "Personalia & Umum",
          type: "folder",
          icon: FolderIcon,
          color: "blue",
        },
        {
          id: "3-4",
          name: "Pengadaan Barang & Jasa",
          type: "folder",
          icon: FolderIcon,
          color: "purple",
        },
        {
          id: "3-5",
          name: "Operasi",
          type: "folder",
          icon: FolderIcon,
          color: "red",
        },
      ]
    },
    {
      id: "4",
      name: "Supporting",
      type: "folder",
      icon: FolderIcon,
      color: "green",
      children: [
        {
          id: "4-1",
          name: "Perencanaan Tahunan",
          type: "folder",
          icon: FolderIcon,
          color: "blue",
          children: [
            {
              id: "4-1-1",
              name: "RKM",
              type: "folder",
              icon: FolderIcon,
              color: "green",
            },
            {
              id: "4-1-2",
              name: "PKPT",
              type: "folder",
              icon: FolderIcon,
              color: "purple",
            },
            {
              id: "4-1-3",
              name: "KPI",
              type: "folder",
              icon: FolderIcon,
              color: "pink",
            },
          ]
        },
        {
          id: "4-2",
          name: "Pelaporan",
          type: "folder",
          icon: FolderIcon,
          color: "purple",
          children: [
            {
              id: "4-2-1",
              name: "Pelaporan M..",
              type: "folder",
              icon: FolderIcon,
              color: "brown",
            },
            {
              id: "4-2-2",
              name: "Laporan Audit Internal",
              type: "folder",
              icon: FolderIcon,
              color: "orange",
            },
            {
              id: "4-2-3",
              name: "Laporan WBS",
              type: "folder",
              icon: FolderIcon,
              color: "blue",
            },
          ]
        },
      ]
    },
  ]);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });


  const [expanded, setExpanded] = useState({});
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activeYearNode, setActiveYearNode] = useState(null);
  const [viewMode, setViewMode] = useState("tree");
  const [activeReviewId, setActiveReviewId] = useState(null);

  const navigate = useNavigate();



  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allIds = {};
    const collectIds = (nodes) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allIds[node.id] = true;
          collectIds(node.children);
        }
      });
    };
    collectIds(treeData);
    setExpanded(allIds);
  };

  const collapseAll = () => {
    setExpanded({});
  };

  const handleYearFolderClick = (nodeId) => {
    setActiveYearNode(nodeId);
    setShowYearModal(true);
  };


  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setShowYearModal(false);
    if (activeYearNode) {
      setExpanded(prev => ({
        ...prev,
        [activeYearNode]: true
      }));
    }
  };

  const openContextMenu = (e, node) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      node,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, node: null });
  };

  const addNewFolder = () => {
    const folderName = prompt("Nama folder baru:");
    if (!folderName) return;

    const newFolder = {
      id: crypto.randomUUID(),
      name: folderName,
      type: "folder",
      icon: FolderIcon,
      color: "gray",
      children: [],
    };

    const insertFolder = (nodes) =>
      nodes.map((n) =>
        n.id === contextMenu.node.id
          ? { ...n, children: [...(n.children || []), newFolder] }
          : n.children
            ? { ...n, children: insertFolder(n.children) }
            : n
      );

    setTreeData(prev => insertFolder(prev));
    setExpanded(prev => ({ ...prev, [contextMenu.node.id]: true }));
    closeContextMenu();
  };


  const colorMap = {
    blue: "text-blue-500",
    purple: "text-purple-500",
    pink: "text-pink-500",
    green: "text-green-500",
    brown: "text-amber-600",
    red: "text-red-500",
    orange: "text-orange-500",
    indigo: "text-indigo-500",
    black: "text-gray-900",
    grey: "text-gray-500",
    gray: "text-gray-500",
  };


  const TreeNode = ({ node, level = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded[node.id];
    const Icon = node.icon;

    const isActive = activeReviewId === node.id;


    return (
      <div className="select-none">
        {/* Node Item */}
        <div
          onContextMenu={(e) => openContextMenu(e, node)}
          className={`
    flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer
    transition-all duration-200 ease-in-out
    group
    ${isActive
              ? "bg-blue-50 ring-1 ring-blue-300 shadow-sm"
              : "hover:bg-gray-50 hover:shadow-sm"
            }
  `}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => {
            // if (node.name.startsWith("RE")) {
            //   setActiveReviewId(node.id);
            //   setViewMode("review");
            //   return;
            // }
            if (node.type === "folder" && !hasChildren) {
              setActiveReviewId(node.id);
              setViewMode("review");
            }

            if (["Operasional", "Tematik", "Investigasi"].includes(node.name)) {
              handleYearFolderClick(node.id);
            } else if (hasChildren) {
              toggleExpand(node.id);
            }
          }}
        >
          {/* Expand/Collapse Icon */}
          {hasChildren ? (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              )}
            </div>
          ) : (
            <div className="w-5" />
          )}

          {/* Item Icon */}
          {/* <Icon className={`w-5 h-5 text-${node.color || 'gray'}-500 flex-shrink-0`} /> */}
          <Icon
            className={`w-5 h-5 ${colorMap[node.color] || "text-gray-500"} flex-shrink-0`}
          />


          {/* Item Name */}
          <Typography
            className={`flex-1 text-sm font-medium transition-colors${isActive
              ? "text-blue-700"
              : "text-gray-900 group-hover:text-blue-600"}`}
          >
            {node.name}
          </Typography>


          {/* File Size */}
          {node.size && (
            <Chip
              value={node.size}
              size="sm"
              className="bg-gray-100 text-gray-600 font-normal"
            />
          )}

          {/* Children Count */}
          {hasChildren && (
            <Chip
              value={node.children.length}
              size="sm"
              className="bg-gray-100 text-gray-600 font-normal"
            />

          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="ml-4 pl-2 border-l border-dashed border-gray-300">

            {node.children
              .filter(child => {
                if (
                  ["Operasional", "Tematik", "Investigasi"].includes(node.name) &&
                  selectedYear &&
                  node.id === activeYearNode
                ) {
                  return child.year === selectedYear;
                }
                return true;
              })
              .map(child => (
                <TreeNode key={child.id} node={child} level={level + 1} />
              ))}
          </div>
        )}
      </div>
    );
  };

  const calculateStats = (nodes) => {
    let folders = 0;
    let files = 0;
    let totalSizeInMB = 0;

    const parseSizeToMB = (size) => {
      if (!size) return 0;
      const [value, unit] = size.split(" ");
      const num = parseFloat(value);

      if (unit === "KB") return num / 1024;
      if (unit === "MB") return num;
      if (unit === "GB") return num * 1024;
      return 0;
    };

    const traverse = (items) => {
      items.forEach((item) => {
        if (item.type === "folder") {
          folders++;
          if (item.children) traverse(item.children);
        }

        if (item.type === "file") {
          files++;
          totalSizeInMB += parseSizeToMB(item.size);
        }
      });
    };

    traverse(nodes);

    return {
      folders,
      files,
      totalSize:
        totalSizeInMB >= 1024
          ? `${(totalSizeInMB / 1024).toFixed(2)} GB`
          : `${totalSizeInMB.toFixed(2)} MB`,
    };
  };

  const stats = calculateStats(treeData);

  return (
    <div className="mt-8 mb-8 flex flex-col gap-6">
      <Card>
        {contextMenu.visible && (
          <div
            className="fixed inset-0 z-50"
            onClick={closeContextMenu}
          >
            <div
              className="absolute bg-white rounded-xl shadow-xl border w-48 py-1 text-sm"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={(e) => e.stopPropagation()}
            >
              {contextMenu.node?.type === "folder" && (
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={addNewFolder}
                >
                  📁 New Folder
                </button>
              )}

              <button
                className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600"
                onClick={() => alert("Delete coming soon")}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        )}

        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <Typography
                variant="h4"
                className="font-bold tracking-tight text-gray-800"
              >
                File Explorer
              </Typography>
              <Typography className="text-sm text-gray-500">
                Struktur dokumen & review audit
              </Typography>
            </div>
            <div className="flex gap-2">
              <IconButton
                variant="outlined"
                size="sm"
                onClick={expandAll}
                className="border-gray-300"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </IconButton>
              <IconButton
                variant="outlined"
                size="sm"
                onClick={collapseAll}
                className="border-gray-300"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </IconButton>
            </div>
          </div>

          {/* Tree View */}
          {viewMode === "tree" && (
            <div className="space-y-1">
              {treeData.map((node) => (
                <TreeNode key={node.id} node={node} />
              ))}
            </div>
          )}

          {viewMode === "review" && (
            <ReviewTable
              reviewId={activeReviewId}
              onBack={() => setViewMode("tree")}
            />
          )}

          {/* Year Modal */}
          {showYearModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
                <Typography variant="h6" className="mb-4 text-center">
                  Pilih Tahun
                </Typography>

                <div className="flex flex-col gap-2">
                  {[2022, 2023, 2024, 2025].map((year) => (
                    <button
                      key={year}
                      onClick={() => handleSelectYear(year)}
                      className="px-4 py-2 rounded-lg border hover:bg-blue-50 hover:border-blue-400 transition"
                    >
                      {year}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowYearModal(false)}
                  className="mt-4 text-sm text-gray-500 hover:underline w-full"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default StrukturFile;