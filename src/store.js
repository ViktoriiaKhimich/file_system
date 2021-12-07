import { configureStore } from '@reduxjs/toolkit'
import folderReducer from './redux/fileSlice'

const reducer = {
    filesystem: folderReducer
}

const store = configureStore({
    reducer
})

export default store;