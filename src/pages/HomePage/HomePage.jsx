import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { redo, undo } from '../../redux/fileSlice'
import { CreateFileForm } from '../../components/CreateFileForm/CreateFileForm';
import { FileSystemTree } from '../../components/FileSystemTree/FileSystemTree';
import { Button } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

export const HomePage = () => {

    const dispatch = useDispatch()

    const findParent = (fileSystem, path) => {
        if (!path.length) return fileSystem;
        let pathToTarget = fileSystem;
        path.forEach((id) => {
            if (id !== "0")
                pathToTarget = pathToTarget.children.find((element) => element.id === id);
        });
        return pathToTarget;
    };

    const currentFolderOrFile = useSelector(
        (state) => state.filesystem.currentFolderOrFile,
        shallowEqual
    );

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '50px', width: '415px' }}>
                    <CreateFileForm findParent={findParent} currentFolderOrFile={currentFolderOrFile} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        startIcon={<UndoIcon />}
                        style={{ marginBottom: '20px' }}
                        onClick={() => dispatch(undo())}
                        type="submit"
                        color='error'
                        variant="contained"
                    >
                        Undo previous action
                    </Button>
                    <Button
                        startIcon={<RedoIcon />}
                        onClick={() => dispatch(redo())}
                        color='warning'
                        type="submit"
                        variant="contained"
                    >
                        Redo previous action
                    </Button>
                </div>
            </div>
            <div>
                <FileSystemTree findParent={findParent} currentFolderOrFile={currentFolderOrFile} />
            </div>
        </>
    );
}

