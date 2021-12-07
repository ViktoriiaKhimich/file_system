import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { edit, setCurrent } from "../../redux/fileSlice";
import { TreeView, TreeItem } from "@material-ui/lab";
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';

export const FileSystemTree = ({ findParent, currentFolderOrFile }) => {

  const fileSystem = useSelector(
    (state) => state.filesystem.folders,
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleClick = (id, type, path) =>
    dispatch(setCurrent({ id, type, path }));

  const deleteOne = (parent, target) =>
    parent.children.filter((element) => element.id !== target.id);

  const handleDeleteClick = () => {
    const copy = JSON.parse(JSON.stringify(fileSystem));
    const parentFolder = findParent(copy, currentFolderOrFile.path);
    parentFolder.children = deleteOne(parentFolder, currentFolderOrFile);
    dispatch(edit(copy));
  }

  const renderTree = (nodes) => (
    <>
      <TreeItem
        icon={nodes.type === 'folder' ? <FolderIcon /> : <ArticleIcon />}
        key={nodes.id}
        nodeId={nodes.id}
        label={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>{nodes.name}</p>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </div>}

        onClick={() => handleClick(nodes.id, nodes.type, nodes.path)}
      >
        {nodes.text && <TreeItem label={nodes.text} />}
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </>
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
