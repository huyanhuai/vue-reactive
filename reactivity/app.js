import { effectWatch, reactive } from "./index.js"
import {h} from "../core/h.js"

export default {

    render(context) {
        // 构建视图view
        // const div = document.createElement('div');
        // div.innerText = context.state.count;
        
        // return div
        return h("div", {
                id: "app-id",
                class: "",
            },
            // String(context.state.count)
            [h("p", null, String(context.state.count)), h("p", null, String(context.state.name))]
        )
    },
    setup() {
        // 响应式数据
        const state = reactive({
            count: 0,
            name: 'yuip'
        })
        window.state = state;
        return {
            state
        }
    }
}