import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/product
export default async function ProductPage() {
  await connection(); // signals this is a dynamic route
  const products = await prisma.product.findMany({
    include: {
      product_images: true,
    },
  });
  
  const availableImages = [
    "airpods-pro.png",
    "galaxy-s24.png",
    "ipad-air.png",
    "macbook-air.png",
  ];

  const getMatchedImage = (name: string | null, dbImage: string | null) => {
    const searchStr = `${name || ""} ${dbImage || ""}`.toLowerCase();
    if (searchStr.includes("airpod")) return "airpods-pro.png";
    if (searchStr.includes("galaxy") || searchStr.includes("s24")) return "galaxy-s24.png";
    if (searchStr.includes("ipad")) return "ipad-air.png";
    if (searchStr.includes("macbook")) return "macbook-air.png";
    return "placeholder.jpg"; // Default to placeholder image
  };

  const serializedProducts = products.map((p) => ({
    ...p,
    price: Number(p.price),
    picture: getMatchedImage(p.name, p.product_images[0]?.image_name),
  }))

  return (
    <main>
      {/* { products.length> 0 && JSON.stringify(products) } */}
      {
        products.length > 0 && <FeaturesProduct products={serializedProducts} />
      }
    </main>
  );
}