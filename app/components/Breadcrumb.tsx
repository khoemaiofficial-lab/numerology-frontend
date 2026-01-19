import { BreadcrumbInterface } from "@/lib/interface";
import Link from "next/link";

export default function Breadcrumb({items}: {items: BreadcrumbInterface[]}) {
    return ( 
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-900 transition-colors"
                rel="preload"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}

            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    )
}