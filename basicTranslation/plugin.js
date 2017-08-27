(function(pluginName){
  // Base plugin version: 1.0

  function BasicTranslationMod() {
    this.initialize.apply(this, arguments);
  }

  BasicTranslationMod.prototype = Object.create(Game_Plugin.prototype);
  BasicTranslationMod.prototype.constructor = BasicTranslationMod;

  function applyLoadedData(loadedData) {
    $dataStrings = loadedData;
    TextManager.language = pluginName.toLowerCase();
  }

  function loadDataFile(filePath) {
    var fullPath = path.join(ModManager._path, pluginName, filePath);

    fs.readFile(fullPath, 'utf8', function(error, data){
      if (error) throw error;

      var jsonData = JsonEx.parse(data);
      applyLoadedData(jsonData);
    });
  }

  loadDataFile('translation.json');
})(window.pluginName);
