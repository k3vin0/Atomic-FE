import { FC } from "react";
import NavItems, { NavigationItem } from "./components/NavItems/NavItems";

/**
 * Props for the Sidebar component.
 * @typedef {Object} SidebarProps
 * @property {NavigationItem[]} navigationItem - An array of navigation items to be displayed in the sidebar.
 * @property {(link: string) => void} onClick - A callback function to be called when a navigation item is clicked.
 */

export type SidebarProps = {
  navigationItem: NavigationItem[];
  onClick: (link: string) => void;
};

/**
 * Represents a sidebar component that renders a list of navigation items.
 * Each `NavItems` component is passed a `key` prop for React's reconciliation process, and an `onClick` handler.
 *
 * @param {SidebarProps} props - The props for the sidebar component.
 * @returns A Sidebar component populated with navigation items.
 */
export const Sidebar: FC<SidebarProps> = ({ navigationItem, onClick }) => {
  return (
    <div className="flex flex-col w-60 h-full">
      {navigationItem.map((navItem, index) => (
        <NavItems
          key={`${index.toString()}-${navItem.label}`}
          navigationItem={navItem}
          onClick={onClick ? () => onClick(navItem.link || "") : undefined}
        />
      ))}
    </div>
  );
};

export default Sidebar;
