import { EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

export function quantityMenu(player: Player) {
  const quantityUI = new ModalFormData()
    .title({ translate: "ui.itemeditor.quantity.title" })
    .textField(
      { translate: "ui.itemeditor.quantity.textfield.label" },
      { translate: "ui.itemeditor.quantity.textfield.placeholder" }
    )
    .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

  quantityUI.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

    const textFieldResponse = e.formValues as (string | number | boolean)[];
    const response = textFieldResponse[0] as number;
    const quantity = Number(response);

    if (quantity === 0 || quantity > 256) {
      quantityUI.show(player);
    }

    selectedItem.amount = quantity;

    inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
  });
}
