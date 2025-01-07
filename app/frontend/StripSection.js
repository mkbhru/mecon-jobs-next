import Image from "next/image";

const StripSection = ({ speed = 20, height = 200 }) => {
  // Default height set to 240px
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
  ];


  return (
    <div
      className="relative overflow-hidden bg-gray-300 "
      style={{ height: `${height}px` }}
    >
      <div
        className="flex items-center absolute inset-0 animate-marquee"
        style={{ animationDuration: `${speed}s` }} // Dynamic speed adjustment
      >
        {/* Main set of images */}
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative overflow-hidden"
            style={{ height: `${height}px`, width: `${height}px` }} // Adjusting image size based on height
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="fill" // Makes the Image fill its parent div
              objectFit="cover" // Ensures the image scales to cover the div
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StripSection;
