import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { edit, redo, undo } from "../../redux/fileSlice";
import { v4 } from "uuid";

const findParent = (fileSystem, path) => {
  if (!path.length) return fileSystem;
  let pathToTarget = fileSystem;
  path.forEach((id) => {
    if (id !== "0")
      pathToTarget = pathToTarget.children.find((element) => element.id === id);
  });
  return pathToTarget;
};

const addOne = (parent, target) => {
  if (!target.path.length) return parent;
  return parent.children.find((element) => element.id === target.id);
};

const deleteOne = (parent, target) =>
  parent.children.filter((element) => element.id !== target.id);

export const CreateFileForm = () => {
  const currentFolderOrFile = useSelector(
    (state) => state.filesystem.currentFolderOrFile,
    shallowEqual
  );
  const fileSystem = useSelector(
    (state) => state.filesystem.folders,
    shallowEqual
  );
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    folderName: "",
    fileName: "",
    fileText: "",
  });
  const [btnType, setBtnType] = useState("");

  if (!currentFolderOrFile) return null;

  const submitHandler = (e) => {
    e.preventDefault();
    const copy = JSON.parse(JSON.stringify(fileSystem));
    const parentFolder = findParent(copy, currentFolderOrFile.path);
    const placeToAdd = addOne(parentFolder, currentFolderOrFile);
    switch (btnType) {
      case "create_folder":
        const newFolder = {
          id: v4(),
          name: inputValues.folderName,
          type: "folder",
          path: [...placeToAdd.path, placeToAdd.id],
          children: [],
        };
        placeToAdd.children = [...placeToAdd.children, { ...newFolder }];
        dispatch(edit(copy));
        break;
      case "create_file":
        const newFile = {
          id: v4(),
          name: inputValues.fileName,
          type: "file",
          path: [...placeToAdd.path, placeToAdd.id],
          text: inputValues.fileText,
        };
        placeToAdd.children = [...placeToAdd.children, { ...newFile }];
        dispatch(edit(copy));
        break;
      case "delete":
        parentFolder.children = deleteOne(parentFolder, currentFolderOrFile);
        dispatch(edit(copy));
        break;
      case "undo":
        dispatch(undo());
        break;
      case "redo":
        dispatch(redo());
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <>
      <Box
        onSubmit={submitHandler}
        component="form"
        style={{ display: "flex", flexDirection: "column" }}
        noValidate
        autoComplete="off"
      >
        <div>
          {currentFolderOrFile.type === "folder" && (
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <TextField
                id="folder_name"
                name="folderName"
                value={inputValues.folderName}
                onChange={handleInputChange}
                label="Folder name"
                variant="outlined"
                style={{ marginRight: "25px" }}
              />
              <TextField
                id="file_name"
                name="fileName"
                value={inputValues.fileName}
                onChange={handleInputChange}
                label="File name"
                variant="outlined"
              />
            </div>
          )}
          <TextField
            id="file_text"
            name="fileText"
            value={inputValues.fileText}
            onChange={handleInputChange}
            style={{ marginBottom: "20px" }}
            fullWidth={true}
            label="File text"
            multiline
            rows={7}
            rowsmax={Infinity}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentFolderOrFile.type === "folder" && (
            <>
              <Button
                onClick={() => setBtnType("create_folder")}
                type="submit"
                variant="contained"
              >
                Create folder
              </Button>
              <Button
                onClick={() => setBtnType("create_file")}
                type="submit"
                variant="contained"
              >
                Create file
              </Button>
            </>
          )}
          <Button
            onClick={() => setBtnType("delete")}
            type="submit"
            variant="contained"
          >
            Delete
          </Button>
          <Button
            onClick={() => setBtnType("undo")}
            type="submit"
            variant="contained"
          >
            Undo
          </Button>
          <Button
            onClick={() => setBtnType("redo")}
            type="submit"
            variant="contained"
          >
            Redo
          </Button>
        </div>
      </Box>
    </>
  );
};
