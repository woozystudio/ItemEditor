import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const ui = new ActionFormData().title("Form").body("").button("button1").button("button2").button("button3");

const customUi = new ActionFormData()
  .title("Custom Form")
  .body("")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/promo_holiday_gift_small")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_deals")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/hammer_l")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/customUi/Circle")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_hangar")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/promo_holiday_gift_small")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_deals")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/hammer_l")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/customUi/Circle")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_hangar")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/promo_holiday_gift_small")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_deals")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/hammer_l")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/customUi/Circle")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_hangar")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/promo_holiday_gift_small")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_deals")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/hammer_l")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/customUi/Circle")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_hangar")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/promo_holiday_gift_small")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_deals")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/hammer_l")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/customUi/Circle")
  .button({ rawtext: [{ text: "\n\n\n\naaaaaa" }] }, "textures/ui/icon_hangar");

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
