import Image from "next/image"

export default function Group(){
    return (
        <main className="flex-col justify-center items-center my-20 overflow-x-hidden overflow-y-scroll w-full min-h-screen">
            <div className="font-bold text-xl text-black tracking-tight leading-5 mt-32 flex justify-center">
                <h2>
                    참여하실 그룹이 있으신가요?
                </h2>
            </div>
            <div className="flex w-full items-center flex-col">
                <div className="relative flex-col justify-center items-center w-[250px] h-[266px]" >
                    <Image 
                    src="/images/group-main.png" 
                    alt="그룹메인 이미지" 
                    fill
                    />
                </div>
            </div>
           
            
        </main>
    )
}