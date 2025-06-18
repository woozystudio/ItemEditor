import { EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

export const mainItemEditorUI = new ActionFormData()
  .title("Item Editor")
  .body({
    rawtext: [
      {
        text: "Make sure you have an object selected in your hotbar to be able to interact with it. All explanations of each function are in the manual, run §e/function manual§r to get the manual.",
      },
    ],
  })
  .button({ rawtext: [{ text: "\n\n\n\nRename" }] }, "textures/items/blaze_rod");
/* .button({ rawtext: [{ text: "\n\n\n\nDelete" }] }, "textures/items/shears")
  .button({ rawtext: [{ text: "\n\n\n\nSet Lore" }] }, "textures/items/map_trial_chambers")
  .button({ rawtext: [{ text: "\n\n\n\nEnchant" }] }, "textures/items/spire_armor_trim_smithing_template")
  .button({ rawtext: [{ text: "\n\n\n\nAttributes" }] }, "textures/items/prize_pottery_sherd")
  .button({ rawtext: [{ text: "\n\n\n\nSave Item" }] }, "textures/items/ender_eye")
  .button({ rawtext: [{ text: "\n\n\n\nAmount" }] }, "textures/items/bundle_lime")
  .button({ rawtext: [{ text: "\n\n\n\nRepair" }] }, "textures/items/redstone_dust"); */

export function showItemEditorUI(player: Player) {
  mainItemEditorUI.show(player).then((e) => {
    if (e.selection === 0) return renameItemMenu(player);
  });
}

export function renameItemMenu(player: Player) {
  const renameUI = new ModalFormData()
    .title("Rename Item")
    .textField({ text: "Enter the new item name:" }, { text: "Super Apple" })
    .submitButton({ text: "Rename!" });

  renameUI.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

    const textFieldResponse = e.formValues as (string | number | boolean)[];
    const response = textFieldResponse[0];

    const itemStack = new ItemStack(selectedItem?.typeId as string);
    itemStack.nameTag = response as string;

    inventory?.container?.getSlot(player.selectedSlotIndex).setItem(itemStack);
  });
}
