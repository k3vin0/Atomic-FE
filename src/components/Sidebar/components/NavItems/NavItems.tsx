import { FC, ReactNode, useState } from "react";

/**
 * Type definition for the children of a navigation item.
 */
export type NavigationItemChildren = {
  label: string;
  link?: string;
  icon?: ReactNode;
};

/**
 * Type definition for a navigation item which can optionally have children.
 */
export type NavigationItem = {
  label: string;
  link?: string;
  icon?: ReactNode;
  children?: NavigationItemChildren[];
};

/**
 * Props for the NavItems component.
 */
export type NavItemsProps = {
  navigationItem: NavigationItem;
  onClick?: (link: string) => void;
};

/**
 * Represents a single navigation item which can be clicked. If children are present, they can be toggled to show or hide.
 * @param {NavItemsProps} props - The props for the navigation item.
 */
export const NavItems: FC<NavItemsProps> = ({ navigationItem, onClick }) => {
  const { label, link, children, icon } = navigationItem;
  const [showChildren, setShowChildren] = useState<boolean>(false);

  return (
    <>
      <div
        className="w-full rounded-xl h-15 hover:bg-orange-600 p-4"
        onClick={() => {
          if (link && onClick) {
            onClick(link);
          }
          if (children) {
            setShowChildren(!showChildren);
          }
        }}
      >
        <div className="flex flex-row items-center content-center ">
          <div className="flex flex-row items-center content-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
        </div>
      </div>
      {showChildren && (
        <div>
          {children?.map((child, index) => (
            <div
              key={`${index.toString()}-${child.label}`}
              className="w-full h-15 hover:bg-teal-300 p-4 flex flex-row items-center content-center gap-2"
            >
              <div>{child.icon}</div>
              <div>{child.label}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
