
import React from "react";
import { useGetCertificateByIdQuery } from "../redux/certiicateapislice";
import {  useNavigate } from "react-router-dom";
export const CertificateDetails = ({ id }) => {
  const { data: certificate, error, isLoading } = useGetCertificateByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-12 text-gray-500">جاري التحميل...</p>;
  if (error) return <p className="text-center mt-12 text-red-600">حدث خطأ أثناء تحميل الشهادة</p>;
  if (!certificate) return <p className="text-center mt-12 text-gray-500">لا توجد شهادة لعرضها</p>;
const formatDate = (dateString) => {
  if (!dateString) return "----";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0 سے padding
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
   return (

    <div>
      {/* <button
          onClick={() => navigate(-1)}
          className="bg-green-700 hover:bg-green-800 h-8 w-18 text-white font-semibold px-4 py-1 rounded-lg shadow-md transition duration-200"
        >
        ←
        </button> */}
      

<div className="flex flex-col items-center mt-5 mb-3">
  {/* الشعار والعنوان في صف واحد مع خط فاصل */}
  <div className="flex items-center justify-center mb-2">
    {/* النص */}
    <h2 className="text-green-800 font-extrabold text-2xl ml-3">
      أمانة منطقة الرياض
    </h2>

    {/* الخط الفاصل */}
    <div className="h-10 w-px bg-gray-300 mx-2"></div>

    {/* الشعار */}
    <img
      src="https://res.cloudinary.com/dlrinxri6/image/upload/v1762192561/products/eghevsqvmzxiicdffboj.png" // ضع المسار الصحيح للشعار
      alt="أمانة منطقة الرياض"
      className="w-14 h-14 object-contain"
    />
  </div>

  {/* صورة الشخص */}
  <img
    src={certificate.customerImage?.[0]}
    alt={certificate.customerName}
    className="w-36 h-28 object-cover mt-2 rounded-md border border-gray-300"
  />

  {/* العنوان السفلي */}
  <h2 className="mt-3 text-green-800 font-extrabold text-2xl">
    شهادة صحية
  </h2>
</div>


    
    <div className="max-w-lg mx-auto bg-white border border-gray-100 rounded-2xl  shadow-2xl overflow-hidden font-sans text-right mt-8 p-6">
      {/* Header */}
      
    

      {/* Data Sections */}
<div dir="rtl" className="space-y-4 text-right ">
  <div className=''>
    
  <Section title="بيانات الشهادة" >
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
</div>

    </div>
    </div>
  );
};

// مكوّن مساعد لعناصر “تسمية + قيمة”
const KeyValue = ({ label, value }) => (
  <div className="flex justify-between py-2  last:border-none">
    <span className="text-gray-500">{label}:</span>
    <span className=" text-black">{value}</span>
  </div>
);

// مكوّن مساعد للقسم
const Section = ({ title, children }) => (
  <div className="p-3 ">
    <h3 className="text-green-800 font-semibold mb-4 text-xl border-t border-green-200 py-2">{title}</h3>
    {children}
  </div>
);
