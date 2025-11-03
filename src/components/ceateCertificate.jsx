import React, { useState } from "react";
import { useCreateCertificateMutation } from "../redux/certiicateapislice";

export default function CreateCertificate() {
  const [createCertificate, { isLoading }] = useCreateCertificateMutation();

  const [formData, setFormData] = useState({
    certificateNumber: "",
    issueDate: "",
    expiryDate: "",
    customerName: "",
    idNumber: "",
    gender: "",
    nationality: "",
    profession: "",
    educationalProgram: "",
    programCompletionDate: "",
    establishmentName: "",
    establishmentLicense: "",
  });

  // For images (files)
  const [customerImages, setCustomerImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file select
  const handleImageChange = (e) => {
    setCustomerImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object for file upload
      const data = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Append image files to 'customerImage' field - your backend expects req.files
      customerImages.forEach((file) => {
        data.append("customerImage", file);
      });

      // Call the mutation
      await createCertificate(data).unwrap();

      alert("تم إنشاء الشهادة بنجاح");
      // Optionally reset form or navigate
      setFormData({
        certificateNumber: "",
        issueDate: "",
        expiryDate: "",
        customerName: "",
        idNumber: "",
        gender: "",
        nationality: "",
        profession: "",
        educationalProgram: "",
        programCompletionDate: "",
        establishmentName: "",
        establishmentLicense: "",
      });
      setCustomerImages([]);
    } catch (error) {
      alert("حدث خطأ أثناء إنشاء الشهادة",error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-right font-sans max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-green-800">إنشاء شهادة جديدة</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-semibold mb-1">رقم الشهادة</label>
          <input
            type="text"
            name="certificateNumber"
            value={formData.certificateNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">تاريخ الإصدار</label>
          <input
            type="text"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">تاريخ الانتهاء</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">رفع صور العميل (اختياري)</label>
          <input
            type="file"
            name="customerImage"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">اسم العميل</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">رقم الهوية</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">الجنس</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">الجنسية</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">المهنة</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">البرنامج التدريبي</label>
          <input
            type="text"
            name="educationalProgram"
            value={formData.educationalProgram}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">تاريخ إنهاء البرنامج</label>
          <input
            type="text"
            name="programCompletionDate"
            value={formData.programCompletionDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">اسم المنشأة</label>
          <input
            type="text"
            name="establishmentName"
            value={formData.establishmentName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">رقم رخصة المنشأة</label>
          <input
            type="text"
            name="establishmentLicense"
            value={formData.establishmentLicense}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mt-4 w-full"
        >
          {isLoading ? "جارٍ الإنشاء..." : "إنشاء الشهادة"}
        </button>
      </form>
    </div>
  );
}
