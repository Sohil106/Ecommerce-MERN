import { PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";

const ProductListSKE = () => {
  return (
    <div className="group relative  p-2 border-gray-200 border-2">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
        <Skeleton className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            <Skeleton wrapper={InlineWrapperWithMargin} inline width={90} />
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Skeleton wrapper={InlineWrapperWithMargin} inline width={100} />
            </span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            <Skeleton wrapper={InlineWrapperWithMargin} inline width={30} />
          </p>
          <p className="text-sm font-medium line-through text-gray-400">
            <Skeleton wrapper={InlineWrapperWithMargin} inline width={30} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductListSKE;

export function InlineWrapperWithMargin({
  children,
}: PropsWithChildren<unknown>) {
  return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
}
