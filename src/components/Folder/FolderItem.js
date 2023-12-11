import Image from "next/image"

function FolderItem() {
    return (
        <Image
        src={'/folder.png'}
        height={40}
        width={40}
        alt="folder.png"
        />
    )
}

export default FolderItem