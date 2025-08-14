import Image from "next/image";
import Button from "@/components/Button";

export default function RequestToLogIn() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/bean.png"
        alt="Bean Counter"
        width={200}
        height={200}
      />

      <p className="mb-12 max-w-2xl text-xl md:text-2xl">
        Split expenses with friends made simple and fun! Track who owes what,
        settle up easily, and never lose track of shared costs again.
      </p>

      {/* CTA Section */}
      <div className="space-y-6">
        <Button type="primary">✨ Get yourself a Bean Counter</Button>
      </div>
    </div>
  );
}
