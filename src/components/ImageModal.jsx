export default function ImageModal({ isOpen, onClose, imageUrl }) {
 if (!isOpen) return null;

 return (
  <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
   <div className='bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl'>
    <div className='flex justify-between items-center p-6 border-b bg-gray-50'>
     <h3 className='text-xl font-semibold text-gray-800'>Image Preview</h3>
     <button
      onClick={onClose}
      className='text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors duration-200 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center'>
      ×
     </button>
    </div>
    <div className='p-6 flex justify-center bg-gray-50'>
     <img
      src={imageUrl}
      alt='Submission Preview'
      className='max-h-[70vh] max-w-full object-contain rounded-lg shadow-md'
     />
    </div>
   </div>
  </div>
 );
}
