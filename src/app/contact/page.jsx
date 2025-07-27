"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import PropertyContactForm from "@/components/PropertyContactForm";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const ContactPage = () => {
    return (
        <>
        <Navbar/>
        <main className="min-h-screen bg-gradient-to-br from-[#e9f5e1] via-[#fffbe6] to-[#f5f5f7] flex flex-col items-center justify-start pt-0">
            {/* Hero Section */}
            <section
                className="w-full relative flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh] shadow-lg overflow-hidden mb-12"
                style={{
                    backgroundImage: "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(16,54,9,0.3), rgba(191,161,74,0.2)), url('/image/bg-hero/1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    filter: "brightness(0.92)",
                }}  
            >
                <div className="absolute inset-0 opacity-10 bg-[url('/image/noise.jpg')] bg-repeat" />
                <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
                    <Image src="/image/logo.png" alt="Graha Gloria Group" width={120} height={120} className="mb-4 drop-shadow-lg" />
                    <h1 className="text-4xl md:text-5xl font-bold text-[#fff39b] mb-4 text-center tracking-tight" style={{ textShadow: '0 2px 16px #fff8, 0 1px 0 #bfa14a' }}>Contact Us</h1>
                    <p className="text-lg md:text-xl text-white max-w-2xl text-center mb-2">Kami siap membantu Anda mewujudkan hunian impian bersama <span className="font-semibold text-[#ffe69c]">Graha Gloria Group</span>. Hubungi kami untuk konsultasi, pertanyaan, atau kerjasama.</p>
                </div>
            </section>

            {/* Info & Form Section */}
            <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-0 mb-16">
                {/* Info Kontak */}
                <div className="flex flex-col gap-8 justify-center">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#bfa14a] to-[#1a3c2b] text-white text-2xl shadow-lg">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5M12 3v13m0 0l-3.5-3.5M12 16l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <div>
                            <h3 className="font-bold text-lg text-[#1a3c2b]">Alamat Kantor</h3>
                            <p className="text-[#3d3d3d]">Jl. Contoh Alamat No. 123, Surabaya, Jawa Timur</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#bfa14a] to-[#1a3c2b] text-white text-2xl shadow-lg">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5M12 3v13m0 0l-3.5-3.5M12 16l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <div>
                            <h3 className="font-bold text-lg text-[#1a3c2b]">Email</h3>
                            <a href="mailto:info@grahagloria.com" className="text-[#bfa14a] hover:underline">info@grahagloria.com</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#bfa14a] to-[#1a3c2b] text-white text-2xl shadow-lg">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-13Z" stroke="currentColor" strokeWidth="2" /><path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </span>
                        <div>
                            <h3 className="font-bold text-lg text-[#1a3c2b]">Telepon</h3>
                            <a href="tel:+62311234567" className="text-[#bfa14a] hover:underline">(031) 123-4567</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        {/* Instagram */}
                        <a href="https://instagram.com/grahagloriagroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa14a] text-white hover:bg-[#1a3c2b] transition">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z"/>
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://facebook.com/grahagloriagroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa14a] text-white hover:bg-[#1a3c2b] transition">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.525 2.273h-3.05c-3.03 0-4.975 1.86-4.975 4.74v2.19H6.475a.475.475 0 0 0-.475.475v2.81c0 .262.213.475.475.475h3.025v7.557c0 .262.213.475.475.475h3.13a.475.475 0 0 0 .475-.475v-7.557h2.8a.475.475 0 0 0 .475-.475l.001-2.81a.475.475 0 0 0-.475-.475h-2.8v-1.86c0-.56.134-.845.87-.845h1.93a.475.475 0 0 0 .475-.475V2.748a.475.475 0 0 0-.475-.475z"/>
                            </svg>
                        </a>
                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@grahagloriagroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa14a] text-white hover:bg-[#1a3c2b] transition">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.5 2a.5.5 0 0 1 .5.5v2.25a3.75 3.75 0 0 0 3.75 3.75h.25a.5.5 0 0 1 .5.5v2.25a.5.5 0 0 1-.5.5h-.25A6.25 6.25 0 0 1 16 5.25V18a4.25 4.25 0 1 1-4.25-4.25.5.5 0 0 1 .5.5v2.25a.5.5 0 0 1-.5.5A1.75 1.75 0 1 0 13.75 18V2.5a.5.5 0 0 1 .5-.5h3.25z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                {/* Form Kontak */}
                <div className="bg-white/80 rounded-3xl shadow-xl p-8 flex flex-col justify-center border border-[#e5e5e5]">
                    <h2 className="text-2xl font-bold text-[#1a3c2b] mb-4">Kirim Pesan</h2>
                    <PropertyContactForm />
                </div>
            </section>

            {/* Map Section */}
            <section className="w-full max-w-5xl px-4 md:px-0 mb-24">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#e5e5e5]">
                    <iframe
                        title="Lokasi Graha Gloria Group"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf123456789%3A0x123456789abcdef!2sGraha%20Gloria%20Group!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    );
};

export default ContactPage;
