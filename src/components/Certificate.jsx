
import React from "react";
import { useGetCertificateByIdQuery } from "../redux/certiicateapislice";
import {  useNavigate } from "react-router-dom";
export const CertificateDetails = ({ id }) => {
  const { data: certificate, error, isLoading } = useGetCertificateByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-12 text-gray-500">جاري التحميل...</p>;
  if (error) return <p className="text-center mt-12 text-red-600">حدث خطأ أثناء تحميل الشهادة</p>;
  if (!certificate) return <p className="text-center mt-12 text-gray-500">لا توجد شهادة لعرضها</p>;
// const formatDate = (dateString) => {
//   if (!dateString) return "----";
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // 0 سے padding
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };
   return (

    <div className="m-5 md:m-0 lg:m-0">
      {/* <button
          onClick={() => navigate(-1)}
          className="bg-green-700 hover:bg-green-800 h-8 w-18 text-white font-semibold px-4 py-1 rounded-lg shadow-md transition duration-200"
        >
        ←
        </button> */}
      

<div className="flex flex-col justify-center items-center mt-5 mb-0">
  {/* الشعار والعنوان في صف واحد مع خط فاصل */}
  <div className="flex items-center justify-center mb-0">
    {/* النص */}
    <h2 className="text-green-800 font-bahij font-bold  text-2xl ml-3">
      أمانة منطقة الرياض
    </h2>

    {/* الخط الفاصل */}
    <div className="h-18 w-px bg-gray-300 mx-2"></div>

    {/* الشعار */}
    <img
      src="https://res.cloudinary.com/dlrinxri6/image/upload/v1762192561/products/eghevsqvmzxiicdffboj.png" // ضع المسار الصحيح للشعار
      alt="أمانة منطقة الرياض"
      className="w-16 h-16 object-contain font-bahij  "
    />
  </div>

  {/* صورة الشخص */}
  <img
    src={certificate.customerImage?.[0]}
    alt={certificate.customerName}
    className="w-36 h-28 object-cover mt-2  border border-gray-300"
  />

  {/* العنوان السفلي */}
  <h2 className="mt-3 text-green-800 font-bahij font-bold text-2xl">
    شهادة صحية
  </h2>
</div>


    
    <div className="max-w-lg mx-auto bg-white border border-gray-100 rounded-2xl  shadow-2xl overflow-hidden font-sans text-right mt-8 p-6">
      {/* Header */}
      
    

      {/* Data Sections */}
<div dir="rtl" className="space-y-10 text-right">
  <div 
    className='font-bahij -mt-10 font-medium'>
    
  <Section title='بيانات الشهادة:' >
    <KeyValue label="رقم الشهادة" value={certificate.certificateNumber.substring(0,20)   } />
    <KeyValue label="تاريخ الإصدار" value={certificate.issueDate.substring(0,20)   } />
    <KeyValue label="نهاية الصلاحية" value={certificate.expiryDate.substring(0,20)   } />
  </Section>

  <Section title="بيانات صاحب الشهادة: ">
    <KeyValue label="الاسم" value={certificate.customerName.substring(0,20)   } />
    <KeyValue label="رقم الهوية" value={certificate.idNumber.substring(0,20)   } />
    <KeyValue label="الجنس" value={certificate.gender.substring(0,20)   } />
    <KeyValue label="الجنسية" value={certificate.nationality.substring(0,20)   } />
    <KeyValue label="المهنة" value={certificate.profession.substring(0,20)   } />
    <KeyValue label="البرنامج التثقيفي" value={certificate.educationalProgram.substring(0,20)   } />
    <KeyValue label="تاريخ إنهاء البرنامج" value={certificate.programCompletionDate.substring(0,20)   } />
  </Section>


  <Section title="بيانات المنشأة:">
    <KeyValue label="اسم المنشأة" value={certificate.establishmentName.substring(0,20) || "----" } />
    <KeyValue label="رقم رخصة المنشأة" value={certificate.establishmentLicense.substring(0,20) || "----"    } />
  </Section>
  
  </div>
</div>

    </div>
    </div>
  );
};

// // مكوّن مساعد لعناصر “تسمية + قيمة”
const KeyValue = ({ label, value }) => (
  <div className="row-1">

  <div className="flex justify-evenly ml-32 space-x-10 py-2  last:border-none border-2 border-amber-500">
    <span className="text-gray-500">{label}</span>
    <span className=" text-black">{value}</span>
  </div>
  </div>
);


// مكوّن مساعد للقسم
const Section = ({ title, children }) => (
  <div className="py-3">
    <h3 className="text-green-800 font-semibold mb-4 text-xl  border-t border-gray-300 py-2">{title}</h3>
    {children}
  </div>
);
