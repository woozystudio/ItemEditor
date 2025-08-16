import {
  EntityInventoryComponent,
  ItemComponentTypes,
  ItemDurabilityComponent,
  ItemLockMode,
  ItemStack,
  Player,
} from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

export function showItemEditorUI(player: Player) {
  const mainItemEditorUI = new ActionFormData()
    .title({ translate: "ui.itemeditor.main_menu.title" })
    .body({ translate: "ui.itemeditor.main_menu.body" })
    .button({ translate: "ui.itemeditor.main_menu.rename" }, "textures/items/blaze_rod")
    .button({ translate: "ui.itemeditor.main_menu.setlore" }, "textures/items/map_trial_chambers")
    .button({ translate: "ui.itemeditor.main_menu.attributes" }, "textures/items/prize_pottery_sherd")
    .button({ translate: "ui.itemeditor.main_menu.quantity" }, "textures/items/bundle_lime")
    .button({ translate: "ui.itemeditor.main_menu.repair" }, "textures/items/redstone_dust");
  /* .button({ rawtext: [{ text: "\n\n\n\nDelete" }] }, "textures/items/shears")
    .button({ rawtext: [{ text: "\n\n\n\nEnchant" }] }, "textures/items/spire_armor_trim_smithing_template")
    .button({ rawtext: [{ text: "\n\n\n\nSave Item" }] }, "textures/items/ender_eye")
  */

  mainItemEditorUI.show(player).then((e) => {
    if (e.selection === 0) return renameItemMenu(player);
    if (e.selection === 1) return setLoreMenu(player);
    if (e.selection === 2) return editAttributesMenu(player);
    if (e.selection === 3) return quantityMenu(player);
    if (e.selection === 4) return repairMenu(player);
  });
}

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

export function editAttributesMenu(player: Player) {
  const attributesMenu = new ActionFormData()
    .title({ translate: "ui.itemeditor.attributes.title" })
    .body({ translate: "ui.itemeditor.attributes.body" })
    .button({ translate: "ui.itemeditor.attributes.canplaceon" }, "textures/items/flow_pottery_sherd")
    .button({ translate: "ui.itemeditor.attributes.candestroy" }, "textures/items/miner_pottery_sherd")
    .button({ translate: "ui.itemeditor.attributes.lockininventory" }, "textures/items/prize_pottery_sherd")
    .button({ translate: "ui.itemeditor.attributes.keepondeath" }, "textures/items/heartbreak_pottery_sherd");

  attributesMenu.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

    /* Can Place On */
    if (e.selection === 0) {
      const canPlaceOnMenu = new ModalFormData()
        .title({ translate: "ui.itemeditor.attributes.canplaceon.title" })
        .textField(
          { translate: "ui.itemeditor.attributes.canplaceon.addblocktextfield.label" },
          { translate: "ui.itemeditor.examples.blockid" }
        )
        .textField(
          { translate: "ui.itemeditor.attributes.canplaceon.removeblocktextfield.label" },
          { translate: "ui.itemeditor.examples.blockid" }
        )
        .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

      canPlaceOnMenu.show(player).then((e) => {
        if (e.canceled) return;

        const textFieldResponse = e.formValues as (string | number | boolean)[];
        let responseAddBlock = textFieldResponse[0] as string;
        const responseRemoveBlock = textFieldResponse[1] as string;

        const oldBlocks = selectedItem.getCanPlaceOn();
        let results = [...oldBlocks, responseAddBlock];

        if (responseAddBlock === "") results = [...oldBlocks];

        if (responseRemoveBlock === null) return selectedItem.setCanPlaceOn(results);

        const index = results.indexOf(responseRemoveBlock);

        if (index !== -1) {
          results.splice(index, 1);
        }

        selectedItem.setCanPlaceOn(results);

        inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
      });
    }

    /* Can Destroy */
    if (e.selection === 1) {
      const canDestroyMenu = new ModalFormData()
        .title({ translate: "ui.itemeditor.attributes.candestroy.title" })
        .textField(
          { translate: "ui.itemeditor.attributes.candestroy.addblocktextfield.label" },
          { translate: "ui.itemeditor.examples.blockid" }
        )
        .textField(
          { translate: "ui.itemeditor.attributes.candestroy.removeblocktextfield.label" },
          { translate: "ui.itemeditor.examples.blockid" }
        )
        .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

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
        .title({ translate: "ui.itemeditor.attributes.lockmode.title" })
        .dropdown({ translate: "ui.itemeditor.attributes.lockmode.dropdown.label" }, [
          { translate: "ui.itemeditor.attributes.lockmode.dropdown.options.none" },
          { translate: "ui.itemeditor.attributes.lockmode.dropdown.options.inventory" },
          { translate: "ui.itemeditor.attributes.lockmode.dropdown.options.slot" },
        ])
        .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

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
          player.runCommand(`tellraw @s {"rawtext":[{"translate":"ui.itemeditor.attributes.keepondeath.disabled"}]}`);
          break;

        case false:
          selectedItem.keepOnDeath = true;
          inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
          player.runCommand(`tellraw @s {"rawtext":[{"translate":"ui.itemeditor.attributes.keepondeath.enabled"}]}`);
          break;
      }
    }
  });
}

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

export function repairMenu(player: Player) {
  const inventory = player.getComponent("inventory") as EntityInventoryComponent;
  const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;

  if (!selectedItem.hasComponent(ItemComponentTypes.Durability)) {
    player.runCommand(`tellraw @s {"rawtext":[{"translate":"ui.itemeditor.repair.cant_repair"}]}`);
    return;
  }

  const itemWithComponent = selectedItem.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;

  if (itemWithComponent.damage === 0) {
    player.runCommand(`tellraw @s {"rawtext":[{"translate":"ui.itemeditor.repair.already_repaired"}]}`);
    return;
  }

  itemWithComponent.damage = Math.min(0, itemWithComponent.maxDurability);

  inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
}

/* const enchantments = [
  MinecraftEnchantmentTypes.AquaAffinity,
  MinecraftEnchantmentTypes.BaneOfArthropods,
  MinecraftEnchantmentTypes.Binding,
  MinecraftEnchantmentTypes.BlastProtection,
  MinecraftEnchantmentTypes.BowInfinity,
  MinecraftEnchantmentTypes.Breach,
  MinecraftEnchantmentTypes.Channeling,
  MinecraftEnchantmentTypes.Density,
  MinecraftEnchantmentTypes.DepthStrider,
  MinecraftEnchantmentTypes.Efficiency,
  MinecraftEnchantmentTypes.FeatherFalling,
  MinecraftEnchantmentTypes.FireAspect,
  MinecraftEnchantmentTypes.FireProtection,
  MinecraftEnchantmentTypes.Flame,
  MinecraftEnchantmentTypes.Fortune,
  MinecraftEnchantmentTypes.FrostWalker,
  MinecraftEnchantmentTypes.Impaling,
  MinecraftEnchantmentTypes.Knockback,
  MinecraftEnchantmentTypes.Looting,
  MinecraftEnchantmentTypes.Loyalty,
  MinecraftEnchantmentTypes.LuckOfTheSea,
  MinecraftEnchantmentTypes.Lure,
  MinecraftEnchantmentTypes.Mending,
  MinecraftEnchantmentTypes.Multishot,
  MinecraftEnchantmentTypes.Piercing,
  MinecraftEnchantmentTypes.Power,
  MinecraftEnchantmentTypes.ProjectileProtection,
  MinecraftEnchantmentTypes.Protection,
  MinecraftEnchantmentTypes.Punch,
  MinecraftEnchantmentTypes.QuickCharge,
  MinecraftEnchantmentTypes.Respiration,
  MinecraftEnchantmentTypes.Riptide,
  MinecraftEnchantmentTypes.Sharpness,
  MinecraftEnchantmentTypes.SilkTouch,
  MinecraftEnchantmentTypes.Smite,
  MinecraftEnchantmentTypes.SoulSpeed,
  MinecraftEnchantmentTypes.SwiftSneak,
  MinecraftEnchantmentTypes.Thorns,
  MinecraftEnchantmentTypes.Unbreaking,
  MinecraftEnchantmentTypes.Vanishing,
];

export function enchantMenu(player: Player) {
  const enchantUI = new ModalFormData()
    .title({ translate: "Enchant" })
    .dropdown("Select an enchantment to add", ["", ...enchantments])
    .dropdown("Select an enchantment to remove", ["", ...enchantments])
    .submitButton({ translate: "ui.itemeditor.global.apply_changes" });

  enchantUI.show(player).then((e) => {
    if (e.canceled) return;

    const inventory = player.getComponent("inventory") as EntityInventoryComponent;
    const selectedItem = inventory.container?.getItem(player.selectedSlotIndex) as ItemStack;
    const itemWithComponent = selectedItem.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;

    const dropdownEnchantments = e.formValues as (string | number | boolean)[];
    let dropAddEnchantment = dropdownEnchantments[0] as number;
    let dropRemoveEnchantment = dropdownEnchantments[1] as number;
    console.warn(dropAddEnchantment, dropRemoveEnchantment);

    const addEnchantmentType = new EnchantmentType(enchantments[dropAddEnchantment]);
    const removeEnchantmentType = new EnchantmentType(enchantments[dropRemoveEnchantment]);
    console.warn(addEnchantmentType, removeEnchantmentType);

    const addEnchantment = {
      level: addEnchantmentType.maxLevel,
      type: addEnchantmentType,
    } as Enchantment;

    const removeEnchantment = {
      level: addEnchantmentType.maxLevel,
      type: removeEnchantmentType,
    } as Enchantment;

    const oldEnchantments = itemWithComponent.getEnchantments();
    let results = [...oldEnchantments, addEnchantment];
    console.warn(results);

    if (dropAddEnchantment === null) results = [...oldEnchantments];

    if (dropRemoveEnchantment === null) return itemWithComponent.addEnchantments(results as Enchantment[]);
    console.warn(results);
    const index = results.indexOf(removeEnchantment);

    if (index !== -1) {
      results.splice(index, 1);
    }

    itemWithComponent.addEnchantments(results as Enchantment[]);
    console.warn(results);

    inventory?.container?.getSlot(player.selectedSlotIndex).setItem(selectedItem);
  });
}
*/
