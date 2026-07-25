export default function ImageReveal({ src, alt, className = '', imageClassName = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} decoding="async" className={`h-full w-full object-cover ${imageClassName}`} />
    </div>
  );
}
