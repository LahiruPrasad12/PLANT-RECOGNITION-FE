<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="margin-left: 20%">ADD STAFF</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
<!--          <ion-col size="6">-->
<!--            <ion-label position="floating">First Name</ion-label>-->
<!--            <ion-input v-model="form.first_name" class="u-input"-->
<!--                       type="text"></ion-input>-->
<!--          </ion-col>-->
          <ion-col size="6">
            <ion-label position="floating">First Name</ion-label>
            <ion-input
                class="u-input"
                v-model="first_name"
                clear-input
                required
                name="first_name"
                type="text"
            ></ion-input>
            <ion-row v-show="firstNameError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ firstNameError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Last Name</ion-label>
            <ion-input
                class="u-input"
                v-model="last_name"
                clear-input
                required
                name="last_name"
                type="text"
            ></ion-input>
            <ion-row v-show="lastNameError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ lastNameError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
<!--          <ion-col size="6">-->
<!--            <ion-label position="floating">Email</ion-label>-->
<!--            <ion-input class="u-input" v-model="form.email" clear-input required type="email"></ion-input>-->
<!--          </ion-col>-->
          <ion-col size="6">
            <ion-label position="floating">Email Address</ion-label>
            <ion-input
                class="u-input"
                v-model="email"
                clear-input
                required
                name="email"
                type="text"
            ></ion-input>
            <ion-row v-show="emailError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ emailError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Mobile</ion-label>
            <ion-input
                class="u-input"
                v-model="mobile"
                clear-input
                required
                name="mobile"
                type="number"
            ></ion-input>
            <ion-row v-show="mobileError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ mobileError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
<!--          <ion-col size="6">-->
<!--            <ion-label position="floating">Date Of Birth</ion-label>-->
<!--            <ion-input-->
<!--                class="u-input"-->
<!--                v-model="DOB"-->
<!--                clear-input-->
<!--                required-->
<!--                name="DOB"-->
<!--                type="date"-->
<!--            ></ion-input>-->
<!--            <ion-row v-show="dobError" class="ion-text-start">-->
<!--              <ion-col size="12">-->
<!--                <ion-text color="danger">-->
<!--                  <span>{{ dobError }}</span>-->
<!--                </ion-text>-->
<!--              </ion-col>-->
<!--            </ion-row>-->
<!--          </ion-col>-->
          <ion-col size="12">
            <ion-label position="floating">Select Role</ion-label>
            <ion-select name="account_type" class="u-input" v-model="account_type" placeholder="Select role" required>
              <ion-select-option value="stock-manager">Stock-Manager</ion-select-option>
              <ion-select-option value="staff">Staff</ion-select-option>
              <ion-select-option value="supplier">Supplier</ion-select-option>
            </ion-select>
            <ion-row v-show="requiredAccountType" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ requiredAccountType }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
<!--          <ion-datetime-button date-target="true" datetime="datetime"></ion-datetime-button>-->
<!--          <ion-modal :keep-contents-mounted="true">-->
<!--&lt;!&ndash;            <ion-datetime date-target="true" id="datetime"></ion-datetime>&ndash;&gt;-->
<!--          </ion-modal>-->
        </ion-row>

        <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                    @click="saveData">
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Save
        </ion-button>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import staff_api from "@/apis/modules/admin_apis/staff_apis";
import { defineRule, useField, useForm } from "vee-validate";
import {
  addCircleOutline,
  arrowDownCircleOutline,
  arrowForwardCircleOutline,
  arrowForwardOutline,
  cafeOutline,
  calendarOutline,
  removeCircleOutline,
  timeOutline,
  minusOutline,
} from 'ionicons/icons';
import {
  IonModal,
  IonText,
  IonIcon,
  IonContent,
  IonToolbar,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonImg,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
    IonDatetimeButton,
    IonDatetime,
  createAnimation
} from "@ionic/vue";

export default {
  components: {
    IonModal,
    IonContent,
    IonToolbar,
    IonButton,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonAvatar,
    IonImg,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText,
    IonIcon,
    IonDatetimeButton,
    IonDatetime
  },
  name: "add_student",
  setup() {
    defineRule("email", (email) => {
      if (
          !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(
              email
          )
      ) {
        return "Please enter a valid email";
      }
      return true;
    });
    defineRule("requiredEmail", (value) => {
      if (!value || !value.length) {
        return "The Email field is required";
      }
      return true;
    });
    defineRule("requiredFirstName", (value) => {
      if (!value || !value.length) {
        return "The first name field is required";
      }
      return true;
    });
    defineRule("requiredLastName", (value) => {
      if (!value || !value.length) {
        return "The last name field is required";
      }
      return true;
    });
    defineRule("requiredMobile", (value) => {
      if (!value || !value.length) {
        return "The mobile field is required";
      }
      return true;
    });
    defineRule("mobile", (value) => {
      if (value.toString().length <= 5) {
        return "please enter valid mobile number";
      }
      return true;
    });
    defineRule("requiredDOB", (value) => {
      if (!value || !value.length) {
        return "The DOB field is required";
      }
      return true;
    });
    defineRule("requiredAccountType", (value) => {
      if (!value || !value.length) {
        return "The account type field is required";
      }
      return true;
    });
    function validation() {
      return theForm.validate();
    }

    const schema = {
      email: "requiredEmail|email",
      first_name: "requiredFirstName",
      last_name: "requiredLastName",
      mobile: "requiredMobile|mobile",
      // DOB: "requiredDOB",
      account_type: "requiredAccountType",
    };

    const theForm = useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: first_name, errorMessage: firstNameError } = useField("first_name");
    const { value: last_name, errorMessage: lastNameError } = useField("last_name");
    const { value: mobile, errorMessage: mobileError } = useField("mobile");
    // const { value: DOB, errorMessage: dobError } = useField("DOB");
    const { value: account_type, errorMessage: requiredAccountType } = useField("account_type");

    const enterAnimation = (baseEl) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
          .addElement(root.querySelector('ion-backdrop'))
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
          .addElement(root.querySelector('.modal-wrapper'))
          .keyframes([
            {offset: 0, opacity: '0', transform: 'scale(0)'},
            {offset: 1, opacity: '0.99', transform: 'scale(1)'},
          ]);

      return createAnimation()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl) => {
      return enterAnimation(baseEl).direction('reverse');
    };
    return {
      enterAnimation, leaveAnimation, calendarOutline,
      emailError,email,
      firstNameError, first_name,
      lastNameError, last_name,
      mobileError, mobile,
      // dobError, DOB,
      requiredAccountType, account_type,
      theForm, validation,

    };
  },

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      validateData: "",
      form: {
        first_name: '',
        last_name: '',
        email: '',
        DOB: '',
        mobile: '',
        account_type: ''
      }
    }
  },
  methods: {
    dismiss() {
      this.is_open = !this.is_open
      this.$emit('closeModel')
    },
    openAddStaffModel() {
      this.is_open = true
    },
    async saveData() {
      try {
        this.validateData = (await this.validation());
        if (this.validateData.valid) {
          this.is_btn_loading = true
          let payload = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            // DOB: this.DOB,
            mobile: this.mobile,
            account_type: this.account_type
          }
          await staff_api.saveStaff(payload)
          await this.successToast('Staff Added Successfully')
          this.dismiss()
        }

      } catch (e) {
        await this.dangerToast(e)
      }
      this.is_btn_loading = false
    },
  },
}
</script>

<style scoped>

</style>
