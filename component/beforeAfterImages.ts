const IMAGE_NUMBERS = [2, 6, 7, 8, 9, 12, 16, 18, 19, 20, 21, 24, 30, 31, 39, 46, 47]

function imagePath(number: number) {
  // The file for 47 is spelled "Natural"; the rest use "Naural".
  const hairline = number === 47 ? "Natural" : "Naural"
  return encodeURI(
    `/Best Hair Transplant Clinic in Thane Infinity Aesthetics Clinic ${hairline} Hairline Dr Narendra Nikumbh HFD BIO FUE ${number}.jpg`,
  )
}

export const BEFORE_AFTER_RESULTS = IMAGE_NUMBERS.map((number, index) => ({
  src: imagePath(number),
  alt: "Hair transplant before and after result " + (index + 1) + " – Infinity Aesthetics Clinic, Thane",
}))
