
import React from "react";
import { useGetCertificateByIdQuery } from "../redux/certiicateapislice";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
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

    <div className="m-5 md:m-0 lg:m-0 ">
      

<div className="flex flex-col justify-center items-center  mt-5 mb-0">
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


    
    <div className="max-w-md mx-auto    bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden font-sans text-right mt-8 p-6">
      {/* Header */}
      
    

      {/* Data Sections */}
<div dir="rtl" className="space-y-10 text-right">
  <div 
    className='font-bahij -mt-10 font-medium'>
    
  <Section title='بيانات الشهادة:' >
    <KeyValue label="رقم الشهادة" value={certificate.certificateNumber    } />
    <KeyValue label="تاريخ الإصدار" value={certificate.issueDate    } />
    <KeyValue label="نهاية الصلاحية" value={certificate.expiryDate    } />
  </Section>

  <Section title="بيانات صاحب الشهادة: ">
    <KeyValue label="الاسم" value={certificate.customerName    } />
    <KeyValue label="رقم الهوية" value={certificate.idNumber    } />
    <KeyValue label="الجنس" value={certificate.gender    } />
    <KeyValue label="الجنسية" value={certificate.nationality    } />
    <KeyValue label="المهنة" value={certificate.profession    } />
    <KeyValue label="البرنامج التثقيفي" value={certificate.educationalProgram    } />
    <KeyValue label="تاريخ إنهاء البرنامج" value={certificate.programCompletionDate    } />
  </Section>


  <Section title="بيانات المنشأة:">
    <KeyValue label="اسم المنشأة" value={certificate.establishmentName  || "----" } />
    <KeyValue label="رقم رخصة المنشأة" value={certificate.establishmentLicense  || "----"    } />
  </Section>
  
  </div>
</div>

    </div>
    </div>
  );
};


// const KeyValue = ({ label, value }) => (
//   <div className="flex py-2  last:border-none">
//     <span className="text-gray-500 w-40">{label}</span>
//     <span className="text-black">{value}</span>
//   </div>
// );


// مكوّن مساعد للقسم

// 🔹 Updated KeyValue Component (only value clickable)
const KeyValue = ({ label, value }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex py-2 items-center">
      <span className="text-gray-500 w-40">{label}</span>
    
      <span
  className={`text-black px-2 py-1 w-full rounded-md items-center inline-flex ${
    isActive ? "outline outline-2 outline-black" : ""
  }`}
  onClick={() => setIsActive(true)}
  onBlur={() => setIsActive(false)}
  tabIndex={0}
>
  {value || "----"}
</span>

    </div>
  );
};


const Section = ({ title, children }) => (
  <div className="py-3">
    <h3 className="text-green-800 font-semibold mb-4 text-xl  border-t border-gray-300 py-2">{title}</h3>
    {children}
  </div>
);


// import React, { useState } from "react";
// import { useGetCertificateByIdQuery } from "../redux/certiicateapislice";
// import { useNavigate } from "react-router-dom";

// export const CertificateDetails = ({ id }) => {
//   const { data: certificate, error, isLoading } = useGetCertificateByIdQuery(id);
//   const navigate = useNavigate();

//   if (isLoading)
//     return <p className="text-center mt-12 text-gray-500">جاري التحميل...</p>;
//   if (error)
//     return (
//       <p className="text-center mt-12 text-red-600">
//         حدث خطأ أثناء تحميل الشهادة
//       </p>
//     );
//   if (!certificate)
//     return (
//       <p className="text-center mt-12 text-gray-500">لا توجد شهادة لعرضها</p>
//     );

//   return (
//     <div className="m-5 md:m-0 lg:m-0 ">
//       <div className="flex flex-col justify-center items-center mt-5 mb-0">
//         {/* الشعار والعنوان في صف واحد مع خط فاصل */}
//         <div className="flex items-center justify-center mb-0">
//           {/* النص */}
//           <h2 className="text-green-800 font-bahij font-bold text-2xl ml-3">
//             أمانة منطقة الرياض
//           </h2>

//           {/* الخط الفاصل */}
//           <div className="h-18 w-px bg-gray-300 mx-2"></div>

//           {/* الشعار */}
//           <img
//             src="https://res.cloudinary.com/dlrinxri6/image/upload/v1762192561/products/eghevsqvmzxiicdffboj.png"
//             alt="أمانة منطقة الرياض"
//             className="w-16 h-16 object-contain font-bahij"
//           />
//         </div>

//         {/* صورة الشخص */}
//         <img
//           src={certificate.customerImage?.[0]}
//           alt={certificate.customerName}
//           className="w-36 h-28 object-cover mt-2 border border-gray-300"
//         />

//         {/* العنوان السفلي */}
//         <h2 className="mt-3 text-green-800 font-bahij font-bold text-2xl">
//           شهادة صحية
//         </h2>
//       </div>

//       <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden font-sans text-right mt-8 p-6">
//         <div dir="rtl" className="space-y-10 text-right">
//           <div className="font-bahij -mt-10 font-medium">
//             <Section title="بيانات الشهادة:">
//               <KeyValue label="رقم الشهادة" value={certificate.certificateNumber} />
//               <KeyValue label="تاريخ الإصدار" value={certificate.issueDate} />
//               <KeyValue label="نهاية الصلاحية" value={certificate.expiryDate} />
//             </Section>

//             <Section title="بيانات صاحب الشهادة: ">
//               <KeyValue label="الاسم" value={certificate.customerName} />
//               <KeyValue label="رقم الهوية" value={certificate.idNumber} />
//               <KeyValue label="الجنس" value={certificate.gender} />
//               <KeyValue label="الجنسية" value={certificate.nationality} />
//               <KeyValue label="المهنة" value={certificate.profession} />
//               <KeyValue
//                 label="البرنامج التثقيفي"
//                 value={certificate.educationalProgram}
//               />
//               <KeyValue
//                 label="تاريخ إنهاء البرنامج"
//                 value={certificate.programCompletionDate}
//               />
//             </Section>

//             <Section title="بيانات المنشأة:">
//               <KeyValue
//                 label="اسم المنشأة"
//                 value={certificate.establishmentName || "----"}
//               />
//               <KeyValue
//                 label="رقم رخصة المنشأة"
//                 value={certificate.establishmentLicense || "----"}
//               />
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🔹 Updated KeyValue Component (only value clickable)
// const KeyValue = ({ label, value }) => {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div className="flex py-2 items-center">
//       <span className="text-gray-500 w-40">{label}</span>
//       <span
//         className={`text-black px-2 py-1 w-full rounded-md items-center inline-flex ${
//           isActive ? "border-2 border-black" : ""
//         }`}
//         onClick={() => setIsActive(true)}
//         onBlur={() => setIsActive(false)}
//         tabIndex={0} // makes blur work
//       >
//         {value || "----"}
//       </span>
//     </div>
//   );
// };

// // مكوّن مساعد للقسم
// const Section = ({ title, children }) => (
//   <div className="py-3">
//     <h3 className="text-green-800 font-semibold mb-4 text-xl border-t border-gray-300 py-2">
//       {title}
//     </h3>
//     {children}
//   </div>
// );
