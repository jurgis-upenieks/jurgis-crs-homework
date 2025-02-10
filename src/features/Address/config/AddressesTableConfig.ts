import {rem} from "@/shared";
import {DeleteIcon} from "@/shared/assets/svg";
import {ColumnDetails} from "@/widgets";

export const addressesTableColumnDetails = [
  {
    label: 'Id',
    key: 'id',
    dataCellType: 'text-output',
    sortable: true,
    individuallySearchable: true,
    dataCellAttributes: { style: {minWidth: rem(90), maxWidth: rem(90), textAlign: 'right'} },
    dataCellInnerAttributes: { style: {margin: 'auto'} },
  },
  {
    label: 'Address',
    key: 'address',
    dataCellType: 'text-input',
    sortable: true,
    individuallySearchable: true,
    dataCellAttributes: { style: {minWidth: rem(300), maxWidth: rem(300)} },
  },
  {
    label: 'Country',
    key: 'country',
    dataCellType: 'text-input',
    sortable: true,
    individuallySearchable: true,
    dataCellAttributes: { style: {minWidth: rem(200), maxWidth: rem(200)} },
  },
  {
    label: 'Zipcode',
    key: 'zip',
    dataCellType: 'text-input',
    sortable: true,
    individuallySearchable: true,
    dataCellAttributes: { style: {minWidth: rem(150), maxWidth: rem(150)} },
  },
  {
    label: '',
    key: 'actions',
    dataCellType: 'action-buttons',
    sortable: false,
    individuallySearchable: false,
    dataCellAttributes: { style: {minWidth: rem(55), maxWidth: rem(55)} },
    actionButtons: [
      { actionButtonIconComponent: DeleteIcon, tooltipText: 'Delete' },
    ],
  },
] as ColumnDetails[];