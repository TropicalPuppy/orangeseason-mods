(function(pluginName){
  if (UpdateManager.currentVersion < 0.2) {
    alert('[GameTweaker] Please update your game to use this mod.');
    return;
  }

  if (UpdateManager.currentVersion > 0.201) {
    console.log('[GameTweaker] This mod may be outdated.');
  }

  function GameTweakerContent() {
  }

  ModManager.addTranslation('brazilian', 'Time Stretch', 'Duração do Tempo (Segundos em Frames)');
  ModManager.addTranslation('brazilian', 'Game Tweaker', 'Modificador de Jogo');
  ModManager.addTranslation('brazilian', 'Price Multiplier', 'Multiplicador de Preços');
  ModManager.addTranslation('brazilian', 'Relationship Multiplier', 'Multiplicador de Relacionamentos');
  ModManager.addTranslation('brazilian', 'Debug Mode', 'Modo de Testes');

  GameTweakerContent.priceMultiplier = 1;
  GameTweakerContent.relationshipMultiplier = 1;

  GameTweakerContent.makeModList = function(modWindow) {
    modWindow.addCommand(t('Game Tweaker'), 'gametweakermod');
    return;
  };

  GameTweakerContent.options_statusText = function(modWindow, symbol) {
    if (symbol == 'gametweakermod_timestretch') {
      return TimeManager.secondLength;
    }

    if (symbol == 'gametweakermod_pricemultiplier') {
      return Math.floor(Math.fix(GameTweakerContent.priceMultiplier * 100)) + '%';
    }

    if (symbol == 'gametweakermod_relationshipmultiplier') {
      return Math.floor(Math.fix(GameTweakerContent.relationshipMultiplier * 100)) + '%';
    }

    if (symbol == 'gametweakermod_reset') {
      return '';
    }

    if (symbol == 'gametweakermod_debugmode') {
      return modWindow.booleanStatusText(Utils._isPlaytest);
    }
  };

  GameTweakerContent.options_isSceneControlSymbol = function(modWindow, symbol) {
    if (symbol == 'gametweakermod') return true;

  };

  GameTweakerContent.options_handleSceneSymbol = function(modWindow, symbol) {
    if (symbol == 'gametweakermod') {
      modWindow.enterNewMode(symbol);
      SoundManager.playOk();
      return true;
    }

    if (symbol == 'back' && modWindow.mode == 'gametweakermod') {
      modWindow.enterNewMode('mods');
      modWindow.refresh();
      modWindow.selectSymbol('gametweakermod');
      return true;
    }
  };

  GameTweakerContent.options_makeCommandList = function(modWindow) {
    if (modWindow.mode == 'gametweakermod') {
      modWindow.addCommand(t('Time Stretch'), 'gametweakermod_timestretch');
      modWindow.addCommand(t('Price Multiplier'), 'gametweakermod_pricemultiplier');
      modWindow.addCommand(t('Relationship Multiplier'), 'gametweakermod_relationshipmultiplier');
      modWindow.addCommand(t('Debug Mode'), 'gametweakermod_debugmode');

      modWindow.addCommand(t('Reset Defaults'), 'gametweakermod_reset');
      modWindow.addCommand(t('Go back'), 'back');
      return true;
    }
  };

  GameTweakerContent.options_processOk = function(modWindow, symbol, value) {
    if (symbol == 'gametweakermod_timestretch') {
      return true;
    }

    if (symbol == 'gametweakermod_pricemultiplier') {
      return true;
    }
    if (symbol == 'gametweakermod_relationshipmultiplier') {
      return true;
    }
    if (symbol == 'gametweakermod_debugmode') {
      Utils._isPlaytest = !Utils._isPlaytest;
      SoundManager.playOk();
      return true;
    }

    if (symbol == 'gametweakermod_reset') {
      GameTweakerContent.restoreDefaults();
      modWindow.refresh();
      SoundManager.playOk();
      return true;
    }
  };

  GameTweakerContent.options_cursorRight = function(modWindow, symbol, value, wrap) {
    if (symbol == 'gametweakermod_timestretch') {
      if (TimeManager.secondLength < 500) {
        TimeManager.secondLength++;
        SoundManager.playCursor();
      }
      return true;
    }

    if (symbol == 'gametweakermod_pricemultiplier') {
      if (GameTweakerContent.priceMultiplier < 0.1) {
        GameTweakerContent.priceMultiplier += 0.01;
      } else if (GameTweakerContent.priceMultiplier < 20) {
        GameTweakerContent.priceMultiplier += 0.1;
      }

      GameTweakerContent.priceMultiplier = Math.fix(GameTweakerContent.priceMultiplier);
      SoundManager.playCursor();
      return true;
    }

    if (symbol == 'gametweakermod_relationshipmultiplier') {
      if (GameTweakerContent.relationshipMultiplier < 20) {
        GameTweakerContent.relationshipMultiplier += 0.1;
      }

      GameTweakerContent.relationshipMultiplier = Math.fix(GameTweakerContent.relationshipMultiplier);
      SoundManager.playCursor();
      return true;
    }

    if (symbol == 'gametweakermod_debugmode') {
      Utils._isPlaytest = !Utils._isPlaytest;
      SoundManager.playCursor();
      return true;
    }
  };

  GameTweakerContent.options_cursorLeft = function(modWindow, symbol, value, wrap) {
    if (symbol == 'gametweakermod_timestretch') {
      if (TimeManager.secondLength > 1) {
        TimeManager.secondLength--;
        SoundManager.playCursor();
      }
      return true;
    }

    if (symbol == 'gametweakermod_pricemultiplier') {
      if (GameTweakerContent.priceMultiplier > 0.01) {
        if (GameTweakerContent.priceMultiplier <= 0.1) {
          GameTweakerContent.priceMultiplier -= 0.01;
        } else {
          GameTweakerContent.priceMultiplier -= 0.1;
        }
        
        SoundManager.playCursor();
        GameTweakerContent.priceMultiplier = Math.fix(GameTweakerContent.priceMultiplier);
      }

      return true;
    }

    if (symbol == 'gametweakermod_relationshipmultiplier') {
      if (GameTweakerContent.relationshipMultiplier > 0) {
        GameTweakerContent.relationshipMultiplier -= 0.1;
      }

      GameTweakerContent.relationshipMultiplier = Math.fix(GameTweakerContent.relationshipMultiplier);
      SoundManager.playCursor();
      return true;
    }

    if (symbol == 'gametweakermod_debugmode') {
      Utils._isPlaytest = !Utils._isPlaytest;
      SoundManager.playCursor();
      return true;
    }
  };

  GameTweakerContent.applyItemDataModifiers = function(data) {
    if (data.buyPrice > 0) {
      data.buyPrice = Math.floor(Math.fix(data.buyPrice * GameTweakerContent.priceMultiplier));
      if (data.buyPrice === 0) {
        data.buyPrice = 1;
      }
    }

    if (data.sellPrice > 0) {
      data.sellPrice = Math.floor(Math.fix(data.sellPrice * GameTweakerContent.priceMultiplier));
      if (data.sellPrice === 0) {
        data.sellPrice = 1;
      }
    }

    return data;
  };

  GameTweakerContent.configManager_makeData = function(config) {
    config.gametweakermod_secondLength = TimeManager.secondLength;
    config.gametweakermod_pricemultiplier = GameTweakerContent.priceMultiplier;
    config.gametweakermod_relationshipmultiplier = GameTweakerContent.relationshipMultiplier;
    config.gametweakermod_debugmode = Utils._isPlaytest;
  };

  GameTweakerContent.originalSecondLength = TimeManager.secondLength;
  if (ConfigManager.loadedConfig) {
    if (ConfigManager.loadedConfig.gametweakermod_secondLength) {
      TimeManager.secondLength = ConfigManager.loadedConfig.gametweakermod_secondLength;
      if (isNaN(TimeManager.secondLength) || TimeManager.secondLength < 1 || TimeManager.secondLength > 500) {
        TimeManager.secondLength = GameTweakerContent.originalSecondLength || 50;
      }
    }

    if (ConfigManager.loadedConfig.gametweakermod_pricemultiplier) {
      GameTweakerContent.priceMultiplier = ConfigManager.loadedConfig.gametweakermod_pricemultiplier;

      if (isNaN(GameTweakerContent.priceMultiplier) || GameTweakerContent.priceMultiplier < 0.01 || GameTweakerContent.priceMultiplier > 20) {
        GameTweakerContent.priceMultiplier = 1;
      }
    }

    if (ConfigManager.loadedConfig.gametweakermod_relationshipmultiplier) {
      GameTweakerContent.relationshipMultiplier = ConfigManager.loadedConfig.gametweakermod_relationshipmultiplier;

      if (isNaN(GameTweakerContent.relationshipMultiplier) || GameTweakerContent.relationshipMultiplier < 0 || GameTweakerContent.relationshipMultiplier > 20) {
        GameTweakerContent.relationshipMultiplier = 1;
      }
    }

    if (ConfigManager.loadedConfig.gametweakermod_debugmode) {
      Utils._isPlaytest = true;
    }
  }

  //Override the game methods to change the value
  var oldRelationshipManager_increaseFriendship = RelationshipManager.increaseFriendship;
  RelationshipManager.increaseFriendship = function(villagerName, points) {

    if (points === undefined) points = 1;

    points *= GameTweakerContent.relationshipMultiplier;
    points = Math.fix(points);

    oldRelationshipManager_increaseFriendship.call(RelationshipManager, villagerName, points);
  };

  Creature.prototype.increaseFriendshipForTheDay = function() {
    this.friendship += Math.fix(20 * GameTweakerContent.relationshipMultiplier);
  };

  Game_Creature.prototype.increaseFriendshipForGift = function(creatureData, itemId) {
    creatureData.friendship += Math.fix(20 * GameTweakerContent.relationshipMultiplier);
  };

  function additionalKeyDownListener(event) {
    if (Utils.isOptionValid('test')) return;
    if (!$gameTemp.isPlaytest()) return;

    if (event.keyCode == 119) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
  document.addEventListener('keydown', additionalKeyDownListener);

  GameTweakerContent.restoreDefaults = function() {
    TimeManager.secondLength = GameTweakerContent.originalSecondLength || 50;
    GameTweakerContent.priceMultiplier = 1;
    GameTweakerContent.relationshipMultiplier = 1;
    Utils._isPlaytest = Utils.isOptionValid('test');
  };
  ContentManager.registerContentClass(GameTweakerContent);

})(window.pluginName);
