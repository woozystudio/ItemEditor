import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const ui = new ActionFormData().title("Form").body("").button("button1").button("button2").button("button3");

const customUi = new ActionFormData()
  .title("Custom Form")
  .body("")
  .button({ rawtext: [{ text: "\n\n\n\nRename" }] }, "textures/items/blaze_rod")
  .button({ rawtext: [{ text: "\n\n\n\nDelete" }] }, "textures/items/shears")
  .button({ rawtext: [{ text: "\n\n\n\nSet Lore" }] }, "textures/items/map_trial_chambers")
  .button({ rawtext: [{ text: "\n\n\n\nEnchantments" }] }, "textures/items/spire_armor_trim_smithing_template")
  .button({ rawtext: [{ text: "\n\n\n\nAttributes" }] }, "textures/items/prize_pottery_sherd")
  .button({ rawtext: [{ text: "\n\n\n\nSave Item" }] }, "textures/items/ender_eye")
  .button({ rawtext: [{ text: "\n\n\n\nAmount" }] }, "textures/items/bundle_lime")
  .button({ rawtext: [{ text: "\n\n\n\nRepair" }] }, "textures/items/redstone_dust");

world.afterEvents.itemUse.subscribe((event) => {
  const { source, itemStack } = event;
  switch (itemStack.typeId) {
    case "minecraft:compass":
      ui.show(source);
      break;
    case "minecraft:clock":
      customUi.show(source);
      break;
  }
});
