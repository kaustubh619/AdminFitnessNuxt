<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <p class="custom-font">Username: {{ username }}</p>
        <label for="datepicker1">Start Date:</label>
        <input
          class="custom-input"
          type="text"
          id="datepicker1"
          placeholder="Select Start Date"
        />
        <label for="datepicker2">End Date:</label>
        <input
          class="custom-input"
          type="text"
          id="datepicker2"
          placeholder="Select End Date"
        />
        <label for="discount">Coupon Discount Percentage:</label>
        <input
          style="margin-top: 10px"
          class="custom-input"
          type="number"
          id="discount"
          v-model="discount"
        />
        <button
          v-if="coupon_bool"
          class="coupon-button"
          @click="generateCoupon"
        >
          Generate Coupon
        </button>

        <button
          v-else
          class="coupon-button"
          style="background-color: #ff9f00"
          @click="editCoupon"
        >
          Edit Coupon
        </button>
        <div v-if="!coupon_bool" class="coupon-card">
          <p class="coupon-text" style="font-size: 24px">Coupon Code</p>
          <p class="coupon-text">{{ coupon_code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: "",
        discount: 10,
        coupon_bool: true,
        coupon_code: ""
      };
    },
    mounted() {
      this.getUser();
      this.getUserCoupon();
      $("#datepicker1").datepicker({ dateFormat: "yy-mm-dd" });
      $("#datepicker2").datepicker({ dateFormat: "yy-mm-dd" });
    },
    methods: {
      getUser: function() {
        const user_id = window.location.href.split("?")[1];
        this.$store.dispatch("getUserDetail", user_id).then(res => {
          this.username = res.data.username;
        });
      },
      generateCoupon: function() {
        const payload = new FormData();
        const start_date = $("#datepicker1").val();
        const end_date = $("#datepicker2").val();
        payload.append("user", window.location.href.split("?")[1]);
        payload.append("start_date", start_date);
        payload.append("end_date", end_date);
        payload.append("coupon_discount_value", this.discount);
        this.$store.dispatch("generateCoupon", payload).then(res => {
          alert("Coupon Code Generated - " + res.data.coupon_code);
          this.$router.push("/dashboard/users/customer");
        });
      },
      getUserCoupon: function() {
        this.$store
          .dispatch("getUserCoupon", window.location.href.split("?")[1])
          .then(response => {
            $("#datepicker1").val(response.data.start_date);
            $("#datepicker2").val(response.data.end_date);
            this.discount = response.data.coupon_discount_value;
            this.coupon_bool = false;
            this.coupon_code = response.data.coupon_code;
          });
      },

      editCoupon: function() {
        const payload = new FormData();
        const user_id = window.location.href.split("?")[1];
        payload.append("id", user_id);
        payload.append("start_date", $("#datepicker1").val());
        payload.append("end_date", $("#datepicker2").val());
        payload.append("coupon_discount_value", this.discount);
        this.$store.dispatch("editCoupon", payload).then(res => {
          this.$router.push("/dashboard/users/customer");
        });
      }
    }
  };
</script>

<style scoped>
.custom-font {
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  margin-bottom: 20px;
}

label {
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
}

.custom-input {
  margin-top: 10px;
  display: block;
  padding: 10px 8px;
  width: 18.2em;
  border-radius: 3px;
  box-shadow: 3px 3px 10px 1px #e7e7e7;
  border: 1px solid #c7c7c7;
  margin-bottom: 20px;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
  margin: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  outline: none;
  box-shadow: none;
}

.coupon-button {
  background-color: #fb641b;
  color: white;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  transition: all 0.3s;
}

.coupon-button:hover {
  box-shadow: none;
}

.coupon-button:focus {
  outline: none;
}

.coupon-button:active {
  transform: scale(1.03);
}

.coupon-card {
  background-color: #fb641b;
  padding: 20px;
  margin-top: 20px;
  width: 280px;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);
}

.coupon-text {
  font-size: 30px;
  color: white;
  text-align: center;
}
</style>
