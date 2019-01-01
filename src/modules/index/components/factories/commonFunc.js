import Map from '../Map';
export function getUserInfo () {
  let option = [];
    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
    }
    if (user.orgCenter && user.orgCenter.type) {
      var type = {};
      type.value = user.orgCenter.type;
      type.label = Map['culturalCategory'][user.orgCenter.type];
      option.push(type);
    }
    return option;
};
