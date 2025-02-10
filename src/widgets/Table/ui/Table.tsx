import {HTMLAttributes, useMemo, useState} from 'react';
import {MagnifyingGlassIcon, UpDownIcon, DownIcon, UpIcon} from '@/shared/assets/svg';
import {rem} from "@/shared";
import {SearchTextInput} from "@/features";
import {BaseRow, ColumnDetails} from "@/widgets";
import {
  ActionButtonsSC,
  DataCellSC,
  MessageSC,
  NoResultsTableBodySC,
  TableHeadCellButtonSC,
  TableHeadCellSC,
  TableHeadCellTextSC,
  TableSC,
  TableWrapperSC, UnstyledTextInputSC
} from "./styles";
import {Tooltip} from "@/entities";

type Row = {
  [key: string]: string | number;
} & BaseRow;

type Props = {
  columnDetails: ColumnDetails[];
  data?: Row[];
  initialOrderColumn?: string;
  initialOrder?: 'asc' | 'desc';
  onInputChange?: (row: object, columnKey: string, value: string | number) => void;
  onActionButtonClick?: (row: object, buttonText: string) => void;

} & HTMLAttributes<HTMLDivElement>;

export const Table = ({columnDetails, data, initialOrderColumn, initialOrder = 'asc', onInputChange: handleInputChange, onActionButtonClick: handleActionButtonClick, ...remainingProps}: Props) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({key: initialOrderColumn || columnDetails[0].key, direction: initialOrder});
  const [filteringInputs, setFilteringInputs] = useState<Record<string, string>>({});

  const filteringEnabled = columnDetails.some((it) => it.individuallySearchable);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedFilteredData = useMemo(() => {
    if (!data) return data;
    let sorted = data;

    if (sortConfig) {
      const { key, direction } = sortConfig;
      sorted = [...sorted].sort((a, b) => {
        const aValue = a[key as keyof typeof a];
        const bValue = b[key as keyof typeof b];
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    for (const col of columnDetails) {
      if (!col.individuallySearchable || !filteringInputs[col.key]?.trim()?.length) {
        continue;
      }
      sorted = [...sorted].filter((it) =>
        filteringInputs[col.key]!
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .every((searchToken) => String((it as Record<string, unknown>)[col.key])?.toLowerCase()?.includes(searchToken)),
      );
    }
    return sorted;
  }, [data, sortConfig, filteringInputs, columnDetails]);

  const handleFilteringInputChange = (key: string, value: string) => {
    setFilteringInputs((current) => {
      const output = { ...current };
      output[key] = value ?? '';
      return output;
    });
  };

  const rows = <>
    {filteringEnabled && (
      <tr>
        {columnDetails.map((colDetails) => (
          <td key={`filter_${colDetails.key}`} {...colDetails.dataCellAttributes}>
            {colDetails.individuallySearchable && (
              <SearchTextInput value={filteringInputs[ colDetails.key] ?? ''} onChange={value => handleFilteringInputChange(colDetails.key, value)} iconComponent={MagnifyingGlassIcon}/>
            )}
          </td>
        ))}
      </tr>
    )}
    {
      sortedFilteredData?.length ? sortedFilteredData.map((row) => (
        <tr id={`QA_data_row_${row.uniqueKey}`} key={`data_row_${row.uniqueKey}`}>
          {columnDetails.map((colDetails: ColumnDetails) => (
            <DataCellSC
              id={`QA_data_row_${row.uniqueKey}__data_cell_${colDetails.key}`}
              key={`data_row_${row.uniqueKey}__data_cell_${colDetails.key}`}
              style={{overflow: colDetails.dataCellType === 'action-buttons' ? 'visible' : 'hidden'}}
              {...colDetails.dataCellAttributes}
            >
              {colDetails.dataCellType === 'text-output' ? (
                row[colDetails.key] !== Infinity ? row[colDetails.key] : ''
              ) : colDetails.dataCellType === 'text-input' ? (
                <UnstyledTextInputSC
                  type="text"
                  value={row[colDetails.key]}
                  onChange={(event) => handleInputChange?.(row, colDetails.key, event?.target?.value)}
                  {...colDetails.dataCellInnerAttributes}
                />
              ) : colDetails.dataCellType === 'action-buttons' ?
                <ActionButtonsSC {...colDetails.dataCellInnerAttributes}>
                  {colDetails.actionButtons?.map?.(actionButtonDetails => {
                      const ActionButton = actionButtonDetails.actionButtonIconComponent;
                      return <Tooltip key={`action_button_${row.uniqueKey}_${actionButtonDetails.tooltipText}`} label={actionButtonDetails.tooltipText}>
                        {ActionButton && (
                          // @ts-expect-error ActionButton type is dynamically determined and may not be directly inferred
                          <ActionButton
                            id={`action_button_${row.uniqueKey}_${actionButtonDetails.tooltipText}`}
                            size={14}
                            style={{cursor: 'pointer'}}
                            onClick={() => handleActionButtonClick?.(row, actionButtonDetails.tooltipText)}
                          />
                        )}
                      </Tooltip>
                    }
                  )}
                </ActionButtonsSC> : null
              }
            </DataCellSC>
          ))}
        </tr>
      )) : data === undefined ? (
        <tr>
          <NoResultsTableBodySC colSpan={columnDetails.length}>
            <MessageSC showIcon={false}>Loading...</MessageSC>
          </NoResultsTableBodySC>
        </tr>
      ) : (
        <tr>
          <NoResultsTableBodySC colSpan={columnDetails.length}>
            <MessageSC>No search results</MessageSC>
          </NoResultsTableBodySC>
        </tr>
      )
    }
  </>;

  return (
    <TableWrapperSC {...remainingProps}>
      <TableSC>
        <thead>
          <tr>
            {columnDetails.map(({ label, key, sortable, dataCellAttributes }) => (
              <TableHeadCellSC key={`head_cell_${key}`} {...dataCellAttributes}>
                <TableHeadCellButtonSC onClick={() => sortable && handleSort(key)}>
                  <TableHeadCellTextSC>{label}</TableHeadCellTextSC>
                  {sortable
                    ? (sortConfig?.key === key &&
                    (sortConfig.direction === 'asc' ? (
                      <UpIcon size={rem(11)}/>
                    ) : (
                      <DownIcon size={rem(11)}/>
                    ))) || <UpDownIcon size={rem(11)}/>
                    : null}
                </TableHeadCellButtonSC>
              </TableHeadCellSC>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </TableSC>
    </TableWrapperSC>
  );
};
