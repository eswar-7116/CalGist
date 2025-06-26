import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/eswar-7116"
            className="font-bold text-blue-500"
            target="_blank"
          >
            Eswar Dudi
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
