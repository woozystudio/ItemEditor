import { EntityInventoryComponent, ItemLockMode, ItemStack, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";

export const mainItemEditorUI = new ActionFormData()
  .title("Item Editor")
  .body({
    rawtext: [
      {
        text: "Make sure you have an object selected in your hotbar to be able to interact with it. All explanations of each function are in the manual, run §e/function manual§r to get the manual.",
      },
    ],
  })
  .button({ rawtext: [{ text: "\n\n\n\nRename" }] }, "textures/items/blaze_rod")
  .button({ rawtext: [{ text: "\n\n\n\nSet Lore" }] }, "textures/items/map_trial_chambers")
  .button({ rawtext: [{ text: "\n\n\n\nAttributes" }] }, "textures/items/prize_pottery_sherd");
/* .button({ rawtext: [{ text: "\n\n\n\nDelete" }] }, "textures/items/shears")
  .button({ rawtext: [{ text: "\n\n\n\nEnchant" }] }, "textures/items/spire_armor_trim_smithing_template")
  .button({ rawtext: [{ text: "\n\n\n\nSave Item" }] }, "textures/items/ender_eye")
  .button({ rawtext: [{ text: "\n\n\n\nAmount" }] }, "textures/items/bundle_lime")
  .button({ rawtext: [{ text: "\n\n\n\nRepair" }] }, "textures/items/redstone_dust"); */

export function showItemEditorUI(player: Player) {
  mainItemEditorUI.show(player).then((e) => {
    if (e.selection === 0) return renameItemMenu(player);
    if (e.selection === 1) return setLoreMenu(player);
    if (e.selection === 2) return editAttributesMenu(player);
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

    selectedItem.nameTag = response as string;

    inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
  });
}

export function setLoreMenu(player: Player) {
  const setLoreUI = new ModalFormData()
    .title("Set Lore")
    .textField("Add line", "Super rare item!")
    .textField("Remove line", "Super rare item!")
    .submitButton("Apply changes");

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

export function editAttributesMenu(player: Player) {
  const attributesMenu = new ActionFormData()
    .title("Attributes")
    .body("Select the attributes")
    .button({ rawtext: [{ text: "\n\n\n\nCan\nPlace On" }] }, "textures/items/flow_pottery_sherd")
    .button({ rawtext: [{ text: "\n\n\n\nCan Destroy" }] }, "textures/items/miner_pottery_sherd")
    .button({ rawtext: [{ text: "\n\n\n\nLock in Inventory" }] }, "textures/items/prize_pottery_sherd")
    .button({ rawtext: [{ text: "\n\n\n\nKeep on Death" }] }, "textures/items/heartbreak_pottery_sherd");

  attributesMenu.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

    /* Can Place On */
    if (e.selection === 0) {
      const canPlaceOnMenu = new ModalFormData()
        .title("Can Place On")
        .textField("Enter the ID of the block where it can be placed.", "grass_block")
        .textField("Enter the ID of the block you want to remove.", "grass_block")
        .submitButton("Apply changes");

      canPlaceOnMenu.show(player).then((e) => {
        if (e.canceled) return;

        const textFieldResponse = e.formValues as (string | number | boolean)[];
        let responseAddBlock = textFieldResponse[0] as string;
        const responseRemoveBlock = textFieldResponse[1] as string;

        const oldBlocks = selectedItem.getCanPlaceOn();
        let results = [...oldBlocks, responseAddBlock];

        if (responseAddBlock === "") results = [...oldBlocks];

        console.warn(responseRemoveBlock);
        if (responseRemoveBlock === null) return selectedItem.setCanPlaceOn(results);

        const index = results.indexOf(responseRemoveBlock);

        if (index !== -1) {
          results.splice(index, 1);
        }

        selectedItem.setCanPlaceOn(results);
        console.warn(results);

        inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
      });
    }

    /* Can Destroy */
    if (e.selection === 1) {
      const canDestroyMenu = new ModalFormData()
        .title("Can Destroy")
        .textField("Enter the block ID that can be broken.", "grass_block")
        .textField("Enter the ID of the block you want to remove.", "grass_block")
        .submitButton("Apply changes");

      canDestroyMenu.show(player).then((e) => {
        if (e.canceled) return;

        const textFieldResponse = e.formValues as (string | number | boolean)[];
        let responseAddBlock = textFieldResponse[0] as string;
        const responseRemoveBlock = textFieldResponse[1] as string;

        const oldBlocks = selectedItem.getCanDestroy();
        let results = [...oldBlocks, responseAddBlock];

        if (responseAddBlock === "") results = [...oldBlocks];

        if (responseRemoveBlock === null) return selectedItem.setCanDestroy(results);

        const index = results.indexOf(responseRemoveBlock);

        if (index !== -1) {
          results.splice(index, 1);
        }

        selectedItem.setCanDestroy(results);

        inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
      });
    }

    /* Lock in Inventory */
    if (e.selection === 2) {
      const lockModeMenu = new ModalFormData()
        .title("Lock Mode")
        .dropdown("Select the type of lock for the item.", ["Remove Lock", "Inventory Lock", "Slot Lock"])
        .submitButton("Apply changes");

      lockModeMenu.show(player).then((e) => {
        if (e.canceled) return;

        const dropdownResponse = e.formValues as (string | number | boolean)[];
        let dropdown = dropdownResponse[0] as number;

        switch (dropdown) {
          case 0:
            selectedItem.lockMode = ItemLockMode.none;
            break;

          case 1:
            selectedItem.lockMode = ItemLockMode.inventory;
            break;

          case 2:
            selectedItem.lockMode = ItemLockMode.slot;
            break;
        }

        inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
      });
    }

    /* Keep On Death */
    if (e.selection === 3) {
      switch (selectedItem.keepOnDeath) {
        case true:
          selectedItem.keepOnDeath = false;
          inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
          player.runCommand(
            `tellraw @s {"rawtext":[{"text":"§cThe Keep On Death attribute was correctly disabled for this item."}]}`
          );
          break;

        case false:
          selectedItem.keepOnDeath = true;
          inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
          player.runCommand(
            `tellraw @s {"rawtext":[{"text":"§aThe Keep On Death attribute was correctly enabled for this item."}]}`
          );
          break;
      }
    }
  });
}
