/**
 * All the regex used for extracting information from text. Natural Language Processing
 * techniques need to be improved...
 */
export const age = [
  /\b(?:I\s+am|I['’]m|Im)\s+(\d{2})(?:[^%\d]|$)/i,
  /^[\s{[(]?[mf](\d{2})\b/i,
  /^[\s{[(]?(\d{2})[mf]\b/i,
  /^[mf]\/(\d{2})\b/i,
]
age.name = 'AGE'

export const gender = [
  /\b(?:I\s+am|I['’]m|Im)\s+a?\s*(man|woman|male|female|guy|girl|dude|chick|bloke|lady)\b/i,
  /\bAs\s*a?\s*(man|woman|male|female|guy|girl|dude|chick|bloke|lady)\b/,
  /^[\s{[(]?([mf])\d{2}\b/i,
  /^[\s{[(]?\d{2}([mf])\b/i,
  /^([mf])\/\d{2}\b/i,
]
gender.name = 'GENDER'

export const height = [
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(\d\s*['’]\s*\d{1,2}\s*["”]?)/i,
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(\d\s*(?:ft|feet|foot)\s*\d{1,2})/i,
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(\d{3}\s*(?:cm|centim))\b/i,
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(\d[.,]\d{1,2}\s*m(?:eters|etres)?\b)/i,
  /^[mf]\/\d{2}\b\/(\d\s*['’]\s*\d{1,2}\s*["”]?)\b/i,
  /^[mf]\/\d{2}\b\/(\d\s*(?:ft|feet|foot)\s*\d{1,2})\b/i,
  /^[mf]\/\d{2}\b\/(\d{3}\s*(?:cm|centim))\b/i,
  /^[mf]\/\d{2}\b\/(\d[.,]\d{1,2}\s*m(?:eters|etres)?\b)\b/i,
]
height.name = 'HEIGHT'

export const weight = [
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(\d{2,3}\s*(lb|ibs|kg|pound|kilo|stone))/i,
  /\bI\s+weigh\s+.*?(\d{2,3}\s*(lb|ibs|kg|st|pound|kilo|stone))/i,
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(?:\d\s*'\s*\d{1,2}\s*"?)\s*(\d{2,3})/i,
  /\b(?:I\s+am|I['’]m|Im)\s+.*?(?:\d\s*(?:ft|feet|foot)\s*\d{1,2})\s*(\d{2,3})/i,
  /^[mf]\/\d{2}\b\/.+\[.+?>(.+?)=/i, // r/progresspics format
]
weight.name = 'WEIGHT'

export const occupation = [
  /\bI\s+work\s+in\s+(.+?)(?=and\b|but\b|so\b|[\n\r,;:-]|\.\s)/i,
  /\bmy\s+job\s+is\s+(?:to\s+)?([^.,\n\r]+)/i,
]
occupation.name = 'OCCUPATION'

export const location = [
  /I\s+live\s+in\s+(.+?)(?=and\b|but\b|so\b|[\n\r,;:-]|\.\s)/i,
]
location.name = 'LOCATION'
