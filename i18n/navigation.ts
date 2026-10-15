import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Link/useRouter/usePathname que já respeitam o idioma atual
// (ex.: <Link href="/work"> vira /en/work quando o site está em inglês).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
