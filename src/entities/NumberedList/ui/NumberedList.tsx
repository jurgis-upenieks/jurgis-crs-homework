import React from "react";
import {ListItem} from "@/shared";
import {ListContainerSC, ListItemSC} from "./styles";


type Props = {
  items: ListItem[];
  prefix?: string;
  level?: number;
}

export const NumberedList = ({ items, prefix = "", level = 0 }: Props) => {
  return (
    <ListContainerSC>
      {items.map((item, index) => {
        const currentPrefix = prefix ? `${prefix}${index + 1}.` : `${index + 1}.`;
        return (
          <ListItemSC key={currentPrefix} indent={level * 20} >
            <div id='text-item'><strong>{currentPrefix}</strong><span>{item.text}</span></div>
            {item.children.length > 0 && (
              <NumberedList
                items={item.children}
                prefix={currentPrefix}
                level={level + 1}
              />
            )}
          </ListItemSC>
        );
      })}
    </ListContainerSC>
  );
};