import React from 'react'
import { CreateFileForm } from '../../components/CreateFileForm/CreateFileForm';
import { FileSystemTree } from '../../components/FileSystemTree/FileSystemTree'

export const HomePage = () => {
    return (
        <div>
            <div style={{ marginBottom: '50px' }}>
                <CreateFileForm />
            </div>
            <div>
                <FileSystemTree />
            </div>
        </div>
    );
}

