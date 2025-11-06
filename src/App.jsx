
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
console.log(getComputedStyle(document.body).fontFamily)

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
