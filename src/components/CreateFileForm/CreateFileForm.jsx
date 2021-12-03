import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import { addFolder, addFile } from '../../redux/fileSlice'
import { v4 } from 'uuid'

export const CreateFileForm = () => {

    const [inputValues, setInputValues] = useState('')
    const [btnType, setBtnType] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (btnType === 'create_folder') {
            const newFolder = {
                ['/' + inputValues.folderName]: { id: v4() }
            }
            dispatch(addFolder(newFolder))
        }
        if (btnType === 'create_file') {
            const newFile = {
                [inputValues.fileName]: { text: inputValues.fileText, id: v4() }
            }
            dispatch(addFile(newFile))
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        })
    }

    return (<>
        <Box
            onSubmit={submitHandler}
            component="form"
            style={{ display: 'flex', flexDirection: 'column' }}
            noValidate
            autoComplete="off"
        >
            <div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <TextField id="folder_name" name='folderName' value={inputValues.folderName} onChange={handleInputChange} label="Folder name" variant="outlined" style={{ marginRight: '25px' }} />
                    <TextField id="file_name" name='fileName' value={inputValues.fileName} onChange={handleInputChange} label="File name" variant="outlined" />
                </div>
                <TextField
                    id='file_text'
                    name='fileText'
                    value={inputValues.fileText}
                    onChange={handleInputChange}
                    style={{ marginBottom: '20px' }}
                    fullWidth={true}
                    label="File text"
                    multiline
                    rows={7}
                    rowsmax={Infinity}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => setBtnType('create_folder')} type='submit' variant="contained">Create folder</Button>
                <Button onClick={() => setBtnType('create_file')} type='submit' variant="contained">Create file</Button>
            </div>
        </Box>
    </>);
}
