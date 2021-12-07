import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: {
    id: "0",
    name: "/",
    type: "folder",
    path: [],
    children: [],
  },
  currentFolderOrFile: {
    id: "0",
    type: "folder",
    path: [],
  },
  undo: [
    {
      id: "0",
      name: "/",
      type: "folder",
      path: [],
      children: [],
    },
  ],
  redo: [],
};

const folderSlice = createSlice({
  name: "folders",
  initialState: initialState,
  reducers: {
    setCurrent: (state, { payload }) => {
      state.currentFolderOrFile = { ...payload };
    },
    edit: (state, { payload }) => {
      state.folders = { ...payload };
      state.undo = [...state.undo, { ...payload }];
    },
    undo: (state) => {
      if (state.undo.length < 2) return;
      state.undo = state.undo.slice(0, state.undo.length - 1);
      state.redo = [{ ...state.folders }, ...state.redo];
      state.folders = { ...state.undo[state.undo.length - 1] };
      state.currentFolderOrFile = {
        id: "0",
        type: "folder",
        path: [],
      };
    },
    redo: (state) => {
      if (!state.redo.length) return;
      state.undo = [...state.undo, { ...state.folders }];
      state.folders = { ...state.redo[0] };
      state.redo = state.redo.slice(1);
      state.currentFolderOrFile = {
        id: "0",
        type: "folder",
        path: [],
      };
    },
  },
});

export const { setCurrent, edit, undo, redo } = folderSlice.actions;

export default folderSlice.reducer;
