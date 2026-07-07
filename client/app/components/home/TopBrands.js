"use client";
import Image from "next/image";
import { useLang } from "../../context/LangContext";

const brands = [
  { name: "Samsung", img: "/images/sanmsunglogo.png" },
  { name: "Nike",    img: "/images/nikelogo.png" },
  { name: "Apple",   img: "/images/applelogo.png"    },
  { name: "Adidas",  img: "/images/addidaslogo.png"  },
  { name: "L'Oréal", img: "/images/loreallogo.png"   },
  { name: "Sony",    img: "/images/sonylogo.png"     },
  { name: "H&M",     img: "/images/hmlogo.png"       },
  { name: "Philips", img: "/images/philipslogo.png"  },
];

export default function TopBrands() {
  const { lang } = useLang();
  const isAR = lang === "ar";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12" dir={isAR ? "rtl" : "ltr"}>

      <div className="text-center mb-5 sm:mb-6 md:mb-8">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-0.5 sm:mb-1">
          {isAR ? "شركاؤنا" : "Our Partners"}
        </p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white">
          {isAR ? "أشهر الماركات" : "Top Brands"}
        </h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
        {brands.map((brand) => (
          <button
            key={brand.name}
            className="group flex flex-col items-center justify-center gap-2 py-4 sm:py-5 px-2 sm:px-3 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#13112a] hover:border-[#f0a500]/40 hover:shadow-md hover:shadow-[#f0a500]/5 transition-all duration-200 cursor-pointer"
          >
            <div className="relative w-12 h-8 sm:w-16 sm:h-10 flex items-center justify-center">
              <Image
                src={brand.img}
                alt={brand.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-200"
                sizes="64px"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 dark:text-white/40 group-hover:text-[#f0a500] transition-colors text-center leading-tight">
              {brand.name}
            </span>
          </button>
        ))}
      </div>

    </section>
  );
}
