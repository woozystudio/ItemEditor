import {
  EntityInventoryComponent,
  ItemComponentTypes,
  ItemDurabilityComponent,
  ItemStack,
  Player,
} from "@minecraft/server";

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
