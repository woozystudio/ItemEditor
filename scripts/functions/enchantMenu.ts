import {
  Enchantment,
  EnchantmentType,
  EntityInventoryComponent,
  ItemComponentTypes,
  ItemEnchantableComponent,
  ItemStack,
  Player,
} from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

const enchantments = [
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
