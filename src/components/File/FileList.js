import moment from "moment"
import Image from "next/image"
import DeleteFileModal from "./DeleteFileModal";
import { useRouter } from "next/router";
import { collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "@/lib/firebase/init";
import { useSession } from "next-auth/react";

function FileList({ fileList, setFileList, children, refetchFile, isLoading }) {
    const { pathname } = useRouter()
    const controlHeightBox = ["/trash"]
    const disableBtnAllDelete = ['/trash']
  
    return (
        <div className="p-[10px] md:p-[20px] md:-mt-4">
            <div className={`bg-accent p-[20px] rounded-md min-h-[240px] ${controlHeightBox.includes(pathname) ? "md:min-h-[500px]" : "md:min-h-[300px]"}`}>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold">Daftar File</h1>
                    {disableBtnAllDelete.includes(pathname) &&
                    <div>
                        <button disabled={fileList.length == 0 ? true : false} onClick={() => window.delete_Allfile.showModal()} className="flex items-center cursor-pointer text-sm bg-blue-400 p-2 rounded-md hover:scale-105 active:scale-95">{fileList.length == 0 ? 'Belum Ada File' : 'Hapus Semua'}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg></button>
                <dialog id={`delete_Allfile`}
                    className="modal">
                    <DeleteFileModal msgForDelete={'semua file sampah'} refetchFile={refetchFile} closeModal={() => window[`delete_Allfile`].close()} />
                </dialog>
                </div>
                    }
                </div>
                <div className="grid grid-cols-2 text-sm border-b-[1px] border-black">
                    <h1 className="font-bold">Nama</h1>
                    <div className="flex gap-3 md:gap-5 sm:gap-10">
                        <h1 className="ml-[-8px] md:ml-0">Pembuatan</h1>
                        <h1 className="">Size</h1>
                    </div>
                    {children}
                </div>
                <div className="">
                    {fileList?.map((file) => (
                        <div key={file.id}>
                            <div className="grid grid-cols-2 text-sm mt-[10px]">
                                <div onClick={() => window.open(file.imageUrl)} className="flex flex-col lg:flex-row cursor-pointer">
                                    <h1 className="text-xs line-clamp-3 sm:line-clamp-2">{file.namaFile}</h1>
                                    <Image
                                        src={`/${file.type}.png`}
                                        width={25}
                                        height={25}
                                        alt="file.type"
                                    />
                                </div>
                                <div className="text-xs flex md:gap-5 relative">
                                    <h1 className="ml-[6px] md:ml-0 ">{moment(file.modifiedAt).format("MMM DD YYYY")}</h1>
                                    {/* {(file.size / 1024 ** 2).toFixed(2) + " MB"} */}
                                    <h1 className="ml-[10px] md:ml-0">{(file.size / 1024 ** 2).toFixed(2) + " MB"}</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-5 sm:h-5 cursor-pointer text-red-500" onClick={() => window[`delete_file_${file.id}`].showModal()}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>

                                    <dialog id={`delete_file_${file.id}`}
                                        className="modal"
                                    >
                                        <DeleteFileModal file={file} refetchFile={refetchFile} closeModal={() => window[`delete_file_${file.id}`].close()} msgForDelete={'file'} />
                                    </dialog>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default FileList