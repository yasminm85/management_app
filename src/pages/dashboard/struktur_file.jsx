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
import {ReviewTable} from '../dashboard/ReviewTable'


export function StrukturFile() {
  const treeData = [
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
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-1-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-1-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
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
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-2-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-2-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
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
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-3-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-3-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
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
  ];

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


  const TreeNode = ({ node, level = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded[node.id];
    const Icon = node.icon;

    return (
      <div className="select-none">
        {/* Node Item */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => {
            if (node.name.startsWith("RE")) {
              setActiveReviewId(node.id);
              setViewMode("review");
              return;
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
          <Icon className={`w-5 h-5 text-${node.color || 'gray'}-500 flex-shrink-0`} />

          {/* Item Name */}
          <Typography className="flex-1 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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
              className={`bg-${node.color || 'gray'}-50 text-${node.color || 'gray'}-600`}
            />
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="border-l-2 border-gray-200 ml-4">
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
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                File Explorer
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
              {treeData.map(node => (
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


          {/* Stats */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                <div className="p-2 bg-blue-100 rounded-md">
                  <FolderIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <Typography className="text-base font-semibold leading-tight">
                    {stats.folders}
                  </Typography>
                  <Typography className="text-xs text-gray-600">
                    Folders
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                <div className="p-2 bg-green-100 rounded-md">
                  <DocumentTextIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <Typography className="text-base font-semibold leading-tight">
                    {stats.files}
                  </Typography>
                  <Typography className="text-xs text-gray-600">
                    Files
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                <div className="p-2 bg-purple-100 rounded-md">
                  <ArchiveBoxIcon className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <Typography className="text-base font-semibold leading-tight">
                    {stats.totalSize}
                  </Typography>
                  <Typography className="text-xs text-gray-600">
                    Total Size
                  </Typography>
                </div>
              </div>

            </div>
          </div>

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