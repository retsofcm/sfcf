import { useState } from "react";

// Generic form handler with type safety
export const useFormHandler = <T extends Record<string, string>>(
  initialData: T
) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [message, setMessage] = useState("");
  const submitUrl = "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    console.log("Submit URL:", submitUrl);
    // Example validation (customize as needed)
    if (!formData.email || !formData.name) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      if (submitUrl) {
        const response = await fetch(submitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setMessage("Thank you for your submission!");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setMessage("Form submitted successfully!");
      }

      setFormData(initialData); // reset the form
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  return {
    formData,
    message,
    handleInputChange,
    handleSubmit,
  };
};
