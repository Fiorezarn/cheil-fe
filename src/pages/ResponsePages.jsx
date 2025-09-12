'use client';

import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getSubmission } from '../service/api/submission';

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
 if (!isOpen) return null;

 return (
  <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
   <div className='bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden'>
    <div className='flex justify-between items-center p-4 border-b'>
     <h3 className='text-lg font-semibold'>Preview Gambar</h3>
     <button
      onClick={onClose}
      className='text-gray-500 hover:text-gray-700 text-2xl'>
      &times;
     </button>
    </div>
    <div className='p-4 flex justify-center'>
     <img
      src={imageUrl}
      alt='Preview'
      className='max-h-[70vh] max-w-full object-contain'
     />
    </div>
   </div>
  </div>
 );
};

export default function () {
 const [submissions, setSubmissions] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [selectedImage, setSelectedImage] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   try {
    setLoading(true);
    const response = await getSubmission();
    setSubmissions(response.data);
    setError(null);
   } catch (err) {
    setError('Gagal memuat data submission. Silakan coba lagi.');
    console.error('Error fetching submissions:', err);
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, []);

 const openImageModal = (imageUrl) => {
  setSelectedImage(imageUrl);
  setIsModalOpen(true);
 };

 const closeImageModal = () => {
  setIsModalOpen(false);
  setSelectedImage(null);
 };

 const columns = [
  {
   name: 'ID',
   selector: (row, index) => index + 1,
   sortable: true,
   width: '80px',
  },
  {
   name: 'Nama',
   selector: (row) => row.name,
   sortable: true,
  },
  {
   name: 'Email',
   selector: (row) => row.email,
   sortable: true,
   wrap: true,
  },
  {
   name: 'Nomor Telepon',
   selector: (row) => row.phoneNumber,
   sortable: true,
  },
  {
   name: 'Gambar',
   cell: (row) =>
    row.imagePath ? (
     <div
      className='w-16 h-16 overflow-hidden rounded-md cursor-pointer'
      onClick={() =>
       openImageModal(
        `${import.meta.env.VITE_HTTP_PREFIX}://${
         import.meta.env.VITE_BASE_URL
        }/api/storage/${row.imagePath}`
       )
      }>
      <img
       src={`${import.meta.env.VITE_HTTP_PREFIX}://${
        import.meta.env.VITE_BASE_URL
       }/api/storage/${row.imagePath}`}
       alt='Submission'
       className='w-full h-full object-cover hover:scale-105 transition-transform duration-200'
      />
     </div>
    ) : (
     <span className='text-gray-400'>Tidak ada gambar</span>
    ),
   width: '100px',
  },
  {
   name: 'Tanggal Dibuat',
   selector: (row) =>
    new Date(row.createdAt).toLocaleDateString('id-ID', {
     day: '2-digit',
     month: 'long',
     year: 'numeric',
    }),
   sortable: true,
   wrap: true,
   width: '150px',
  },
 ];

 const customStyles = {
  headRow: {
   style: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontWeight: 'bold',
   },
  },
  rows: {
   style: {
    minHeight: '60px',
    '&:nth-child(even)': {
     backgroundColor: '#f9f9f9',
    },
   },
  },
 };

 const CustomLoader = () => (
  <div className='p-4 text-center'>
   <div className='animate-spin rounded-full h-8 w-8 border-b-2 border mx-auto'></div>
   <p className='mt-2 text-gray-600'>Memuat data...</p>
  </div>
 );

 return (
  <div className='min-h-screen bg-gradient-to-br from-black-50 to-white py-8'>
   <div className='container mx-auto px-4'>
    <div className='bg-white rounded-lg shadow-md p-6'>
     <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
      <h1 className='text-2xl font-bold text-gray-800'>Data Submission</h1>
      <a
       href='/'
       className='inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors duration-200 font-medium'>
       <svg
        className='w-5 h-5 mr-2'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
         d='M10 19l-7-7m0 0l7-7m-7 7h18'></path>
       </svg>
       Kembali ke Form
      </a>
     </div>

     {error && (
      <div className='bg-black border  px-4 py-3 rounded relative mb-4'>
       <span className='block sm:inline'>{error}</span>
       <button
        className='absolute top-0 bottom-0 right-0 px-4 py-3'
        onClick={() => setError(null)}></button>
      </div>
     )}

     <div className='border rounded-lg overflow-hidden'>
      <DataTable
       columns={columns}
       data={submissions}
       customStyles={customStyles}
       progressPending={loading}
       progressComponent={<CustomLoader />}
       pagination
       paginationPerPage={10}
       paginationRowsPerPageOptions={[10, 25, 50, 100]}
       highlightOnHover
       responsive
       striped
       noDataComponent={
        <div className='p-4 text-center text-gray-500'>
         {error ? 'Gagal memuat data' : 'Tidak ada data submission'}
        </div>
       }
      />
     </div>
    </div>
   </div>

   <ImageModal
    isOpen={isModalOpen}
    onClose={closeImageModal}
    imageUrl={selectedImage}
   />
  </div>
 );
}
