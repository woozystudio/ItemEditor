import { Player, system, world } from "@minecraft/server";
import { showItemEditorUI } from "./mainItemEditorUI";

system.afterEvents.scriptEventReceive.subscribe((event) => {
  const { id, sourceEntity } = event;
  switch (id) {
    case "itemeditor:open_main_menu":
      showItemEditorUI(sourceEntity as Player);
  }
});

world.afterEvents.itemUse.subscribe((event) => {
  const { source, itemStack } = event;
  switch (itemStack.typeId) {
    case "minecraft:clock":
      showItemEditorUI(source);
      break;
  }
});
