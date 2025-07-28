"use client";
import PropertyContactForm from "@/components/PropertyContactForm";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#f9f7ed] via-[#fffbe6] to-[#f5f5f7] flex flex-col items-center pt-0">
        {/* Hero Section */}
        <section
          className="w-full relative flex flex-col items-center justify-center min-h-[38vh] md:min-h-[38vh] shadow-lg overflow-hidden mb-10"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(191,161,74,0.08)), url('/image/bg-hero/1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('/image/noise.jpg')] bg-repeat" />
          <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-100 mb-3 text-center drop-shadow-lg tracking-tight">
              Hubungi Graha Gloria Group
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl text-center mb-2">
              Siap membantu Anda mewujudkan hunian impian dan konsultasi properti terbaik!
            </p>
          </div>
        </section>

        {/* Info & Form Section */}
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-0 mb-20">
          {/* Info Kontak */}
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col justify-between border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-600 mb-6">Kontak & Sosial Media</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-2xl shadow-lg">
                  <MapPin className="w-7 h-7" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Alamat Kantor</h3>
                  <p className="text-gray-600">
                    Jl. Pahlawan, Dusun Ketanon, Kedungwaru, <br />Kec. Kedungwaru,
                    Kabupaten Tulungagung
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-2xl shadow-lg">
                  <Mail className="w-7 h-7" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Email</h3>
                  <a
                    href="mailto:pt.grahagloria.indah@gmail.com"
                    className="text-yellow-600 hover:underline"
                  >
                    pt.grahagloria.indah@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-2xl shadow-lg">
                  <Phone className="w-7 h-7" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Telepon</h3>
                  <a href="tel:081333997000" className="text-yellow-600 hover:underline">
                    0813-3399-7000
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <a href="https://instagram.com/grahagloria.group" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition shadow-lg">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100087394959439&locale=id_ID" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition shadow-lg">
                <FaFacebook />
              </a>
              <a href="https://www.tiktok.com/@graha.gloria" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition shadow-lg">
                <FaTiktok />
              </a>
            </div>
          </div>
          {/* Form Kontak */}
          <PropertyContactForm />
        </section>

        {/* Map Section */}
        <section className="w-full max-w-6xl px-4 md:px-0 mb-24">
          <div className="w-full flex justify-center pb-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4118.330701376113!2d111.91093105618201!3d-8.043502097477017!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78fcd4b016811f%3A0x6b3dbef632927eaa!2sPerum%20Graha%20Indah%20Ketanon!5e0!3m2!1sen!2sid!4v1753718411112!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg max-w-3xl"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
