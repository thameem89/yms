export const enquiryTypes = [
  "General Enquiry", "Engineering / Design", "Fabrication", "Erection",
  "Protective Coating", "Fireproofing", "Project Enquiry",
] as const;

export const enquiryFields = {
  name: { label: "Name", min: 2, max: 100 },
  company: { label: "Company", min: 0, max: 150 },
  email: { label: "Email", min: 3, max: 254 },
  phone: { label: "Phone", min: 0, max: 40 },
  country: { label: "Country", min: 0, max: 100 },
  type: { label: "Enquiry type", min: 1, max: 80 },
  message: { label: "Message", min: 10, max: 3500 },
} as const;

export type EnquiryField = keyof typeof enquiryFields;
export type Enquiry = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export function validateEnquiry(input: Record<string, unknown>) {
  const errors: EnquiryErrors = {};
  const values = {} as Enquiry;
  for (const key of Object.keys(enquiryFields) as EnquiryField[]) {
    const { label, min, max } = enquiryFields[key];
    const value = input[key];
    values[key] = typeof value === "string" ? value.trim() : "";
    if (values[key].length < min || values[key].length > max) {
      errors[key] = !values[key] ? label + " is required." : label + " must be between " + min + " and " + max + " characters.";
    }
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!enquiryTypes.some((type) => type === values.type)) errors.type = "Choose an enquiry type.";
  return { errors, values };
}
