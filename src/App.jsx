
// // import React from 'react';  // Make sure to import React explicitly
// // import CertificateDetails from './components/Certificate';
// import { Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import CertificatesDashboard from './components/CertificatesDashboard';

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Login/>}/>
//         <Route path='/a' element={<CertificatesDashboard/>}/>
//         <Route path='/DownloadFile/:id' element={<CertificateWrapper/>}/>
//         <Route path='/certificate/edit/:id' element={<EditCertificate/>}/>
//         <Route path='/certificate/create' element={<CreateCertificate/>}/>
//         {/* <Route path='/hb' element={<AAA/>}/> */}
//       </Routes>
//     </div>
//   );
// }

// // Wrapper to get id from URL params
// import { useParams } from "react-router-dom";
// import EditCertificate from './components/Editcercertiicationform';
// import CreateCertificate from './components/ceateCertificate';
// import { CertificateDetails } from './components/Certificate';
// // import AAA from './components/test';
// function CertificateWrapper() {
//   const { id } = useParams();
//   return <CertificateDetails id={id} />;
// }

// export default App;




import { Route, Routes, useParams } from 'react-router-dom';
import Login from './components/Login';
import CertificatesDashboard from './components/CertificatesDashboard';
import EditCertificate from './components/Editcercertiicationform';
import CreateCertificate from './components/ceateCertificate';
import { CertificateDetails } from './components/Certificate';
import ProtectedRoute from './components/ProtectedRoutes';

function CertificateWrapper() {
  const { id } = useParams();
  return <CertificateDetails id={id} />;
}

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/DownloadFile/:id" element={<CertificateWrapper />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <CertificatesDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate/edit/:id"
          element={
            <ProtectedRoute>
              <EditCertificate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate/create"
          element={
            <ProtectedRoute>
              <CreateCertificate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
