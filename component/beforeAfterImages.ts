// Every before/after photo in /public. "30 (1)" is left out because it is the
// same photo as "26" with a different crop.
const PREFIX = "/Best Hair Transplant Clinic in Thane Infinity Aesthetics Clinic "
const NAURAL = "Naural Hairline Dr Narendra Nikumbh HFD BIO FUE "
const NATURAL = "Natural Hairline Dr Narendra Nikumbh HFD BIO FUE "

const FILES = [
  ...[
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "14 (1)",
    "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
    "28", "29", "30", "30b", "31", "31 (1)", "32", "33", "34", "34 (1)", "35",
    "35 (1)", "36", "38", "39", "39 (1)", "40", "41", "42", "43", "44", "45", "46",
  ].map((name) => NAURAL + name + ".jpg"),
  ...["47", "48", "50", "51", "52", "53jpg", "54"].map((name) => NATURAL + name + ".jpg"),
]

export const BEFORE_AFTER_RESULTS = FILES.map((file, index) => ({
  src: encodeURI(PREFIX + file),
  alt: "Hair transplant before and after result " + (index + 1) + " – Infinity Aesthetics Clinic, Thane",
}))
