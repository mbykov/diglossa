const Menu = require('electron').Menu;
// import env from "env";
const log = console.log

import { fileMenuTemplate } from "./file_menu_template";
import { bookMenuTemplate } from "./book_menu_template";
import { dictMenuTemplate } from "./dict_menu_template";
import { aboutMenuTemplate } from "./about_menu_template";
// import { editMenuTemplate } from "./edit_menu_template";
import { helpMenuTemplate } from "./help_menu_template";

import { deuMenuTemplate } from "./lang_deu_menu_template";
import { engMenuTemplate } from "./lang_eng_menu_template";
import { rusMenuTemplate } from "./lang_rus_menu_template";
import { zhoMenuTemplate } from "./lang_zho_menu_template";

// const menu = null;
// const platform = process.platform;

export function MenuFactory(lang) {
  const menus = [fileMenuTemplate(), bookMenuTemplate(), dictMenuTemplate(), aboutMenuTemplate(), helpMenuTemplate()];

  // if (env.name !== "production") {
  //   menus.push(devMenuTemplate);
  // }
  // menus.push(langMenuTemplate);

  switch(lang) {
  case 'eng':
    menus.push(engMenuTemplate);
    break
  case 'deu':
    menus.push(deuMenuTemplate);
    break
  case 'rus':
    menus.push(rusMenuTemplate);
    break
  case 'zho':
    menus.push(zhoMenuTemplate);
    break
  default:
    menus.push(engMenuTemplate);
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}
