const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Perumahan dengan spesifikasi dan fasilitas
const createPerumahan = async (req, res) => {
  try {
    const {
      nama,
      lokasi,
      hargaMulai,
      thumbnail,
      gambarLainnya,
      deskripsi,
      spesifikasi,    // array objek spesifikasi
      fasilitasIds,   // array fasilitas id
    } = req.body;

    // Create perumahan dulu
    const perumahan = await prisma.perumahan.create({
      data: {
        nama,
        lokasi,
        hargaMulai,
        thumbnail,
        gambarLainnya,
        deskripsi,
        spesifikasi: {
          create: spesifikasi, // prisma akan buat data spesifikasi otomatis
        },
        fasilitas: {
          create: fasilitasIds.map(fid => ({
            fasilitasId: fid,
          })),
        },
      },
      include: {
        spesifikasi: true,
        fasilitas: {
          include: { fasilitas: true },
        },
      },
    });

    res.status(201).json(perumahan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create perumahan' });
  }
};

// Read all Perumahan lengkap dengan relasi
const getAllPerumahan = async (req, res) => {
  try {
    const perumahans = await prisma.perumahan.findMany({
      include: {
        spesifikasi: true,
        fasilitas: {
          include: {
            fasilitas: true,
          },
        },
      },
    });
    res.json(perumahans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch perumahan' });
  }
};

// Read single Perumahan by id
const getPerumahanById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const perumahan = await prisma.perumahan.findUnique({
      where: { id },
      include: {
        spesifikasi: true,
        fasilitas: {
          include: {
            fasilitas: true,
          },
        },
      },
    });
    if (!perumahan) return res.status(404).json({ error: 'Perumahan not found' });
    res.json(perumahan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch perumahan' });
  }
};

// Update Perumahan + spesifikasi + fasilitas (replace semua fasilitas dan spesifikasi)
const updatePerumahan = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const {
        nama,
        lokasi,
        hargaMulai,
        thumbnail,
        gambarLainnya,
        deskripsi,
        spesifikasi,  // array objek spesifikasi baru
        fasilitasIds, // array fasilitas id baru
        } = req.body;

        // Update main Perumahan
        const perumahanUpdated = await prisma.perumahan.update({
        where: { id },
        data: {
            nama,
            lokasi,
            hargaMulai,
            thumbnail,
            gambarLainnya,
            deskripsi,
        },
        });

        // Hapus spesifikasi lama dan buat baru (replace)
        await prisma.spesifikasiPerumahan.deleteMany({ where: { perumahanId: id } });
        await prisma.spesifikasiPerumahan.createMany({
        data: spesifikasi.map(s => ({ ...s, perumahanId: id })),
        });

        // Hapus relasi fasilitas lama
        await prisma.fasilitasPerumahan.deleteMany({ where: { perumahanId: id } });
        // Buat relasi fasilitas baru
        await prisma.fasilitasPerumahan.createMany({
        data: fasilitasIds.map(fid => ({
            perumahanId: id,
            fasilitasId: fid,
        })),
        });

        // Ambil data updated lengkap
        const updatedData = await prisma.perumahan.findUnique({
        where: { id },
        include: {
            spesifikasi: true,
            fasilitas: {
            include: { fasilitas: true },
            },
        },
        });

        res.json(updatedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update perumahan' });
    }
};

// Delete Perumahan + cascade spesifikasi & fasilitas relation
const deletePerumahan = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        // Hapus spesifikasi dulu
        await prisma.spesifikasiPerumahan.deleteMany({ where: { perumahanId: id } });
        // Hapus fasilitas relation dulu
        await prisma.fasilitasPerumahan.deleteMany({ where: { perumahanId: id } });
        // Hapus perumahan
        await prisma.perumahan.delete({ where: { id } });

        res.json({ message: 'Perumahan deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete perumahan' });
    }
};

module.exports = {
    createPerumahan,
    getAllPerumahan,
    getPerumahanById,
    updatePerumahan,
    deletePerumahan,
};
