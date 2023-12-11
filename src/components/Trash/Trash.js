import FileList from "../File/FileList"
import Spinner from "../Spinner/Spinner"


function Trash({ trashFile, setTrashFile, refetchTrash, isLoading }) {
    return (
        <div className="md:mt-4">
            {isLoading ? <Spinner /> :
                <FileList fileList={trashFile} setFileList={setTrashFile} refetchFile={refetchTrash} isLoading={isLoading} />
            }
        </div>
    )
}

export default Trash