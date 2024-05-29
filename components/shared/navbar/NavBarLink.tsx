import { ReactElement } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export default function NavBarLink({
  icon,
  link,
  text,
  highlight = false,
  classOverwrite = ''
}: {
  icon: FontAwesomeIconProps['icon'],
  link: string,
  text: string,
  highlight?: boolean,
  classOverwrite?: string
}): ReactElement {
  const textClass = highlight ? 'text-indigo-600 hover:text-indigo-900' : 'text-gray-500 hover:text-gray-900';
  const classes = classOverwrite ? classOverwrite : `${textClass} flex items-center px-2 py-2 font-light`;

  return (
    <Link href={link}>
      <a className={classes}>
        <FontAwesomeIcon icon={icon} className='mr-2 h-4 w-4' />
        {text}
      </a>
    </Link>
  );
}
