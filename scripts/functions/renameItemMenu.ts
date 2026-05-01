import { EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

export function renameItemMenu(player: Player) {
  const renameUI = new ModalFormData()
    .title({ translate: "ui.itemeditor.rename.title" })
    .textField(
      { translate: "ui.itemeditor.rename.textfield.label" },
      { translate: "ui.itemeditor.rename.textfield.placeholder" }
    )
    .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

  renameUI.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

    const textFieldResponse = e.formValues as (string | number | boolean)[];
    const response = textFieldResponse[0];

    selectedItem.nameTag = response as string;

    inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
  });
}
