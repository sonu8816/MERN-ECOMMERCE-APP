import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-4"
    >
      <div>
        <p className="mb-2 font-semibold">Upload Images</p>
        <div className="flex flex-wrap gap-2">
          {[image1, image2, image3, image4].map((img, i) => (
            <label htmlFor={`image${i + 1}`} key={i}>
              <img
                className="w-20 h-20 object-cover border rounded"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                type="file"
                id={`image${i + 1}`}
                hidden
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][i](
                    e.target.files[0]
                  )
                }
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-semibold">Product Name</p>
        <input
          className="w-full max-w-md px-3 py-2 border rounded"
          type="text"
          placeholder="Enter product name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2 font-semibold">Product Description</p>
        <textarea
          className="w-full max-w-md px-3 py-2 border rounded"
          placeholder="Enter product description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div>
          <p className="mb-2 font-semibold">Category</p>
          <select
            className="px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-semibold">Sub-Category</p>
          <select
            className="px-3 py-2 border rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-semibold">Price (₹)</p>
          <input
            className="px-3 py-2 border rounded w-28"
            type="number"
            placeholder="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-semibold">Select Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`px-4 py-1 border rounded cursor-pointer ${
                  sizes.includes(size)
                    ? "bg-pink-300 text-white"
                    : "bg-slate-200"
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer font-medium">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-3 mt-4 bg-black text-white rounded hover:bg-gray-800"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
