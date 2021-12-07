import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { TreeView, TreeItem } from "@material-ui/lab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import { setCurrent } from "../../redux/fileSlice";

export const FileSystemTree = () => {
  const dispatch = useDispatch();
  const fileSystem = useSelector(
    (state) => state.filesystem.folders,
    shallowEqual
  );

  const handleClick = (id, type, path) =>
    dispatch(setCurrent({ id, type, path }));

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => handleClick(nodes.id, nodes.type, nodes.path)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<FolderIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderTree(fileSystem)}
    </TreeView>
  );
};
