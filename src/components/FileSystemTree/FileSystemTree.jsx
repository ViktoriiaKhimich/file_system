import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const FileSystemTree = () => {

    const fileSystem = useSelector(state => state.folders, shallowEqual)

    const FilesTree = ({ folders }) => {

        return (
            <>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    <TreeItem nodeId="1" label={Object.keys(folders)[0]}>
                        {Object.entries(folders['/']).map(item => {
                            return (
                                <TreeItem nodeId="2" label={item[0]} style={{ marginBottom: '10px' }}>
                                    {item[1].text && <TreeItem nodeId="3" label={item[1].text}></TreeItem>}
                                </TreeItem>
                            )
                        })}
                    </TreeItem>
                </TreeView>
            </>
        )
    }

    return (<>
        <FilesTree folders={fileSystem} />
    </>);
}

