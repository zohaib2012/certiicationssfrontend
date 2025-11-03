
// import React from "react";
// import { useGetCertificateByIdQuery } from "../redux/certiicateapislice";

// import { useNavigate} from 'react-router-dom';

// export const CertificateDetails=({ id })=> {
//   const { data: certificate, error, isLoading } = useGetCertificateByIdQuery(id);
  
//     const navigate=useNavigate()
//   if (isLoading) return <p className="text-center mt-10">جاري التحميل...</p>;
//   if (error) return <p className="text-center mt-10 text-red-600">حدث خطأ أثناء تحميل الشهادة</p>;
  
//   if (!certificate) return <p className="text-center mt-10">لا توجد شهادة لعرضها</p>;
  
//   const formatDate = (dateString) => {
//     if (!dateString) return "----";
//     return new Date(dateString).toLocaleDateString("ar-SA");
//   };
  
// //  let token= localStorage.getItem('Token')
// //  console.log(token)
// // if(!token){
// //   navigate('/login')
// // }

//   return (
   

// <div className="max-w-md mx-auto rounded-xl shadow-lg overflow-hidden text-right font-sans p-6">
//   {/* Header */}
//   <div className="flex flex-col items-center mb-4">
//     <img
//       src="/path-to-riyadh-logo.png" // Replace with actual logo path or URL
//       alt="أمانة منطقة الرياض"
//       className="w-48  h-12 mb-0"
//     />
//     <img
//       src={certificate.customerImage?.[0]}
//       alt={certificate.customerName}
//       className="w-28 h-28 rounded-xl object-cover border-2 border-green-200 shadow-sm"
//     />
//     <h2 className="mt-4 font-extrabold text-green-800 text-2xl tracking-wide">شهادة صحية</h2>
//   </div>

//   {/* Certificate Data */}
//   <div className="mb-5 bg-green-50 rounded-lg p-4 shadow-inner border border-green-100">
//     <h3 className="text-green-700 font-semibold mb-3 border-b border-green-200 pb-1 text-lg">بيانات الشهادة</h3>
//     <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
//       <span>رقم الشهادة:</span>
//       <span className="font-semibold">{certificate.certificateNumber}</span>
//       <span>تاريخ الإصدار:</span>
//       <span className="font-semibold">{formatDate(certificate.issueDate)}</span>
//       <span>نهاية الصلاحية:</span>
//       <span className="font-semibold">{formatDate(certificate.expiryDate)}</span>
//     </div>
//   </div>

//   {/* Owner Data */}
//   <div className="mb-5 bg-green-50 rounded-lg p-4 shadow-inner border border-green-100">
//     <h3 className="text-green-700 font-semibold mb-3 border-b border-green-200 pb-1 text-lg">بيانات صاحب الشهادة</h3>
//     <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
//       <span>الاسم:</span>
//       <span className="font-semibold">{certificate.customerName}</span>
//       <span>رقم الهوية:</span>
//       <span className="font-semibold">{certificate.idNumber}</span>
//       <span>الجنس:</span>
//       <span className="font-semibold">{certificate.gender}</span>
//       <span>الجنسية:</span>
//       <span className="font-semibold">{certificate.nationality}</span>
//       <span>المهنة:</span>
//       <span className="font-semibold">{certificate.profession}</span>
//       <span>البرنامج التدريبي:</span>
//       <span className="font-semibold">{certificate.educationalProgram}</span>
//       <span>تاريخ إنهاء البرنامج:</span>
//       <span className="font-semibold">{formatDate(certificate.programCompletionDate)}</span>
//     </div>
//   </div>

//   {/* Establishment Data */}
//   <div className="bg-green-50 rounded-lg p-4 shadow-inner border border-green-100">
//     <h3 className="text-green-700 font-semibold mb-3 border-b border-green-200 pb-1 text-lg">بيانات المنشأة</h3>
//     <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
//       <span>اسم المنشأة:</span>
//       <span className="font-semibold">{certificate.establishmentName || "----"}</span>
//       <span>رقم رخصة المنشأة:</span>
//       <span className="font-semibold">{certificate.establishmentLicense || "----"}</span>
//     </div>
//   </div>
// </div>

//   );
// }
import React from "react";
import { useGetCertificateByIdQuery } from "../redux/certiicateapislice";
import { useNavigate } from "react-router-dom";

export const CertificateDetails = ({ id }) => {
  const { data: certificate, error, isLoading } = useGetCertificateByIdQuery(id);
  // const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-12 text-gray-500">جاري التحميل...</p>;
  if (error) return <p className="text-center mt-12 text-red-600">حدث خطأ أثناء تحميل الشهادة</p>;
  if (!certificate) return <p className="text-center mt-12 text-gray-500">لا توجد شهادة لعرضها</p>;

  const formatDate = (dateString) => {
    if (!dateString) return "----";
    // return new Date(dateString).toLocaleDateString("ar‑SA");
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden font-sans text-right mt-8 p-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="assets/IMG-20210906-WA0000.jpg" // Replace with actual logo path or URL
          alt="أمانة منطقة الرياض"
          className="w-48 h-20 mb-1"
        />
        <img
          src={certificate.customerImage?.[0]}
          alt={certificate.customerName}
          className="w-32 h-32 rounded-xl object-cover border-4 border-green-100 shadow-md"
        />
        <h2 className="mt-5 font-extrabold text-green-900 text-3xl tracking-tight">
          شهادة صحية
        </h2>
      </div>

      {/* Data Sections */}
      {/** Reusable section container */}
      <Section title="بيانات الشهادة">
        <KeyValue label="رقم الشهادة" value={certificate.certificateNumber} />
        <KeyValue label="تاريخ الإصدار" value={formatDate(certificate.issueDate)} />
        <KeyValue label="نهاية الصلاحية" value={formatDate(certificate.expiryDate)} />
      </Section>

      <Section title="بيانات صاحب الشهادة">
        <KeyValue label="الاسم" value={certificate.customerName} />
        <KeyValue label="رقم الهوية" value={certificate.idNumber} />
        <KeyValue label="الجنس" value={certificate.gender} />
        <KeyValue label="الجنسية" value={certificate.nationality} />
        <KeyValue label="المهنة" value={certificate.profession} />
        <KeyValue label="البرنامج التدريبي" value={certificate.educationalProgram} />
        <KeyValue label="تاريخ إنهاء البرنامج" value={formatDate(certificate.programCompletionDate)} />
      </Section>

      <Section title="بيانات المنشأة">
        <KeyValue label="اسم المنشأة" value={certificate.establishmentName || "----"} />
        <KeyValue label="رقم رخصة المنشأة" value={certificate.establishmentLicense || "----"} />
      </Section>
    </div>
  );
};

// مُكوّن مساعد لعناصر “تسمية + قيمة”
const KeyValue = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 last:border-none">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

// مُكوّن مساعد للقسم
const Section = ({ title, children }) => (
  <div className="mb-6 bg-green-50 rounded-lg p-5 shadow-inner border border-green-100">
    <h3 className="text-green-800 font-semibold mb-4 text-xl border-b border-green-200 pb-2">{title}</h3>
    {children}
  </div>
);
