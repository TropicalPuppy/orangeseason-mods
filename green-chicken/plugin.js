(function(pluginName){
  ModManager.loadPluginEventFile(pluginName, 'stella.txt', 'Stella');
  CommonEventManager.redirectEvent('stella_buy_chicken', 'stella_buy_green_chicken');
})(window.pluginName);