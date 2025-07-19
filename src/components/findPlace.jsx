import React from "react";
import { Bed, Bath, Snowflake } from "lucide-react";

const properties = [
    {
        name: "Malto House",
        img: "/public/image/heros_test.png",
        beds: 4,
        baths: 2,
        ac: 2,
    },
    {
        name: "Malto House",
        img: "/public/image/heros_test2.webp",
        beds: 4,
        baths: 2,
        ac: 2,
    },
    {
        name: "Malto House",
        img: "/public/image/heros_test3.webp",
        beds: 4,
        baths: 2,
        ac: 2,
    },
    {
        name: "Malto House",
        img: "/public/image/heros_test3.webp",
        beds: 4,
        baths: 2,
        ac: 2,
    },
    {
        name: "Malto House",
        img: "/public/image/heros_test2.webp",
        beds: 4,
        baths: 2,
        ac: 2,
    },
    {
        name: "Malto House",
        img: "/public/image/heros_test.png",
        beds: 4,
        baths: 2,
        ac: 2,
    },
];

export default function FindPlace() {
    return (
        <div className="bg-[#f5f5f7] min-h-[140vh] flex flex-col items-center justify-start py-16 px-6 md:px-32">
            {/* Header */}
            <div className="mb-12 w-full max-w-7xl">
                <div className="mb-4 h-1 w-30 bg-gradient-to-r from-orange-500 to-black rounded-full" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find your next place to live</h1>
            </div>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-6 mb-16 w-full max-w-7xl">
                <div className="flex-1 bg-white rounded-xl shadow p-6 flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-sm text-gray-700">Looking for</span>
                    <span className="ml-2">▼</span>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow p-6 flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-sm text-gray-700">Location</span>
                    <span className="ml-2">▼</span>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow p-6 flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-sm text-gray-700">Property Type</span>
                    <span className="ml-2">▼</span>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow p-6 flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-sm text-gray-700">Price</span>
                    <span className="ml-2">▼</span>
                </div>
            </div>
            {/* Property Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl">
                {properties.map((property, idx) => (
                    <div key={idx} className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[420px] max-w-xs mx-auto">
                        <div className="h-60 w-full overflow-hidden">
                            <img
                                src={property.img.replace('/public', '')}
                                alt={property.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="font-semibold text-lg text-gray-900 mb-2">{property.name}</div>
                            <div className="flex justify-between text-gray-500 text-sm border-t pt-2 mt-2">
                                <div className="flex items-center gap-1">
                                    <Bed className="w-5 h-5 text-gray-700" /> {property.beds}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bath className="w-5 h-5 text-gray-700" /> {property.baths}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Snowflake className="w-5 h-5 text-gray-700" /> {property.ac}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
