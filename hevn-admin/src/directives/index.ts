import { App } from 'vue'
import focus from './modules/focus'
import copy from './modules/copy'
import debounce from './modules/debounce'
import throttle from './modules/throttle'
import permission from './modules/permission'
import draggable from './modules/draggable'
import longpress from './modules/draggable'

const directivesList: any = {
  // Custom directives
  focus,
  copy,
  permission,
  debounce,
  throttle,
  draggable,
  longpress
}

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives
