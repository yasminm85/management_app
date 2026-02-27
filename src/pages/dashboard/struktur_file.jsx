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
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ReviewTable } from '../dashboard/ReviewTable'
import { AppContent } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


export function StrukturFile() {
  const [treeData, setTreeData] = useState([]);
  const { backendUrl, isLoggedin } = useContext(AppContent);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [startYear, setStartYear] = useState(currentYear - 1);
  const [activeYearNode, setActiveYearNode] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [showYearModal, setShowYearModal] = useState(false);
  const [viewMode, setViewMode] = useState("tree");
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [activePath, setActivePath] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newFolder, setNewFolder] = useState({
    name: "",
    parentId: "",
    year: null,
    color: "blue",
  });
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameFolder, setRenameFolder] = useState({
    id: "",
    name: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState(null);

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
        if (node.children?.length) {
          allIds[node.id] = true;
          collectIds(node.children);
        }
      });
    };

    collectIds(filteredTree);
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

  const handlePrev = () => {
    setStartYear((prev) => prev - 1);
  };

  const handleNext = () => {
    setStartYear((prev) => prev + 1);
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
      await axios.post(
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
    const isLockedFolder = level === 0;
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = searchTerm
      ? true
      : expanded[node.id];
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

              const path = findPathById(treeData, node.id);
              setActivePath(path || []);

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

          <div className="flex items-center gap-2 flex-1">
            <Typography
              className={`text-sm font-medium ${isActive
                ? "text-blue-700"
                : "text-gray-900"
                }`}
            >
              {node.name}
            </Typography>

            {/* YEAR INDICATOR */}
            {["Operasional", "Tematik", "Investigasi"].includes(node.name) &&
              node.id === activeYearNode &&
              selectedYear && (
                <span
                  className="
          px-2 py-0.5
          text-[11px] font-semibold
          rounded-full
          bg-blue-100 text-blue-700
          whitespace-nowrap
        "
                >
                  {selectedYear}
                </span>
              )}
          </div>


          {/* File Size */}
          {node.size && (
            <Chip
              value={node.size}
              size="sm"
              className="bg-gray-100 text-gray-600 font-normal"
            />
          )}

          {/* Children Count */}
          <div className="flex items-center gap-1">

            {/* jumlah folder */}
            <Chip
              value={node.children.length}
              size="sm"
              className="bg-gray-100 text-gray-700 text-xs"
            />

            {/* tambah folder */}
            {!isLockedFolder && (
              <IconButton
                size="sm"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  const isYearContext =
                    ["Operasional", "Tematik", "Investigasi"].includes(node.name) &&
                    node.id === activeYearNode &&
                    selectedYear;

                  setNewFolder({
                    name: "",
                    parentId: node.id,
                    year: isYearContext ? selectedYear : null,
                    color: "blue",
                  });
                  setShowAddFolderModal(true);
                }}
              >
                <PlusIcon className="w-4 h-4 text-green-600" />
              </IconButton>
            )}

            {/* rename */}
            {!isLockedFolder && (
              <IconButton
                size="sm"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  setRenameFolder({ id: node.id, name: node.name });
                  setShowRenameModal(true);
                }}
              >
                <PencilIcon className="w-4 h-4 text-blue-600 hover:text-blue-800" />
              </IconButton>
            )}

            {/* delete */}
            {!isLockedFolder && (
            <IconButton
              size="sm"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteFolder(node);
                setShowDeleteModal(true);
              }}
            >
              <TrashIcon className="w-4 h-4 text-red-600" />
            </IconButton>
            )}
          </div>

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

  const findPathById = (nodes, targetId, path = []) => {
    for (const node of nodes) {
      const newPath = [...path, { id: node.id, name: node.name }];

      if (node.id === targetId) {
        return newPath;
      }

      if (node.children?.length) {
        const result = findPathById(node.children, targetId, newPath);
        if (result) return result;
      }
    }
    return null;
  };

  const handleGlobalSearch = async (value) => {
    setGlobalSearch(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `${backendUrl}/api/nested/files?q=${encodeURIComponent(value)}`,
        { withCredentials: true }
      );

      setSearchResults(res.data.results || []);
    } catch (err) {
      console.error("Gagal search file:", err);
    }
  };


  const openFileFromSearch = (file) => {
    setActiveReviewId(file.parentId);
    setActivePath(file.path);
    setViewMode("review");

    setSearchResults([]);
    setGlobalSearch("");
  };

  const isYearLocked =
    newFolder.year !== null &&
    activeYearNode === newFolder.parentId;

  const filteredTree = filterTreeBySearch(treeData, searchTerm);

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

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cari file (semua folder)..."
                value={globalSearch}
                onChange={(e) => handleGlobalSearch(e.target.value)}
                className="px-3 py-2 text-sm rounded-xl border
    focus:outline-none focus:ring-2 focus:ring-indigo-400
    transition w-64"
              />

              <IconButton
                variant="outlined"
                size="sm"
                onClick={expandAll}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </IconButton>

              <IconButton
                variant="outlined"
                size="sm"
                onClick={collapseAll}
                className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </IconButton>

            </div>
          </div>


          {globalSearch.trim() !== "" && (
            <div className="mb-4 rounded-xl border bg-white shadow-sm max-h-64 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                  Tidak ada file ditemukan
                </div>
              ) : (
                searchResults.map((file) => (
                  <div
                    key={file.fileId}
                    onClick={() => openFileFromSearch(file)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="font-medium text-gray-800">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {file.path.map(p => p.name).join(" / ")}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {viewMode === "tree" && (
            <div className="space-y-1 bg-white/70 backdrop-blur rounded-2xl p-4 border border-gray-200 shadow-inner] overflow-y-auto">
              {filteredTree.map((node) => (
                <TreeNode key={node.id} node={node} />
              ))}

            </div>
          )}

          {viewMode === "review" && (
            <div className=" bg-white rounded-2xl p-4 shadow-inner border h-[65vh] flex flex-col animate-[fadeIn_0.3s_ease-in-out]">
              <ReviewTable
                reviewId={activeReviewId}
                parentId={activeReviewId}
                path={activePath}
                onBack={() => setViewMode("tree")}
              />
            </div>
          )}

          {showYearModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
                <Typography variant="h6" className="mb-4 text-center font-semibold">
                  📅 Pilih Tahun
                </Typography>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border flex items-center justify-center
                     hover:bg-gray-100 transition"
                  >
                    ◀
                  </button>

                  <div className="grid grid-cols-4 gap-2 flex-1">
                    {[0, 1, 2, 3].map((i) => {
                      const year = startYear + i;
                      return (
                        <button
                          key={year}
                          onClick={() => {
                            handleSelectYear(year);
                            setShowYearModal(false);
                          }}
                          className="py-2 rounded-xl border font-medium
                           hover:bg-blue-50 hover:border-blue-400 transition"
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>

                  {/* KANAN */}
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border flex items-center justify-center
                     hover:bg-gray-100 transition"
                  >
                    ▶
                  </button>
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



          {showAddFolderModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowAddFolderModal(false)}
              />

              <div className="relative bg-white rounded-3xl w-[420px] shadow-2xl border border-gray-200 animate-[fadeIn_0.25s_ease-out]">
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

                <div className="px-6 py-5 space-y-4">
                  <div>
                    <Typography className="text-xs font-medium text-gray-600 mb-1">
                      Nama Folder
                    </Typography>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Folder"
                      value={newFolder.name}
                      onChange={(e) =>
                        setNewFolder({ ...newFolder, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  <div>
                    <Typography className="text-xs font-medium text-gray-600 mb-1">
                      Tahun (Opsional)
                    </Typography>

                    <select
                      value={newFolder.year || ""}
                      disabled={isYearLocked}
                      onChange={(e) =>
                        setNewFolder({
                          ...newFolder,
                          year: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border bg-white
               focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    >
                      <option value="">Semua Tahun</option>

                      {years.map((year) => (
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

          {showRenameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowRenameModal(false)} />

              <div className="relative bg-white rounded-2xl w-96 p-6 shadow-xl">
                <Typography className="font-semibold mb-4">✏️ Rename Folder</Typography>

                <input
                  value={renameFolder.name}
                  onChange={(e) =>
                    setRenameFolder({ ...renameFolder, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl mb-4"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowRenameModal(false)}
                    className="px-4 py-2 text-sm"
                  >
                    Batal
                  </button>

                  <button
                    onClick={async () => {
                      await axios.put(
                        backendUrl + `/api/nested/update/${renameFolder.id}`,
                        renameFolder,
                        { withCredentials: true }
                      );
                      toast.success("Folder berhasil direname");
                      const res = await axios.get(
                        backendUrl + "/api/nested/all",
                        { withCredentials: true }
                      );

                      const items =
                        res.data.items ||
                        res.data.data ||
                        res.data ||
                        [];

                      setTreeData(buildTree(items));
                      setShowRenameModal(false);

                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDeleteModal && deleteFolder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowDeleteModal(false)}
              />

              <div className="
      relative w-[420px]
      bg-white rounded-3xl
      shadow-2xl border border-gray-200
      animate-[fadeIn_0.25s_ease-out]
    ">
                <div className="flex flex-col items-center text-center px-6 pt-6">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                    <TrashIcon className="w-7 h-7 text-red-600" />
                  </div>

                  <Typography className="text-lg font-bold text-gray-800">
                    Hapus Folder
                  </Typography>

                  <Typography className="text-sm text-gray-500 mt-1">
                    Tindakan ini tidak bisa dibatalkan
                  </Typography>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                  <div className="rounded-2xl bg-gray-50 border px-4 py-3 text-center">
                    <Typography className="text-sm text-gray-600">
                      Folder yang akan dihapus:
                    </Typography>
                    <Typography className="font-semibold text-gray-900 mt-1">
                      {deleteFolder.name}
                    </Typography>
                  </div>

                  <Typography className="text-xs text-red-500 text-center mt-4">
                    Semua subfolder & file di dalamnya juga akan terhapus
                  </Typography>
                </div>

                <div className="flex gap-3 px-6 pb-6">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="
            flex-1 px-4 py-2.5 rounded-xl
            text-sm font-medium
            text-gray-600 bg-gray-100
            hover:bg-gray-200 transition
          "
                  >
                    Batal
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(
                          backendUrl + `/api/nested/delete/${deleteFolder.id}`,
                          { withCredentials: true }
                        );

                        toast.success("Folder berhasil dihapus");
                        const res = await axios.get(
                          backendUrl + "/api/nested/all",
                          { withCredentials: true }
                        );

                        const items =
                          res.data.items ||
                          res.data.data ||
                          res.data ||
                          [];

                        setTreeData(buildTree(items));
                        setShowDeleteModal(false);
                        setDeleteFolder(null);
                      } catch (err) {
                        console.error(err);
                        alert("Gagal menghapus folder");
                      }
                    }}
                    className="
            flex-1 px-4 py-2.5 rounded-xl
            text-sm font-semibold
            text-white
            bg-gradient-to-br from-red-500 to-rose-600
            hover:from-red-600 hover:to-rose-700
            shadow-md transition
          "
                  >
                    Ya, Hapus
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