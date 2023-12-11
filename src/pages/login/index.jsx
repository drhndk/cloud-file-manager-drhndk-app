import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"

function Login() {
    const { data } = useSession()
    const { push, query } = useRouter()

    const callbackUrl = query.callbackUrl || '/'
    return (
        <div className='flex justify-center 
        items-center mt-[25%] md:mt-[15%] ml-[0%] md:ml-[50%] flex-col gap-6'>
            <Image
                src={'/logo1.png'}
                alt='logo'
                width={200}
                height={100}
                style={{
                    width: '50%',
                    height: 'auto',
                }}
                priority
               
            />

            <button
                className=' text-white'
                onClick={() => signIn('google', {
                    callbackUrl,
                })}>
                <div className="flex justify-center">

                    <Image
                        src={'/google.png'}
                        alt='google'
                        width={300}
                        height={300}
                        style={{
                            width: '80%',
                            height: 'auto',
                        }}
                        className="hover:scale-105 active:scale-95"
                    />
                </div>
            </button>
        </div>
    )
}

export default Login