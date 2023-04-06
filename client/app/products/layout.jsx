import Filters from "@/components/products/Filters";

export default function FiltersLayout({ children }) {
  return <div className="flex mt-4 px-4">
      <Filters />
      {children}
    </div>
};


