function Avatar({ src, alt, size = 'md' }) {
  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <img
      src={src || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
      alt={alt}
      className={`rounded-full object-cover ${sizeStyles[size]}`}
      loading="lazy"
    />
  );
}

export default Avatar;
