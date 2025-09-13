'use client';

import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getSubmission } from '../service/api/submission';
import {
 Database,
 ArrowLeft,
 AlertCircle,
 X,
 RefreshCw,
 ClipboardList,
 Image as ImageIcon,
 Clock,
} from 'lucide-react';
import ImageModal from '../components/ImageModal';

export default function SubmissionsPage() {
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
    setError('Failed to load submission data. Please try again.');
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

 const retryFetch = async () => {
  setError(null);
  try {
   setLoading(true);
   const response = await getSubmission();
   setSubmissions(response.data);
  } catch (err) {
   setError('Failed to load submission data. Please try again.');
   console.error('Error fetching submissions:', err);
  } finally {
   setLoading(false);
  }
 };

 const columns = [
  {
   name: 'No.',
   selector: (row, index) => index + 1,
   sortable: true,
   width: '80px',
   $center: true,
  },
  {
   name: 'Full Name',
   selector: (row) => row.name,
   sortable: true,
   $grow: 1.5,
  },
  {
   name: 'Email Address',
   selector: (row) => row.email,
   sortable: true,
   wrap: true,
   $grow: 1.5,
  },
  {
   name: 'Phone Number',
   selector: (row) => row.phoneNumber,
   sortable: true,
   $grow: 1.2,
  },
  {
   name: 'Image',
   cell: (row) =>
    row.imagePath ? (
     <div
      className='w-20 h-20 overflow-hidden rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md'
      onClick={() =>
       openImageModal(
        `${import.meta.env.VITE_PREFIX}://${
         import.meta.env.VITE_BASE_URL
        }/api/storage/${row.imagePath}`
       )
      }>
      <img
       src={`${import.meta.env.VITE_PREFIX}://${
        import.meta.env.VITE_BASE_URL
       }/api/storage/${row.imagePath}`}
       alt='Submission'
       className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
      />
     </div>
    ) : (
     <div className='flex items-center justify-center w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300'>
      <span className='text-xs text-gray-400 text-center'>No Image</span>
     </div>
    ),
   width: '120px',
   $center: 'true',
  },
  {
   name: 'Submission Date',
   selector: (row) =>
    new Date(row.createdAt).toLocaleDateString('en-US', {
     day: '2-digit',
     month: 'short',
     year: 'numeric',
     hour: '2-digit',
     minute: '2-digit',
    }),
   sortable: true,
   wrap: true,
   width: '180px',
  },
 ];

 const customStyles = {
  headRow: {
   style: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '14px',
    minHeight: '56px',
    borderRadius: '12px 12px 0 0',
   },
  },
  headCells: {
   style: {
    paddingLeft: '16px',
    paddingRight: '16px',
   },
  },
  rows: {
   style: {
    minHeight: '80px',
    fontSize: '14px',
    borderBottom: '1px solid #e5e7eb',
    '&:hover': {
     backgroundColor: '#f8fafc',
     cursor: 'pointer',
    },
    '&:last-child': {
     borderBottom: 'none',
    },
   },
  },
  cells: {
   style: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px',
    textAlign: 'center',
   },
  },
  pagination: {
   style: {
    borderTop: '1px solid #e5e7eb',
    minHeight: '56px',
   },
   pageButtonsStyle: {
    borderRadius: '8px',
    height: '40px',
    width: '40px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#374151',
    fill: '#374151',
    backgroundColor: 'transparent',
    '&:disabled': {
     cursor: 'unset',
     color: '#9ca3af',
     fill: '#9ca3af',
    },
    '&:hover:not(:disabled)': {
     backgroundColor: '#f3f4f6',
    },
    '&:focus': {
     outline: 'none',
     backgroundColor: '#e5e7eb',
    },
   },
  },
 };

 const CustomLoader = () => (
  <div className='flex flex-col items-center justify-center p-12'>
   <RefreshCw className='h-12 w-12 animate-spin text-gray-800 mb-4' />
   <p className='text-gray-600 font-medium'>Loading submissions...</p>
  </div>
 );

 return (
  <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8'>
   <div className='container mx-auto px-4 max-w-7xl'>
    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
     {/* Header */}
     <div className='bg-gradient-to-r from-gray-800 to-gray-900 p-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
       <div>
        <h1 className='text-3xl font-bold text-white mb-2'>
         Submission Management
        </h1>
        <p className='text-gray-300'>View and manage all form submissions</p>
       </div>
       <a
        href='/'
        className='inline-flex items-center px-6 py-3 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105'>
        <ArrowLeft className='w-5 h-5 mr-2' />
        Back to Form
       </a>
      </div>
     </div>

     {/* Content */}
     <div className='p-6'>
      {error && (
       <div className='bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-sm'>
        <div className='flex items-center justify-between'>
         <div className='flex items-center'>
          <AlertCircle className='w-5 h-5 mr-2' />
          <span className='font-medium'>{error}</span>
         </div>
         <div className='flex space-x-2'>
          <button
           onClick={retryFetch}
           className='text-red-600 hover:text-red-800 font-medium underline'>
           Retry
          </button>
          <button
           onClick={() => setError(null)}
           className='text-red-400 hover:text-red-600'>
           <X className='w-4 h-4' />
          </button>
         </div>
        </div>
       </div>
      )}

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
       <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white'>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-blue-100'>Total Submissions</p>
          <p className='text-2xl font-bold'>{submissions.length}</p>
         </div>
         <div className='bg-white bg-opacity-20 rounded-lg p-3'>
          <ClipboardList className='w-6 h-6' />
         </div>
        </div>
       </div>

       <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white'>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-green-100'>With Images</p>
          <p className='text-2xl font-bold'>
           {submissions.filter((s) => s.imagePath).length}
          </p>
         </div>
         <div className='bg-white bg-opacity-20 rounded-lg p-3'>
          <ImageIcon className='w-6 h-6' />
         </div>
        </div>
       </div>

       <div className='bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white'>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-purple-100'>Latest Today</p>
          <p className='text-2xl font-bold'>
           {
            submissions.filter(
             (s) =>
              new Date(s.createdAt).toDateString() === new Date().toDateString()
            ).length
           }
          </p>
         </div>
         <div className='bg-white bg-opacity-20 rounded-lg p-3'>
          <Clock className='w-6 h-6' />
         </div>
        </div>
       </div>
      </div>

      {/* Data Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
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
        striped={false}
        noDataComponent={
         <div className='flex flex-col items-center justify-center p-12'>
          <Database
           size={64}
           className='text-gray-300 mb-4'
          />
          <h3 className='text-lg font-medium text-gray-900 mb-1'>
           No submissions found
          </h3>
          <p className='text-gray-500'>
           {error
            ? 'Failed to load data'
            : 'There are no submissions to display'}
          </p>
         </div>
        }
       />
      </div>
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
