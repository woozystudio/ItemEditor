import { EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

export function setLoreMenu(player: Player) {
  const setLoreUI = new ModalFormData()
    .title({ translate: "ui.itemeditor.setlore.title" })
    .textField(
      { translate: "ui.itemeditor.setlore.addlinetextfield.label" },
      { translate: "ui.itemeditor.setlore.textfield.placeholder" }
    )
    .textField(
      { translate: "ui.itemeditor.setlore.removelinetextfield.label" },
      { translate: "ui.itemeditor.setlore.textfield.placeholder" }
    )
    .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

  setLoreUI.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

    const textFieldResponse = e.formValues as (string | number | boolean)[];
    let responseAddLine = textFieldResponse[0] as string;
    const responseRemoveLine = textFieldResponse[1] as string;

    const oldLores = selectedItem.getLore();
    let results = [...oldLores, responseAddLine];

    if (responseAddLine === "") results = [...oldLores];

    console.warn(responseRemoveLine);
    if (responseRemoveLine === null) return selectedItem.setLore(results);

    const index = results.indexOf(responseRemoveLine);

    if (index !== -1) {
      results.splice(index, 1);
    }

    // const lore = results.filter((item) => item !== responseRemoveLine);

    selectedItem.setLore(results);
    console.warn(results);

    inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
  });
}
