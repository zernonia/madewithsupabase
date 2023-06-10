import { type DefaultConfigOptions, createInput } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { addAsteriskPlugin } from './utils/formkit/plugins/asterik'
import UInput from '@/utils/formkit/components/Input.vue'
import UButton from '@/utils/formkit/components/Button.vue'
import UTextArea from '@/utils/formkit/components/Textarea.vue'
import USelect from '@/utils/formkit/components/Select.vue'
import UCheckbox from '@/utils/formkit/components/Checkbox.vue'
import URadio from '@/utils/formkit/components/Radio.vue'
import UToggle from '@/utils/formkit/components/Toggle.vue'
import UFileUpload from '@/utils/formkit/components/FileUpload.vue'

const config: DefaultConfigOptions = {
  inputs: {
    uinput: createInput(UInput),
    utextarea: createInput(UTextArea),
    uselect: createInput(USelect),
    ucheckbox: createInput(UCheckbox),
    uradio: createInput(URadio),
    utoggle: createInput(UToggle),
    ubutton: {
      type: 'input',
      component: UButton,
    },
    ufileupload: createInput(UFileUpload),
  },

  config: {
    classes: generateClasses({
      form: {
        form: 'w-full max-w-[40rem] mx-auto',
      },
      global: {
        outer: 'mb-2',
        label: 'text-sm',
        inner: 'mt-1',
        message: 'text-red-500 mt-1 text-[13px]',
        help: 'text-gray-400 mt-1 text-xs',
      },
    }),
  },

  plugins: [addAsteriskPlugin],
}

export default config
