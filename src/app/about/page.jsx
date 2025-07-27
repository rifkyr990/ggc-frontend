import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f5] text-[#222] font-sans">
        {/* Hero Section as Header */}
        <header className="relative flex flex-col items-center justify-center w-full h-[320px] md:h-[400px] lg:h-[480px] overflow-hidden mb-8">
          <Image
            src="/image/bg-hero/1.png"
            alt="Hero"
            fill
            priority
            className="object-cover w-full h-full z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/30 to-yellow-700/20  z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl md:text-5xl font-light italic tracking-widest mb-2 text-white drop-shadow pt-20 mt-6">
              GRAHA GLORIA
            </h1>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6 text-white drop-shadow">
              GROUP
            </h2>
          </div>
        </header>

        {/* Visi Misi Section */}
        <section className="max-w-3xl mx-auto py-8 px-4">
          <h3 className="text-2xl md:text-3xl font-light mb-2">
            WUJUDKAN <span className="italic">HUNIAN IMPIAN</span> ANDA BERSAMA
            KAMI
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Graha Gloria Group berkomitmen menghadirkan hunian berkualitas,
            nyaman, dan bernilai investasi tinggi. Dengan pengalaman lebih dari
            10 tahun di bidang properti, kami siap membantu Anda mewujudkan
            rumah idaman, baik untuk tempat tinggal maupun investasi masa depan.
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Perumahan",
              "Ruko & Komersial",
              "Cluster Modern",
              "Kawasan Industri",
              "Investasi Properti",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center mr-2">
                  <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                </span>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Slogan Section */}
        <section className="max-w-3xl mx-auto px-4 mb-12">
          <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 text-sm py-2 px-4">
            "Membangun masa depan yang lebih baik melalui hunian berkualitas dan
            pelayanan terbaik untuk setiap keluarga Indonesia."
          </blockquote>
          <div className="flex items-center gap-2 mt-4">
            <Image
              src="/image/logo.png"
              alt="CEO"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-xs font-semibold">Budi Santoso</span>
            <span className="text-xs text-gray-500">Direktur Utama</span>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <h3 className="text-2xl font-light mb-6">
            TIM <span className="italic">KAMI</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <Image
                src="/image/about.png"
                alt="Budi Santoso"
                width={120}
                height={120}
                className="rounded bg-gray-200"
              />
              <span className="mt-2 text-sm font-semibold">Budi Santoso</span>
              <span className="text-xs text-gray-500">Direktur Utama</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/image/about.png"
                alt="Siti Rahmawati"
                width={120}
                height={120}
                className="rounded bg-gray-200"
              />
              <span className="mt-2 text-sm font-semibold">Siti Rahmawati</span>
              <span className="text-xs text-gray-500">Manajer Pemasaran</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/image/about.png"
                alt="Andi Pratama"
                width={120}
                height={120}
                className="rounded bg-gray-200"
              />
              <span className="mt-2 text-sm font-semibold">Andi Pratama</span>
              <span className="text-xs text-gray-500">Manajer Proyek</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/image/about.png"
                alt="Maria Yuliana"
                width={120}
                height={120}
                className="rounded bg-gray-200"
              />
              <span className="mt-2 text-sm font-semibold">Maria Yuliana</span>
              <span className="text-xs text-gray-500">
                Keuangan & Administrasi
              </span>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="max-w-3xl mx-auto px-4 mb-16">
          <h3 className="text-2xl font-light mb-6">
            PENGHARGAAN <span className="italic">& PRESTASI</span>
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b pb-2 mb-2">
              <span>Developer Properti Terpercaya Jawa Timur</span>
              <span className="text-xs border px-2 py-1 rounded mb-1">
                2022
              </span>
            </li>
            <li className="flex justify-between items-center border-b pb-2 mb-2">
              <span>Penghargaan Green Building</span>
              <span className="text-xs border px-2 py-1 rounded mb-1">
                2021
              </span>
            </li>
            <li className="flex justify-between items-center border-b pb-2 mb-2">
              <span>Top 10 Real Estate Innovation</span>
              <span className="text-xs border px-2 py-1 rounded mb-1">
                2020
              </span>
            </li>
            <li className="flex justify-between items-center border-b pb-2 mb-2">
              <span>Pengembang Favorit Pilihan Konsumen</span>
              <span className="text-xs border px-2 py-1 rounded mb-1">
                2019
              </span>
            </li>
            <li className="flex justify-between items-center border-b pb-2 mb-2">
              <span>Best Customer Service Property</span>
              <span className="text-xs border px-2 py-1 rounded mb-1">
                2018
              </span>
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="max-w-3xl mx-auto px-4 ">
          <h4 className="text-lg font-semibold mb-2">HUBUNGI KAMI</h4>
          <p className="text-sm text-gray-600 mb-4">
            Tertarik memiliki hunian di Graha Gloria Group? Masukkan email Anda
            untuk konsultasi gratis atau hubungi tim kami untuk informasi lebih
            lanjut.
          </p>
          <form className="flex gap-2 mb-2">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Kirim
            </button>
          </form>
          <div className="text-xs text-gray-500 pb-10">
            marketing@grahagloria.co.id | (031) 555-8899
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
