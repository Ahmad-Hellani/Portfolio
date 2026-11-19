const links = ["about", "projects", "courses", "contact"];
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-10 mx-auto w-fit max-w-full rounded-full border border-slate-800 bg-slate-900/80 px-6 py-3 backdrop-blur md:px-12 md:py-4">
      <ul className="flex gap-5 text-sm font-medium capitalize md:gap-10 md:text-base">
        {" "}
        {links.map((l) => (
          <li key={l}>
            <Link to={`/#${l}`} className="text-slate-300 hover:text-white">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
