import {HeaderSC, NavLinkSC, NavSC, TitleSC} from "./styles";
import {useRouter} from "next/router";

const pages: {title: string, href: string}[] = [
  {title: 'Addresses', href: '/addresses'},
  {title: 'Technical Description', href: '/technical-description'},
];

export const Header = () => {
  const router = useRouter();

  return (
    <HeaderSC>
      <TitleSC>Jurgis CRS Homework</TitleSC>
      <NavSC>
        {pages.map(({title, href}) =>
          <NavLinkSC key={title} href={href} className={router.pathname === href ? 'active' : undefined}>{title}</NavLinkSC>
        )}
      </NavSC>
    </HeaderSC>
  );
};