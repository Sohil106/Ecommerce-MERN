import { SubmitHandler, useForm } from "react-hook-form";
import {
  creatProductAsync,
  fetchProductByIdAsync,
  resetProduct,
  updateProductAsync,
  useSelectorProductState,
} from "../../product/productSlice";
import { Product, ProductWithoutId } from "../../../models/Product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminProductForm = () => {
  const { brands, categories } = useSelectorProductState();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const { product } = useSelectorProductState();
  const [loading, setLoading] = useState<boolean>(true);

  interface IFormInputs {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    thumbnail: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    brand: string;
    category: string;
  }
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      brand: "",
      category: "",
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        await dispatch(fetchProductByIdAsync(id));
        setLoading(false);
      } else {
        dispatch(resetProduct());
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  useEffect(() => {
    if (product && id) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("discountPercentage", product.discountPercentage);
      setValue("stock", product.stock);
      setValue("thumbnail", product.thumbnail);
      setValue("image1", product.images[0]);
      setValue("image2", product.images[1]);
      setValue("image3", product.images[2]);
      setValue("image4", product.images[3]);
      setValue("brand", product.brand);
      setValue("category", product.category);
    }
  }, [product, id, setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const productWithoutId: ProductWithoutId = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: 0,
      stock: data.stock,
      tags: [],
      brand: data.brand,
      sku: "",
      weight: 0,
      dimensions: { width: 0, height: 0, depth: 0 },
      warrantyInformation: "",
      shippingInformation: "",
      availabilityStatus: "",
      reviews: [],
      returnPolicy: "",
      minimumOrderQuantity: 1,
      meta: { createdAt: "", updatedAt: "", barcode: "", qrCode: "" },
      images: [data.image1, data.image2, data.image3, data.image4],
      thumbnail: data.thumbnail,
    };

    if (id) {
      const productWithId: Product = {
        ...productWithoutId,
        id: id,
        rating: product.rating,
      };
      await dispatch(updateProductAsync(productWithId));
    } else {
      await dispatch(creatProductAsync(productWithoutId));
      //TODO: on product successfully added clear fields and show a message
      reset();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {id ? "Update" : "Add"} Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="title"
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("title", {
                      required: "title is required",
                    })}
                  />
                </div>
                {errors["title"] && (
                  <p className="text-red-500">{errors["title"]?.message}</p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("description", {
                    required: "description is required",
                  })}
                />
              </div>
              {errors["description"] && (
                <p className="text-red-500">{errors["description"]?.message}</p>
              )}
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about product.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="price"
                    type="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("price", {
                      required: "price is required",
                      min: { value: 1, message: "price must minimum  1" },
                      max: {
                        value: 9999,
                        message: "price must not exceed 1000",
                      },
                    })}
                  />
                </div>
                {errors["price"] && (
                  <p className="text-red-500">{errors["price"]?.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="discountPercentage"
                    type="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("discountPercentage", {
                      required: "discount is required",
                      min: { value: 0, message: "discount must minimum  0" },
                      max: {
                        value: 100,
                        message: "discount must not exceed 100",
                      },
                    })}
                  />
                </div>
                {errors["discountPercentage"] && (
                  <p className="text-red-500">
                    {errors["discountPercentage"]?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="stock"
                    type="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("stock", {
                      required: "stock is required",
                      min: { value: 0, message: "stock must minimum  0" },
                    })}
                  />
                </div>
                {errors["stock"] && (
                  <p className="text-red-500">{errors["stock"]?.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="thumbnail"
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                  />
                </div>
                {errors["thumbnail"] && (
                  <p className="text-red-500">{errors["thumbnail"]?.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="image1"
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                  />
                </div>
                {errors["image1"] && (
                  <p className="text-red-500">{errors["image1"]?.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="image2"
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("image2")}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="image3"
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("image3")}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="image4"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 4
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    id="image4"
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("image4")}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full"
                  {...register("brand", {
                    required: "brand is required",
                  })}
                >
                  <option value="" disabled>
                    ---choose brand---
                  </option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
                {errors["brand"] && (
                  <p className="text-red-500">{errors["brand"]?.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full"
                  {...register("category", {
                    required: "category is required",
                  })}
                >
                  <option value="" disabled>
                    ---choose category---
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors["category"] && (
                  <p className="text-red-500">{errors["category"]?.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Extra
          </h2>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => reset()}
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
