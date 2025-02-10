import {ReactNode} from "react";

export type ColumnDetails = {
  label: string;
  key: string;
  dataCellType: 'text-output' | 'text-input' | 'action-buttons';
  sortable: boolean;
  individuallySearchable: boolean;
  dataCellAttributes?: object;
  dataCellInnerAttributes?: object;
  actionButtons?: {tooltipText: string, actionButtonIconComponent: ReactNode}[];
};

export type BaseRow = {
  uniqueKey: string;
}