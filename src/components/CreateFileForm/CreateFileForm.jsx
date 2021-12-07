import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { edit } from "../../redux/fileSlice";
import { v4 } from "uuid";

const addOne = (parent, target) => {
  if (!target.path.length) return parent;
  return parent.children.find((element) => element.id === target.id);
};

export const CreateFileForm = ({ findParent, currentFolderOrFile }) => {

  const [btnType, setBtnType] = useState("");

  const [inputValues, setInputValues] = useState({
    folderName: "",
    fileName: "",
    fileText: "",
  });

  const fileSystem = useSelector(
    (state) => state.filesystem.folders,
    shallowEqual
  );

  const dispatch = useDispatch();

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
        <div style={{ display: "flex" }}>
          {currentFolderOrFile.type === "folder" && (
            <div>
              <Button
                onClick={() => setBtnType("create_folder")}
                type="submit"
                variant="contained"
                color='success'
                style={{ width: "194px", marginRight: '25px' }}
              >
                Create folder
              </Button>
              <Button
                onClick={() => setBtnType("create_file")}
                type="submit"
                color='success'
                variant="contained"
                style={{ width: "194px" }}
              >
                Create file
              </Button>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};
