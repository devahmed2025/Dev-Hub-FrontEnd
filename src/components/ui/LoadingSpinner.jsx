
// function LoadingSpinner() {
//   return (
//     <div className="absolute z-[1000] bg-slate-200/20 backdrop-blur-sm flex justify-center items-center inset-0">
//       <div className="loader">...Loading</div>
//     </div>
//   );
// }
// export default LoadingSpinner;


const LoadingSpinner = ({ size = 'md' }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        size === 'md' ? 'w-full h-16' : 'w-5 h-5'
      }`}
    >
      <div
        className={`loader border-4 border-t-transparent rounded-full animate-spin ${
          size === 'md' ? 'w-8 h-8 border-blue-500' : 'w-4 h-4 border-blue-400'
        }`}
      />
    </div>
  );
};

export default LoadingSpinner;
