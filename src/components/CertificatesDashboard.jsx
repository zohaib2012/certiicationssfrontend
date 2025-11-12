
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteCertificateMutation,
  useGetCertificatesQuery,
} from "../redux/certiicateapislice";

export default function CertificatesDashboard() {
  const { data: certificates = [], isLoading } = useGetCertificatesQuery();
  const [deleteCertificate] = useDeleteCertificateMutation();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const total = certificates.length;
  const expired = certificates.filter(
    (c) => c.expiryDate && new Date(c.expiryDate) < new Date()
  ).length;
  const valid = total - expired;

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذه الشهادة؟")) {
      await deleteCertificate(id);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("Token");
    let token = localStorage.getItem("Token");
    if (!token) {
      navigate("/");
    }
  };

  // Helper functions to keep UI safe
  const safeText = (value, length = 15) =>
    typeof value === "string" ? value.substring(0, length) : "—";

  const formatDate = (dateValue) => {
    if (!dateValue) return "—";
    const d = new Date(dateValue);
    if (isNaN(d)) return "—";
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-right font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-green-800 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold mb-2 sm:mb-0">
          لوحة تحكم نظام الشهادات
        </h2>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 space-x-reverse">
          <span>مرحباً، if0_39929904</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            تسجيل خروج
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 my-6">
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-3xl font-bold text-green-700">{total}</h3>
          <p className="text-gray-700">إجمالي الشهادات</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-3xl font-bold text-green-700">{valid}</h3>
          <p className="text-gray-700">الشهادات الصالحة</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-3xl font-bold text-green-700">{expired}</h3>
          <p className="text-gray-700">الشهادات المنتهية</p>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <Link
          to={"/certificate/create"}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
        >
          إضافة شهادة جديدة
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-right">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-2 px-4">الصورة</th>
              <th className="py-2 px-4">رقم الشهادة</th>
              <th className="py-2 px-4">اسم العميل</th>
              <th className="py-2 px-4">رقم الهوية</th>
              <th className="py-2 px-4">المهنة</th>
              <th className="py-2 px-4">تاريخ الإصدار</th>
              <th className="py-2 px-4">تاريخ الانتهاء</th>
              <th className="py-2 px-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">
                  <img
                    src={c.customerImage?.[0] || "/placeholder.jpg"}
                    alt={safeText(c.customerName)}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4">{safeText(c.certificateNumber)}</td>
                <td className="py-2 px-4">{safeText(c.customerName)}</td>
                <td className="py-2 px-4">{safeText(c.idNumber)}</td>
                <td className="py-2 px-4">{safeText(c.profession)}</td>

                <td className="py-2 px-4">{safeText(c.issueDate)}</td>
                <td className="py-2 px-4">{safeText(c.expiryDate)}</td>
                <td className="py-2 px-4 flex gap-2 justify-center">
                  <Link
                    to={`/DownloadFile/eu6beCfGRB1q-rQ3h1Q81q-rQ3h1Q86SECDhX_9QdDOdqzxjjjUAq-R-6SECDhX_9QdDOdqzxjjjUAq-RfU6pNyEslkTfFhRpIsYrtouNdEyYxJCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWmU_OZ12FvUcufV6nFDX67R0ItaeV7JiXwi8XNCfijFQieIlZAPumCQT7Ej3PiM_EHEj5f3QYgvny0Hgia2JrW85JxPTLgLor7bKAfun2ohTNnd8aItSF43sqUiEoRCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeWCXGnAOu_vdg8vsjk4xEf9EgM05XF6JeW1UqEnxbh14KHss8ZR98gJVz5XX4iLFDr9ptwws4zrsBv70AhiQ-KMptLVOhIuu-5NIQduuda4FtyDs_THedTmTaLQsCp273286327273Lor7bKAfun2ohTNnd8aItSF43sqUiEoR1UqE623982732372352653h1Q81q-rQ3h1Q86SECDhX_9QdDOdqz2327823276327BSMqvADkcWXHR5HzGrbR3oxRNTCHvCmm5xEfFhRp67R0ItaeV7JiXwi8XNCfijFQieIlZAPumC/${c._id}`}
                    className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded inline-block text-center"
                  >
                    عرض
                  </Link>

                  <Link
                    to={`/certificate/edit/${c._id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded inline-block text-center"
                  >
                    تعديل
                  </Link>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
