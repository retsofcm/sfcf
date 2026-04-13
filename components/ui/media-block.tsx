'use client';



interface MediaBlockProps {
  imageSrc?: string | null;
  mobileImageSrc?: string | null;
  videoSrc?: string | null;
  alt?: string | null;
  imageHeight?: number;
  imageWidth?: number;
  className?: string;
}

export const MediaBlock = ({
  imageSrc,
  mobileImageSrc,
  videoSrc,
  alt = '',
  imageHeight = 4000,
  imageWidth = 3000,
  className = '',
}: MediaBlockProps) => {
  const isVideo = !!videoSrc && !imageSrc && !mobileImageSrc;

  if (isVideo) {
    return (
      <video className={`inset-0 w-full h-full object-cover z-0 ${className}`} autoPlay loop muted>
        <source src={videoSrc!} type="video/mp4" />
        <source src={videoSrc!} type="video/webm" />
        <source src={videoSrc!} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <>
      {mobileImageSrc && (
        <img
          className={`inset-0 h-full w-full object-cover z-0 block lg:hidden ${className}`}
          alt={alt ?? ''}
          src={mobileImageSrc}
          height={imageHeight}
          width={imageWidth}
        />
      )}
      {imageSrc && (
        <img
          className={`inset-0 h-full w-full object-cover z-0 ${mobileImageSrc ? 'hidden lg:block' : 'block'} ${className}`}
          alt={alt ?? ''}
          src={imageSrc}
          height={imageHeight}
          width={imageWidth}
        />
      )}
    </>
  );
};
