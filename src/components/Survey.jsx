import { useState } from "react";
import { z } from "zod";

const Survey = () => {
  
  const surveySchema = z.object({
    one: z.string().min(6, { message: "At least six characters required" }),
    two: z.string().min(6, { message: "At least six characters required" }),
    three: z.string().min(6, { message: "At least six characters required" }),
  });

  const [response, setResponse] = useState({ one: "", two: "", three: "" });
  const [final, setFinal] = useState(null);
  const [err, setErr] = useState({ one: "", two: "", three: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponse((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      // Validate single field using Zod schema
      surveySchema.parse({ ...response, [name]: value });
      setErr((prev) => ({
        ...prev,
        [name]: "",
      }));
    } catch (error) {
      setErr((prev) => ({
        ...prev,
        [name]: error.errors.find((err) => err.path[0] === name)?.message || "",
      }));
    }
  };

  const handleSubmit = () => {
    try {
      surveySchema.parse(response);
      setFinal(response);
    } catch (error) {
      const newErr = { one: "", two: "", three: "" };
      error.errors.forEach((err) => {
        newErr[err.path[0]] = err.message;
      });
      setErr(newErr);
      alert("Validation failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Survey Form</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="one" className="block text-sm font-medium text-gray-700">
              1. How much experience do you have?
            </label>
            <input
              type="text"
              name="one"
              id="one"
              className="mt-1 block w-full rounded-md px-3 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={handleChange}
              placeholder="Enter your answer..."
            />
            {err.one && <small className="text-red-600">{err.one}</small>}
          </div>

          <div className="mb-4">
            <label htmlFor="two" className="block text-sm font-medium text-gray-700">
              2.What kind of technologies do you use?
            </label>
            <input
              type="text"
              name="two"
              id="two"
              className="mt-1 block w-full rounded-md px-3 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={handleChange}
              placeholder="Enter your answer..."
            />
            {err.two && <small className="text-red-600">{err.two}</small>}
          </div>

          <div className="mb-4">
            <label htmlFor="three" className="block text-sm font-medium text-gray-700">
              3.How long will it take to complete my project?
            </label>
            <input
              type="text"
              name="three"
              id="three"
              className="mt-1 block w-full rounded-md px-3 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={handleChange}
              placeholder="Enter your answer..."
            />
            {err.three && <small className="text-red-600">{err.three}</small>}
          </div>

          <button
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>

        {final && (
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-medium text-gray-900">Survey Responses:</h3>
            <p>Question 1 : {final.one}</p>
            <p>Question 2 : {final.two}</p>
            <p>Question 3 : {final.three}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
