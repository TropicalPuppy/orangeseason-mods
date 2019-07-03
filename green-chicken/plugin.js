(function(pluginName){
  const addChickensToList = Managers.Shop.addChickensToList;
  Managers.Shop.addChickensToList = function(list) {
    addChickensToList.call(this, list);
    list.push('green-chicken');
  };
})(window.pluginName);