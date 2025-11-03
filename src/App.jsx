
// import React from 'react';  // Make sure to import React explicitly
// import CertificateDetails from './components/Certificate';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CertificatesDashboard from './components/CertificatesDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<CertificatesDashboard/>}/>
        <Route path='/certificate/:id' element={<CertificateWrapper/>}/>
        <Route path='/certificate/edit/:id' element={<EditCertificate/>}/>
        <Route path='/certificate/create' element={<CreateCertificate/>}/>
      </Routes>
    </div>
  );
}

// Wrapper to get id from URL params
import { useParams } from "react-router-dom";
import EditCertificate from './components/Editcercertiicationform';
import CreateCertificate from './components/ceateCertificate';
import { CertificateDetails } from './components/Certificate';
function CertificateWrapper() {
  const { id } = useParams();
  return <CertificateDetails id={id} />;
}

export default App;
