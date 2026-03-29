import { Separator } from "@base-ui/react";

import NavigationItem from "./NavigationItem";

export default function NavigationBar({ navigationItems, socials }) {
  return (
    <div className="flex flex-col gap-1 px-2">
      {navigationItems.map((item, key) => {
        if (item.type === "link") {
          return <NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} />;
        } else if (item.type === "external") {
          return (
            <NavigationItem
              url={item.url}
              icon={item.icon}
              primary={item.primary}
              title={item.title}
              key={key}
              external
            />
          );
        } else if (item.type === "divider") {
          return <Separator orientation="horizontal" className="mx-2 h-px bg-zinc-300" key={key} />;
        }
      })}

      {socials.map((item, key) => (
        <NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} external />
      ))}
    </div>
  );
}
