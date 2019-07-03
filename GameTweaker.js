(function(pluginName){
  if (!Managers || !Managers.Updates || Managers.Updates.currentVersion < 0.5016) {
    alert('[GameTweaker] Please update your game to use this mod.');
    return;
  }

  Managers.Mods.addTranslation('brazilian', 'Game Tweaker', 'Modificador de Jogo');
  Managers.Mods.addTranslation('brazilian', 'Time Stretch', 'Multiplicador de Tempo');
  Managers.Mods.addTranslation('brazilian', 'Price Multiplier', 'Multiplicador Preços');
  Managers.Mods.addTranslation('brazilian', 'Relationship Multiplier', 'Multip. Relacionamentos');

  let priceMultiplier = 10;
  let relationshipMultiplier = 10;
  const originalSecondDuration = Managers.Time._secondDuration;

  class GameTweakerContent {
    static makeModList(listWindow) {
      listWindow.addCommand(t("Game Tweaker"), 'mod_gametweaker', true, 'subcategory');
    }

    static makeSettingsList(listWindow) {
      const category = listWindow.category();
      if (category != 'mods') {
        return;
      }

      if (listWindow._subCategory != 'mod_gametweaker') {
        return;
      }

      listWindow.addCommand(t("Time Stretch"), 'mod_gametweaker_timestretch', true, 'number');
      listWindow.addCommand(t("Price Multiplier"), 'mod_gametweaker_pricemultiplier', true, 'number');
      listWindow.addCommand(t("Relationship Multiplier"), 'mod_gametweaker_relationshipmultiplier', true, 'number');

      listWindow.addCommand(t("Reset Defaults"), 'mod_gametweaker_reset', true, 'action');
      return true;
    }

    static confirmModSetting(listWindow, symbol) {
      if (!symbol.startsWith('mod_gametweaker_')) {
        return;
      }

      switch (symbol.replace('mod_gametweaker_', '')) {
        case 'timestretch':
          listWindow.activate();
          break;
        case 'pricemultiplier':
          listWindow.activate();
          break;
        case 'relationshipmultiplier':
          listWindow.activate();
          break;
        case 'reset':
          listWindow.activate();
          GameTweakerContent.restoreDefaults();
          listWindow.refresh();
          Managers.Sound.playOk();
          break;
      }
    }

    static restoreDefaults() {
      Managers.Time._secondDuration = originalSecondDuration || 40;
      priceMultiplier = 10;
      relationshipMultiplier = 10;
      Utils._isTestMode = Utils.isOptionValid('test');
    }

    static configManager_makeData(config) {
      config.gametweakermod_secondDuration = Managers.Time._secondDuration;
      config.gametweakermod_pricemultiplier = priceMultiplier;
      config.gametweakermod_relationshipmultiplier = relationshipMultiplier;
    }

    static drawModSettingValue(listWindow, symbol, rect, index) {
      if (!symbol.startsWith('mod_gametweaker_')) {
        return;
      }

      switch (symbol.replace('mod_gametweaker_', '')) {
        case 'timestretch':
          listWindow._drawNumberValue(Math.floor(Managers.Time._secondDuration * 100 / originalSecondDuration) + '%', symbol, rect, index, 0, 200);
          break;
        case 'pricemultiplier':
          listWindow._drawNumberValue(Math.floor(Math.fix(priceMultiplier * 10)) + '%', symbol, rect, index, 1, 40);
          break;
        case 'relationshipmultiplier':
          listWindow._drawNumberValue(Math.floor(Math.fix(relationshipMultiplier * 10)) + '%', symbol, rect, index, 1, 40);
          break;
        case 'reset':
          break;
      }

      return true;
    }

    static applyItemDataModifiers(data) {
      if (data.buyPrice > 0) {
        data.buyPrice = Math.floor(Math.fix(data.buyPrice * priceMultiplier / 10));
        if (data.buyPrice === 0) {
          data.buyPrice = 1;
        }
      }

      if (data.sellPrice > 0) {
        data.sellPrice = Math.floor(Math.fix(data.sellPrice * priceMultiplier / 10));
        if (data.sellPrice === 0) {
          data.sellPrice = 1;
        }
      }

      if (data.taskPrice > 0) {
        data.taskPrice = Math.floor(Math.fix(data.taskPrice * priceMultiplier / 10));
        if (data.taskPrice === 0) {
          data.taskPrice = 1;
        }
      }

      return data;
    }

    static changeToPreviousValue(listWindow, symbol, ext) {
      if (!symbol.startsWith('mod_gametweaker_')) {
        return;
      }

      switch (symbol.replace('mod_gametweaker_', '')) {
        case 'timestretch':
          if (Managers.Time._secondDuration > 10) {
            Managers.Time._secondDuration--;
            Managers.Sound.playCursor();
          }
          return true;
        case 'pricemultiplier':
          if (priceMultiplier > 1) {
            priceMultiplier -= 1;
            Managers.Sound.playCursor();
          }

          priceMultiplier = Math.fix(priceMultiplier);
          return true;
        case 'relationshipmultiplier':
          if (relationshipMultiplier > 1) {
            relationshipMultiplier -= 1;
          }

          relationshipMultiplier = Math.fix(relationshipMultiplier);
          Managers.Sound.playCursor();
          return true;
      }
    }

    static changeToNextValue(listWindow, symbol, ext) {
      if (!symbol.startsWith('mod_gametweaker_')) {
        return;
      }

      switch (symbol.replace('mod_gametweaker_', '')) {
        case 'timestretch':
          if (Managers.Time._secondDuration < 200) {
            Managers.Time._secondDuration++;
            Managers.Sound.playCursor();
          }
          return true;
        case 'pricemultiplier':
          if (priceMultiplier < 40) {
            priceMultiplier += 1;
          }

          priceMultiplier = Math.fix(priceMultiplier);
          Managers.Sound.playCursor();
          return true;
        case 'relationshipmultiplier':
          if (relationshipMultiplier < 40) {
            relationshipMultiplier += 1;
          }

          relationshipMultiplier = Math.fix(relationshipMultiplier);
          Managers.Sound.playCursor();
          return true;
      }
    }
  }

  
  if (Managers.Config.loadedConfig) {
    if (Managers.Config.loadedConfig.gametweakermod_secondDuration) {
      Managers.Time._secondDuration = Managers.Config.loadedConfig.gametweakermod_secondDuration;
      if (isNaN(Managers.Time._secondDuration) || Managers.Time._secondDuration < 1 || Managers.Time._secondDuration > 200) {
        Managers.Time._secondDuration = originalSecondDuration || 40;
      }
    }

    if (Managers.Config.loadedConfig.gametweakermod_pricemultiplier) {
      priceMultiplier = Managers.Config.loadedConfig.gametweakermod_pricemultiplier;

      if (isNaN(priceMultiplier) || priceMultiplier < 1 || priceMultiplier > 40) {
        priceMultiplier = 10;
      }
    }

    if (Managers.Config.loadedConfig.gametweakermod_relationshipmultiplier) {
      relationshipMultiplier = Managers.Config.loadedConfig.gametweakermod_relationshipmultiplier;

      if (isNaN(relationshipMultiplier) || relationshipMultiplier < 1 || relationshipMultiplier > 40) {
        relationshipMultiplier = 10;
      }
    }
  }

  //Override the game methods to change the value
  const oldRelationshipManager_increaseFriendship = Managers.Relationship.increaseFriendship;
  Managers.Relationship.increaseFriendship = function(villagerName, points) {
    if (points === undefined) points = 1;

    points = Math.fix(points * relationshipMultiplier / 10);

    oldRelationshipManager_increaseFriendship.call(Managers.Relationship, villagerName, points);
  };

  Creature.prototype.increaseFriendshipForTheDay = function() {
    this.friendship += Math.fix(20 * relationshipMultiplier / 10);
  };

  Objects.Creature.prototype.increaseFriendshipForGift = function(creatureData, itemId) {
    creatureData.friendship += Math.fix(20 * relationshipMultiplier / 10);
  };

  Managers.Content.registerContentClass(GameTweakerContent);

})(window.pluginName);
