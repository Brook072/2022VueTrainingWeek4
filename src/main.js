import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faImage } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faUserSecret,faImage);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
