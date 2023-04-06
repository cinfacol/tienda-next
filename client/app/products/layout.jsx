import Filters from "@/components/products/Filters";

export default function FiltersLayout({ children }) {
  return <section className="flex mt-4 px-4">
      <Filters />
      {children}
    </section>
};


