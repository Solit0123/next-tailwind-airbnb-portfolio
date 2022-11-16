import Image from "next/image"

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] xxl:h-[700px]">
        <h1>I am the banner</h1>
        <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
        className=""
        />
        <div className="absolute top-1/2 text-center w-full">
            <p className="text-sm sm:text-lg">Not sure where to go?</p>
            <button className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">I'm flexible</button>
        </div>
    </div>
  )
}

export default Banner