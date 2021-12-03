import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid'

const initialState = {
    '/': {
    },
    id: v4(),
}

const folderSlice = createSlice({
    name: 'folders',
    initialState: initialState,
    reducers: {
        addFolder: (state, { payload }) => {
            state['/'] = { ...state['/'], ...payload }
        },
        addFile: (state, { payload }) => {
            state['/'] = { ...state['/'], ...payload }
        },
    }
})

export const { getFolders, addFolder, deleteFolder, getFiles, addFile, deleteFile } = folderSlice.actions

export default folderSlice.reducer



