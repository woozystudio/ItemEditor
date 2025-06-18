import { world } from "@minecraft/server";
import { showItemEditorUI } from "./mainItemEditorUI";

world.afterEvents.itemUse.subscribe((event) => {
  const { source, itemStack } = event;
  switch (itemStack.typeId) {
    case "minecraft:clock":
      showItemEditorUI(source);
      break;
  }
});
