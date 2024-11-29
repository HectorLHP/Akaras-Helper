import { createVuetify } from 'vuetify';
import {
  VTextField,
  VAlert,
  VApp,
  VBtn,
  VContainer,
  VRow,
  VCol,
} from 'vuetify/components'; // Import components
import 'vuetify/styles'; // Import Vuetify styles

const vuetify = createVuetify({
  components: {
    VTextField,
    VAlert,
    VApp, // Register components
    VBtn,
    VContainer,
    VRow,
    VCol,
  },
});

export default vuetify;
