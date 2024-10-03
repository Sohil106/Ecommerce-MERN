import Skeleton from "react-loading-skeleton";
import { InlineWrapperWithMargin } from "./ProductListSKE";

const ProductDetailSKE = () => {
  return (
    <div className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li className="text-sm">
            <span
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              <Skeleton width={200} />
            </span>
          </li>
        </ol>
      </nav>

      {/* Image gallery */}
      <div className="mx-auto mt-6 px-4 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <Skeleton className="h-full w-full object-cover object-center" />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full object-cover object-center" />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full object-cover object-center" />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <Skeleton className="h-full w-full object-cover object-center" />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            <Skeleton />
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <div className="flex items-center text-3xl gap-2">
            <p className="tracking-tight text-gray-900">
              <Skeleton width={60} />
            </p>
            <p className=" line-through text-gray-400">
              <Skeleton width={60} />
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                <Skeleton
                  width={20}
                  count={5}
                  inline
                  wrapper={InlineWrapperWithMargin}
                />
              </div>
            </div>
          </div>

          <form className="mt-10">
            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>

              <fieldset aria-label="Choose a color" className="mt-4 flex gap-4">
                {Array.from({ length: 3 }).map((el, index) => (
                  <div className="avatar" key={index}>
                    <Skeleton
                      circle
                      height={40}
                      width={40}
                      containerClassName="avatar-skeleton"
                    />
                  </div>
                ))}
              </fieldset>
            </div>

            {/* Sizes */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>

              <fieldset aria-label="Choose a size" className="mt-4">
                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((el, index) => (
                    <Skeleton
                      key={index}
                      height={90}
                      width={90}
                      containerClassName="avatar-skeleton"
                    />
                  ))}
                </div>
              </fieldset>
            </div>

            <Skeleton className="mt-10 px-8 py-3"></Skeleton>
          </form>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <Skeleton count={2} />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <Skeleton count={4} />
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Details</h2>

            <div className="mt-4 space-y-6">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSKE;
