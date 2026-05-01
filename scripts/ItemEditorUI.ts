import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { renameItemMenu } from "./functions/renameItemMenu";
import { setLoreMenu } from "./functions/setLoreMenu";
import { editAttributesMenu } from "./functions/editAttributesMenu";
import { quantityMenu } from "./functions/quantityMenu";
import { repairMenu } from "./functions/repairMenu";

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
