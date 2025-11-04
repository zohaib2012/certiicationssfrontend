


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCertificateByIdQuery,
  useUpdateCertificateMutation,
} from "../redux/certiicateapislice";

export default function EditCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch certificate by ID
  const { data: certificate, isLoading, isError } =
    useGetCertificateByIdQuery(id);

  // Mutation for update
  const [updateCertificate, { isLoading: isUpdating }] =
    useUpdateCertificateMutation();

  // Local state for form
  const [formData, setFormData] = useState({
    certificateNumber: "",
    issueDate: "",
    expiryDate: "",
    customerImage: [""], // URLs
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

  // Local state for file preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Fill form when data loads
  useEffect(() => {
    if (certificate) {
      setFormData({
        certificateNumber: certificate.certificateNumber || "",
        issueDate: certificate.issueDate|| [""],
          // ? new Date(certificate.issueDate).toISOString().substring(0, 10)
          // : "",

        expiryDate: certificate.expiryDate|| [""],
          // ? new Date(certificate.expiryDate).toISOString().substring(0, 10)
          // : "",

        customerImage: certificate.customerImage || [""],
        customerName: certificate.customerName || "",
        idNumber: certificate.idNumber || "",
        gender: certificate.gender || "",
        nationality: certificate.nationality || "",
        profession: certificate.profession || "",
        educationalProgram: certificate.educationalProgram || "",
        programCompletionDate: certificate.programCompletionDate|| [""],

          // ? new Date(certificate.programCompletionDate)
          //     .toISOString()
          //     .substring(0, 10)
          // : "",
          
        establishmentName: certificate.establishmentName || "",
        establishmentLicense: certificate.establishmentLicense || "",
      });

      if (certificate.customerImage && certificate.customerImage[0]) {
        setPreviewUrl(certificate.customerImage[0]);
      }
    }
  }, [certificate]);

  if (isLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading certificate
      </p>
    );

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Show preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload file to Cloudinary (replace with your API)
  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "YOUR_CLOUDINARY_PRESET"); // Replace with your preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload",
      {
        method: "POST",
        body: form,
      }
    );
    const data = await response.json();
    return data.secure_url; // Cloudinary URL
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrls = formData.customerImage;

      // If new file selected, upload to Cloudinary
      if (selectedFile) {
        const uploadedUrl = await uploadFile(selectedFile);
        imageUrls = [uploadedUrl];
      }

      await updateCertificate({
        id,
        data: { ...formData, customerImage: imageUrls },
      }).unwrap();

      alert("تم تحديث الشهادة بنجاح");
      navigate("/"); // Go back to dashboard
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تحديث الشهادة");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-right font-sans max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-green-800">تعديل شهادة</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        {/* Certificate Fields */}
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
            type="date"
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
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Customer Image */}
        <div>
          <label className="block font-semibold mb-1">صورة العميل</label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Remaining Fields */}
        {[
          { label: "اسم العميل", name: "customerName" },
          { label: "رقم الهوية", name: "idNumber" },
          { label: "الجنس", name: "gender" },
          { label: "الجنسية", name: "nationality" },
          { label: "المهنة", name: "profession" },
          { label: "البرنامج التدريبي", name: "educationalProgram" },
          { label: "تاريخ إنهاء البرنامج", name: "programCompletionDate", type: "date" },
          { label: "اسم المنشأة", name: "establishmentName" },
          { label: "رقم رخصة المنشأة", name: "establishmentLicense" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-semibold mb-1">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          {isUpdating ? "جارٍ التحديث..." : "تحديث الشهادة"}
        </button>
      </form>
    </div>
  );
}
