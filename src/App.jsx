
import { Route, Routes, useParams } from 'react-router-dom';
import Login from './components/Login';
import CertificatesDashboard from './components/CertificatesDashboard';
import EditCertificate from './components/Editcercertiicationform';
import CreateCertificate from './components/ceateCertificate';
import { CertificateDetails } from './components/Certificate';
import ProtectedRoute from './components/ProtectedRoutes';
import Test from './components/test';

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
        <Route path="/y" element={<Test />} />
        <Route path="/DownloadFile/eu6beCfGRB1q-rQ3h1Q81q-rQ3h1Q86SECDhX_9QdDOdqzxjjjUAq-R-6SECDhX_9QdDOdqzxjjjUAq-RfU6pNyEslkTfFhRpIsYrtouNdEyYxJCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWmU_OZ12FvUcufV6nFDX67R0ItaeV7JiXwi8XNCfijFQieIlZAPumCQT7Ej3PiM_EHEj5f3QYgvny0Hgia2JrW85JxPTLgLor7bKAfun2ohTNnd8aItSF43sqUiEoRCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeW1UqEnxbh14KHss8ZR98gJVz5XX4iLFDr9ptwws4zrsBv70AhiQ-KMptLVOhIuu-5NIQduuda4FtyDs_THedTmTaLQsCp273286327273Lor7bKAfun2ohTNnd8aItSF43sqUiEoR1UqE623982732372352653h1Q81q-rQ3h1Q86SECDhX_9QdDOdqz2327823276327BSMqvADkcWXHR5HzGrbR3oxRNTCHvCmm5xEfFhRp67R0ItaeV7JiXwi8XNCfijFQieIlZAPumC/:id" element={<CertificateWrapper />} />

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

