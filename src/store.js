import { configureStore } from '@reduxjs/toolkit'
import folderReducer from './redux/fileSlice'

const reducer = {
    folders: folderReducer
}

const store = configureStore({
    reducer
})

export default store;