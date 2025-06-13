"use client";
import WheelSection from "@/components/Wheel";
import Nav from "@/components/_Nav";
import { useParams } from "next/navigation";

export default function TableWheelPage() {
  const { tableId } = useParams();
  return (
    <section className="relative flex flex-col justify-start items-center px-15 w-full h-full text-black">
      <Nav navigate={`/${tableId}`} />
      <h3 className="mt-custom-28 text-primary text-center">
        Wheel of Fortune
      </h3>
      <WheelSection />
    </section>
  );
}
