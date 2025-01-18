import Image from "next/image";
import { toast } from "react-toastify";

const StripSection = ({ speed = 20 }) => {
  "StripSection loaded";
  // Default height set to 200px
  const a = Math.floor(window.innerWidth) ; // 1 rem = 16px
  let height = 0;
  if (a > 1280) {
    height = 200;
  } else if(a < 500){
    height = 100;
  }

  // toast.success(`${height}`);

  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image7.jpg",
    "/images/image8.jpg",
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image7.jpg",
    "/images/image8.jpg",
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image7.jpg",
    "/images/image8.jpg",
  ];

  return (
    <div
      className={`relative overflow-hidden bg-gray-300 h-[${height}px]`}
      // style={{ height: `${height}px` }}
    >
      <div
        className="flex items-center absolute inset-0 animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Main set of images */}
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative overflow-hidden"
            style={{ height: `${height}px`, width: `${height}px` }}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill // Replaces layout="fill"
              style={{ objectFit: "cover" }} // Use style for objectFit
              sizes={`${height}px`} // Specify the sizes prop
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StripSection;
