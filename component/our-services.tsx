"use client"

import Image from "next/image"

const WorkProcessSection = () => {
  const processes = [
    {
      number: '1',
      title: 'Careful Donor Area Planning',
      icon: '/proc-icon-1.png',
      isImage: true
    },
    {
      number: '2',
      title: 'Natural Hairline Design',
      icon: '/proc-icon-2.png',
      isImage: true
    },
    {
      number: '3',
      title: 'Precision Graft Placement',
      icon: '/proc-icon-3.png',
      isImage: true
    },
    {
      number: '4',
      title: 'Correct Implantation Angles',
      icon: '/proc-icon-4.png',
      isImage: true
    },
    {
      number: '5',
      title: 'High Graft Survival',
      icon: '/proc-icon-5.png',
      isImage: true
    },
    {
      number: '6',
      title: 'Long-Term Aesthetic Planning',
      icon: '/proc-icon-6.png',
      isImage: true
    }
  ];

  // Brand-red filter (#f52227) applied to the existing icon artwork.
  const brandRedFilter =
    "brightness(0) saturate(100%) invert(20%) sepia(98%) saturate(4845%) hue-rotate(352deg) brightness(101%) contrast(94%)"

  return (
    <div id='journey' className="bg-gradient-to-b from-white to-[#fff0f0]/30 px-4 sm:px-6 lg:px-8 max-sm:pb-7 pb-13 md:mt-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-sm:mb-10 mb-16">
          <div className="inline-flex items-center justify-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 44 22"
              className="h-5 w-10 text-[#f52227]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            >
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
            <p className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              Technology &amp; Expertise
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 44 22"
              className="h-5 w-10 -scale-x-100 text-[#f52227]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            >
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
          </div>
          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]">
            Technology Supports{" "}
            <span className="relative inline-block px-1">
              <span aria-hidden className="absolute inset-x-0 bottom-0.5 h-3 -rotate-1 bg-[#f52227]" />
              <span className="relative text-black">Expertise</span>
            </span>
            . It Doesn&apos;t Replace It.
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-gray-600">
            Modern technology plays an important role in hair transplantation, but technology alone doesn&apos;t
            create natural results.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#231f20]">Successful hair restoration depends on:</p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 max-sm:gap-0 gap-8 lg:gap-6 max-sm:mb-4 mb-12">
          {processes.map((process) => (
            <div 
              key={process.number}
              className="text-center"
            >
              {/* Icon and Number Container */}
              <div className="relative inline-block mb-6">
                {/* Background Circle */}
                <div className="w-22 h-22 bg-white rounded-full shadow-lg flex items-center justify-center p-3">
                  {process.isImage ? (
                    <Image
                      src={process.icon} 
                      alt={process.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      style={{ filter: brandRedFilter }}
                    />
                  ) : (
                    process.icon
                  )}
                </div>
                {/* Number Badge */}
                <div className="absolute -top-1 -left-2 w-8 h-8 bg-[#231f20] text-white rounded-full flex items-center justify-center text-md font-bold shadow-lg">
                  {process.number}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-sm font-bold text-[#231f20] sm:text-base">
                {process.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Reassurance Section */}
        <div className=" flex flex-wrap justify-center">
          <p className="max-w-5xl items-center text-sm leading-relaxed text-gray-600 max-sm:mb-4">
            Advanced techniques such as <strong>Sapphire FUE</strong> and <strong>Bio FUE</strong> enhance the
            procedure, but it&apos;s the expertise behind every decision that determines the outcome.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkProcessSection;
