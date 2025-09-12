import bg from "@/assets/img/bg.png"

const Hero = () => {
  return (
    <div
      className="w-full bg-no-repeat bg-top bg-contain"
      style={{
        backgroundImage: `url(${bg})`,
        aspectRatio: "16/6",
      }}
    >
     
    </div>
  )
}

export default Hero
