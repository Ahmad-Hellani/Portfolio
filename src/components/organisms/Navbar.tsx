const links = ["about", "projects", "courses", "contact"];
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-10 mx-auto w-fit rounded-full border border-slate-800 bg-slate-900/80 px-12 py-4 backdrop-blur">
      <ul className="flex gap-10 text-base font-medium capitalize">
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
