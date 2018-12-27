import axios from 'axios';
import TfUrlSearchParams from 'common/factories/TfUrlSearchParams';

export default {
  /**
   * 登录认证
   */
  authenticate (auth) {
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.43.75:8762/api/identity/principal/login', auth, {headers: {'Content-Type': 'application/json;charset=UTF-8', post: {'Content-Type': 'application/json;charset=UTF-8'}}})
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

};
