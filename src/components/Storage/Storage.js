import Image from "next/image"
import UserInfo from "./UserInfo"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import StorageInfo from "./StorageInfo"
import StorageDetailItem from "./StorageDetailItem"
import StorageDetailList from "./StorageDetailList"
import StorageUpgradeMsg from "./StorageUpgradeMsg"

function Storage() {
    const router = useRouter()
    const {data} = useSession()
    const disabledStorage = ['/login','/404']
    const [isMobile, setIsMobile] = useState(false);
    // useEffect(() => {
    //   if (!data) {
    //     router.push('/login')
    //   } 
    // }, [data])
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth >= 768); // Ganti 768 dengan lebar yang sesuai untuk mode mobile
      };
      // Set state saat komponen dimount
      handleResize();
      // Tambahkan event listener untuk menangani perubahan lebar layar
      window.addEventListener('resize', handleResize);
      // Hapus event listener saat komponen di-unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      <div>
        {!disabledStorage.includes(router.pathname) && 
        <div className={`p-[10px] md:p-[20px]`}>
          <UserInfo/>
          <StorageInfo/>
          <StorageDetailList />
          {isMobile && <StorageUpgradeMsg/>}
        </div>
        }
      </div>
    )
}
export default Storage