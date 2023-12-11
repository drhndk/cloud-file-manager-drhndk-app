import { ParentFolderIdContext } from '@/components/Context/ParentFolderIdContext'
import { ShowToastContex } from '@/components/Context/ShowToastContex'
import SideNavBar from '@/components/SideNavBar'
import Toast from '@/components/Toast'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useState } from 'react'
import Login from './login'
import Storage from '@/components/Storage/Storage'
import { TrashContext } from '@/components/Context/TrashContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RefetchFolderContext } from '@/components/Context/refetchFolder'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [parentFolderId, setParentFolderId] = useState()
  const [showToastMsg, setShowToastMsg] = useState()
  const [trashFile, setTrashFile] = useState([])
  const [refetchFolder,setRefetchFolder] = useState()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      <RefetchFolderContext.Provider value={{refetchFolder,setRefetchFolder}}>
      <TrashContext.Provider value={{ trashFile, setTrashFile }}>
        <ParentFolderIdContext.Provider value={{ parentFolderId, setParentFolderId }}>
          <ShowToastContex.Provider value={{ showToastMsg, setShowToastMsg }}>
            <SessionProvider session={session}>
              <div className='flex'>
                <SideNavBar />
                <div className='grid grid-cols-2 md:grid-cols-3 w-full'>
                  <div className='col-span-2'>
                    <Component {...pageProps} />
                  </div>
                  <div className='order-first md:order-last w-full'>
                    <Storage />
                  </div>
                </div>
              </div>
              {
                showToastMsg ? <Toast msg={showToastMsg} /> : null
              }
            </SessionProvider>
          </ShowToastContex.Provider>
        </ParentFolderIdContext.Provider>
      </TrashContext.Provider>
      </RefetchFolderContext.Provider>
    </QueryClientProvider>

  )
}