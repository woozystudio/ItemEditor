import { Player, system } from "@minecraft/server";
import { showItemEditorUI } from "./ItemEditorUI";

system.afterEvents.scriptEventReceive.subscribe((event) => {
  const { id, sourceEntity } = event;
  switch (id) {
    case "itemeditor:open_main_menu":
      showItemEditorUI(sourceEntity as Player);
  }
});
