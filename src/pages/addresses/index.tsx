import {Table, useModal} from "@/widgets";
import styled from "styled-components";
import {rem, theme, useNavigationGuard} from "@/shared";
import {
  Address,
  addressesTableColumnDetails, Button,
  useAddAddress,
  useAddresses,
  useRemoveAddress,
  useSaveAddress
} from "@/features";
import {useEffect, useMemo, useState} from "react";
import {AddIcon} from "@/shared/assets/svg";
import {Tooltip} from "@/entities";

const SaveButtonSC = styled(Button)`
  align-self: flex-end;
  margin-right: ${rem(27)};
`

const TableSectionSC = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${rem(12)};
`

const TooltipSC = styled(Tooltip)`
  margin-top: ${rem(56)};
`

export const AddressesPage = () => {
  const { addresses, enablePeriodicRefetch, disablePeriodicRefetch, singleRefetch } = useAddresses();
  const [addressesDraft, setAddressesDraft] = useState<Address[]>(addresses || []);

  const saveAddress = useSaveAddress();
  const removeAddress = useRemoveAddress();
  const addAddress = useAddAddress();

  useEffect(() => {
    setAddressesDraft(addresses || []);
  }, [addresses]);

  const { openModal } = useModal();

  const handleInputCellChange = (row: object, columnKey: string, value: string | number) =>
    setAddressesDraft((current) =>
      current.map((it) =>
        it === row ? { ...it, [columnKey]: value } : it,
      ),
    );

  const handleActionButtonClick = async (row: object, buttonText: string) => {
    const address = row as Address;
    if (buttonText === 'Delete') {
      openModal({
        title: 'Delete address',
        detailsText:
          `Are you sure you want to delete address: "${address.address}"?`,
        buttons: [
          { text: 'Cancel', variant: 'secondary' },
          { text: 'Yes', variant: 'primary' },
        ],
        onButtonClick: async userResponse => {
          if (userResponse !== 'Yes') {
            return;
          }
          await removeAddress(address.id);
          singleRefetch();
        },
      });
    }
  };

  const isSaveEnabled = useMemo(() => {
    return JSON.stringify(addressesDraft) !== JSON.stringify(addresses);
  }, [addressesDraft, addresses]);

  useEffect(() => {
    if (isSaveEnabled) {
      disablePeriodicRefetch();
    } else {
      enablePeriodicRefetch();
    }
  }, [isSaveEnabled, disablePeriodicRefetch, enablePeriodicRefetch]);

  const handleSaveClick = async () => {
    const filteredAddresses = addressesDraft.filter(it =>
      JSON.stringify(addresses?.find(it2 => it2.id === it.id)) !== JSON.stringify(it)
    );
    for (const it of filteredAddresses) {
      if (it.id === Infinity) {
        await addAddress(it);
      } else {
        await saveAddress(it);
      }
    }
    enablePeriodicRefetch();
  };

  useNavigationGuard({ isSaveEnabled });

  const handleAddClick = () => {
    setAddressesDraft([...addressesDraft, { id: Infinity, address: '', zip: '', country: '', uniqueKey: String(Math.random()) } as Address]);
  }

  return <>
    <SaveButtonSC id='QA_save_changes' disabled={!isSaveEnabled} onClick={handleSaveClick}>
      Save Changes
    </SaveButtonSC>
    <TableSectionSC>
      <Table
        columnDetails={addressesTableColumnDetails}
        data={addressesDraft}
        initialOrderColumn='id'
        initialOrder='desc'
        onInputChange={handleInputCellChange}
        onActionButtonClick={handleActionButtonClick}
      />
      <TooltipSC label='Add Address'>
        <AddIcon id='QA_add_address_button' size={rem(15)} color={theme.colors.accentPrimary} onClick={handleAddClick}/>
      </TooltipSC>
    </TableSectionSC>
  </>;
}


export default AddressesPage;