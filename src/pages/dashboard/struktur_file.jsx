import React, { useState, useEffect, useContext } from "react";
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
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ReviewTable } from '../dashboard/ReviewTable'
import { AppContent } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


export function StrukturFile() {
  const [treeData, setTreeData] = useState([]);
  const { backendUrl, isLoggedin, userData } = useContext(AppContent);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [expanded, setExpanded] = useState({});
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activeYearNode, setActiveYearNode] = useState(null);
  const [viewMode, setViewMode] = useState("tree");
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [newFolder, setNewFolder] = useState({
    name: "",
    parentId: "",
    year: null,
    color: "blue",
  });

  const buildTree = (flatData) => {
    if (!Array.isArray(flatData)) {
      console.error("buildTree expected array, got:", flatData);
      return [];
    }

    const map = {};
    const roots = [];

    const folders = flatData.filter(item => item.type === "folder");

    folders.forEach(item => {

      map[item._id] = {
        id: item._id,
        name: item.name,
        type: "folder",
        year: item.tanggal_folder ?? null,
        color: item.color || "gray",
        icon: FolderIcon,
        children: [],
      };
    });

    folders.forEach(item => {
      if (item.parentId) {
        map[item.parentId]?.children.push(map[item._id]);
      } else {
        roots.push(map[item._id]);
      }
    });

    return roots;
  };

  const fetchTree = async () => {
      try {
        const res = await axios.get(
          backendUrl + "/api/nested/all"
          , { withCredentials: true });

        const items =
          res.data.items ||
          res.data.data ||
          res.data ||
          [];

        const tree = buildTree(items);
        setTreeData(tree);


      } catch (err) {
        console.error("Gagal load tree:", err);
      }
    };

  useEffect(() => {
    if (isLoggedin) {
      fetchTree();
    }

  }, [isLoggedin]);

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
    setShowYearModal(false);

    setSelectedYear(year);

    if (activeYearNode) {
      setExpanded(prev => {
        const newExpanded = { ...prev };
        delete newExpanded[activeYearNode];
        return newExpanded;
      });

      setTimeout(() => {
        setExpanded(prev => ({
          ...prev,
          [activeYearNode]: true
        }));
      }, 10);
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

  const handleSaveFolder = async () => {
    if (!newFolder.name || !newFolder.parentId) {
      alert("Nama folder dan parent wajib diisi");
      return;
    }

    try {
      const {data} = await axios.post(
        backendUrl + "/api/nested/create",
        {
          name: newFolder.name,
          parentId: newFolder.parentId,
          type: "folder",
          tanggal_folder: newFolder.year,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Folder berhasil dibuat");
      } else {
        toast.error(data.message || "Gagal simpan folder");
        return;
      }

      await fetchTree();

      const res = await axios.get(backendUrl + "/api/nested/all", { withCredentials: true }
      );

      const items =
        res.data.items ||
        res.data.data ||
        res.data ||
        [];

      const newTree = buildTree(items);
      setTreeData(newTree);


      if (newFolder.year && newFolder.parentId) {
        const findParent = (nodes) => {
          for (let node of nodes) {
            if (node.id === newFolder.parentId) return node;
            if (node.children?.length) {
              const found = findParent(node.children);
              if (found) return found;
            }
          }
          return null;
        };

        const parentNode = findParent(newTree);

        if (parentNode && ["Operasional", "Tematik", "Investigasi"].includes(parentNode.name)) {
          setSelectedYear(Number(newFolder.year));
          setActiveYearNode(newFolder.parentId);
          setExpanded(prev => ({
            ...prev,
            [newFolder.parentId]: true
          }));
        } else {
          setExpanded(prev => ({
            ...prev,
            [newFolder.parentId]: true
          }));
        }
      } else {
        setExpanded(prev => ({
          ...prev,
          [newFolder.parentId]: true
        }));
      }

      setNewFolder({ name: "", parentId: "", year: null, color: "blue" });
      setShowAddFolderModal(false);

    } catch (err) {
      console.error("Gagal simpan folder:", err);
      alert("Gagal simpan folder");
    }
  };

  const filterTreeBySearch = (nodes, term) => {
    if (!term) return nodes;

    return nodes
      .map(node => {
        const match =
          node.name.toLowerCase().includes(term.toLowerCase());

        const filteredChildren = node.children
          ? filterTreeBySearch(node.children, term)
          : [];

        if (match || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean);
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
              : "hover:bg-gray-100 hover:shadow-sm"
            }
          `}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => {
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
          <Icon
            className={`
              w-5 h-5 flex-shrink-0
              ${colorMap[node.color] || "text-gray-500"}
              ${isExpanded ? "scale-110" : ""}
              transition-transform
            `}
          />

          {/* Item Name */}
          <Typography
            className={`flex-1 text-sm font-medium transition-colors ${isActive
              ? "text-blue-700"
              : "text-gray-900 group-hover:text-blue-600"
              }`}
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

  const getFolderOptions = (nodes, level = 0) => {
    let result = [];

    nodes.forEach(node => {
      result.push({
        id: node.id,
        label: `${"— ".repeat(level)}${node.name}`,
      });

      if (node.children?.length) {
        result = result.concat(getFolderOptions(node.children, level + 1));
      }
    });

    return result;
  };

  return (
    <div className="mt-8 mb-8 flex flex-col gap-6">
      <Card>
        {contextMenu.visible && (
          <div
            className="fixed inset-0 z-50"
            onClick={closeContextMenu}
          />
        )}

        <CardBody className="bg-gradient-to-br from-blue-50 shadow-xl border border-gray-200 h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
                <FolderIcon className="w-6 h-6 text-white" />
              </div>

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
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cari folder..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" px-3 py-2 text-sm rounded-xl border
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  transition w-48
                  "
              />

              {/* Expand */}
              <IconButton
                variant="outlined"
                size="sm"
                onClick={expandAll}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </IconButton>

              {/* Collapse */}
              <IconButton
                variant="outlined"
                size="sm"
                onClick={collapseAll}
                className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </IconButton>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* ➕ Tambah Folder */}
              {!userData?.isAccountVerified === false &&
                <IconButton
                  variant="gradient"
                  size="sm"
                  onClick={() => setShowAddFolderModal(true)}
                  className="group from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md"
                >
                  <PlusIcon className="w-4 h-4 text-white transition-transform duration-200 group-hover:rotate-90 group-hover:scale-110" />
                </IconButton>
              }
            </div>
          </div>

          {/* Tree View */}

          {viewMode === "tree" && (
            <div className="space-y-1 bg-white/70 backdrop-blur rounded-2xl p-4 border border-gray-200 shadow-inner] overflow-y-auto">
              {filterTreeBySearch(treeData, searchTerm).map((node) => (
                <TreeNode key={node.id} node={node} />
              ))}

            </div>
          )}

          {viewMode === "review" && !userData?.isAccountVerified === false && (
            <div className=" bg-white rounded-2xl p-4 shadow-inner border h-[65vh] flex flex-col animate-[fadeIn_0.3s_ease-in-out]">
              <ReviewTable
                reviewId={activeReviewId}
                parentId={activeReviewId}
                onBack={() => setViewMode("tree")}
              />
            </div>
          )}

          {/* Year Modal */}
          {showYearModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
                <Typography variant="h6" className="mb-4 text-center font-semibold">
                  📅 Pilih Tahun
                </Typography>

                <div className="grid grid-cols-2 gap-3">
                  {[2022, 2023, 2024, 2025].map((year) => (
                    <button
                      key={year}
                      onClick={() => handleSelectYear(year)}
                      className="px-4 py-2 rounded-xl border hover:bg-blue-50 hover:border-blue-400 transition font-medium"
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

          {/* Add Folder Modal */}
          {showAddFolderModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowAddFolderModal(false)}
              />

              {/* Modal */}
              <div className="relative bg-white rounded-3xl w-[420px] shadow-2xl border border-gray-200 animate-[fadeIn_0.25s_ease-out]">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow">
                    <FolderIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Typography className="font-semibold text-gray-800">
                      Tambah Folder Baru
                    </Typography>
                    <Typography className="text-xs text-gray-500">
                      Buat folder untuk pengelompokan dokumen
                    </Typography>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                  {/* Nama Folder */}
                  <div>
                    <Typography className="text-xs font-medium text-gray-600 mb-1">
                      Nama Folder
                    </Typography>
                    <input
                      type="text"
                      placeholder="Contoh: Laporan Audit"
                      value={newFolder.name}
                      onChange={(e) =>
                        setNewFolder({ ...newFolder, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  {/* Parent Folder */}
                  <div>
                    <Typography className="text-xs font-medium text-gray-600 mb-1">
                      Simpan di Folder
                    </Typography>
                    <select
                      value={newFolder.parentId}
                      onChange={(e) =>
                        setNewFolder({ ...newFolder, parentId: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    >
                      <option value="">Pilih folder tujuan</option>
                      {getFolderOptions(treeData).map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tahun */}
                  <div>
                    <Typography className="text-xs font-medium text-gray-600 mb-1">
                      Tahun (Opsional)
                    </Typography>
                    <select
                      value={newFolder.year || ""}
                      onChange={(e) =>
                        setNewFolder({ ...newFolder, year: e.target.value ? Number(e.target.value) : null })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    >
                      <option value="">Semua Tahun</option>
                      {[2022, 2023, 2024, 2025].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-gray-50 rounded-b-3xl">
                  <button
                    onClick={() => setShowAddFolderModal(false)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSaveFolder}
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md transition"
                  >
                    Simpan Folder
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default StrukturFile;