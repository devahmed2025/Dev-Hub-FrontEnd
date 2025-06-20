import { useRef } from 'react';
import { Download, X } from 'lucide-react';

const Certificate = ({ courseName, studentName, completionDate, onDownload, darkMode,instructor }) => {
  const certificateRef = useRef();

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current);
      const link = document.createElement('a');
      link.download = `شهادة-${courseName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      onDownload?.();
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return (
    <div className="p-6">
      <div 
        ref={certificateRef}
        className={`p-8 border-4 border-yellow-500 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-yellow-600 mb-2">شهادة إتمام الدورة</h2>
          <p className="text-gray-500 dark:text-gray-400">تمنح هذه الشهادة إلى</p>
        </div>
        
        <div className="my-8">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">{studentName}</h3>
          <p className="text-lg">لإتمامه دورة</p>
          <h4 className="text-2xl font-semibold mt-2 text-gray-800 dark:text-gray-200">{courseName}</h4>
             <p className="text-lg"> المدرس</p>
          <h4 className="text-2xl font-semibold mt-2 text-blue-800 dark:text-gray-200">{instructor}</h4>

        </div>
        
        <div className="mt-8 text-gray-600 dark:text-gray-300">
          <p>بتاريخ: {completionDate}</p>
          <div className="flex justify-center mt-6 space-x-8">
            <div className="border-t-2 border-gray-400 w-24 mt-4"></div>
            <div className="border-t-2 border-gray-400 w-24 mt-4"></div>
          </div>
          <div className="flex justify-between px-8 mt-2">
            <span>التوقيع</span>
            <span>التوقيع</span>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            رقم الشهادة: {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          تحميل الشهادة
        </button>
      </div>
    </div>
  );
};

export default Certificate;