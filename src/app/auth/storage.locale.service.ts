import { Injectable } from "@angular/core";
import { LocaleUsr } from "./locale_usr.model";
import { LocaleKeys } from "../../config/locale_keys.config";
import { LocaleUsrRole } from "./locale_user_role.model";

@Injectable()
export class StorageLocaleService {
  getLocalToken(): LocaleUsr {
    let item = localStorage.getItem(LocaleKeys.tokenUsr);
    if (item == null) {
      return null;
    } else {
      return JSON.parse(item);
    }
  }

  setLocalToken(item: LocaleUsr) {
    if (item == null) {
      localStorage.removeItem(LocaleKeys.tokenUsr);
    } else {
      localStorage.setItem(LocaleKeys.tokenUsr, JSON.stringify(item));
    }
  }

  getLocalRole(): LocaleUsrRole {//consultando o valor da chave
    let item = localStorage.getItem(LocaleKeys.roleUser);
    if (item == null) {
      return null;
    } else {
      return JSON.parse(item);
    }
  }

  setLocalRole(item: LocaleUsrRole) {//salvando o valor da chave
    if (item == null) {
      localStorage.removeItem(LocaleKeys.roleUser);
    } else {
      localStorage.setItem(LocaleKeys.roleUser, JSON.stringify(item));
    }
  }
}
