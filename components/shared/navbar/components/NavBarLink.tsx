import { ReactElement } from 'react';
import Link from 'next/link';

export default function NavBarLink({
  link,
  text,
  highlight = false,
  classOverwrite = ''
}: {
  link: string,
  text: string,
  highlight?: boolean,
  classOverwrite?: string
}): ReactElement {
  const textClass = highlight ? 'text-indigo-600 hover:text-indigo-900' : 'text-gray-500 hover:text-gray-900';
  const classes = classOverwrite ? classOverwrite : `text-base font-medium px-3 ${textClass}`;

  return (
    <Link href={link}>
      <a className={classes}>
        {text}
      </a>
    </Link>
  );
}
