import { DashboardIcons } from 'public/icons';
import type { IconType } from 'react-icons/lib';

interface SideMenuItemProps {
  label: string;
  href: string;
  icon_filled: IconType;
  icon_outline: IconType;
}

export const SideMenuItems: SideMenuItemProps[] = [
  {
    label: 'Overview',
    href: '',
    icon_filled: DashboardIcons.DashboardFilledIcon,
    icon_outline: DashboardIcons.DashboardOutlineIcon,
  },
  {
    label: 'Projects',
    href: 'projects',
    icon_filled: DashboardIcons.TeamFilled,
    icon_outline: DashboardIcons.TeamOutline,
  },
  {
    label: 'Account',
    href: 'account',
    icon_filled: DashboardIcons.AccountFilledIcon,
    icon_outline: DashboardIcons.AccountOutlineIcon,
  },
  {
    label: 'Team Settings',
    href: 'settings',
    icon_filled: DashboardIcons.SettingsFilledIcon,
    icon_outline: DashboardIcons.SettingsOutlineIcon,
  },
];
