<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Customer Register</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allproducts">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <button
                  type="button"
                  @click="generateCoupon(props.row.user.id)"
                  class="btn-coupon btn btn-primary"
                  style=""
                >
                  Coupon
                </button>
              </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-component",
    middleware: "auth",
    data() {
      return {
        columns: [
          {
            label: "Username",
            field: "user.username"
          },
          {
            label: "Full Name",
            field: "user.first_name"
          },
          {
            label: "Email",
            field: "user.email"
          },
          {
            label: "Gender",
            field: "gender"
          },
          {
            label: "Location",
            field: "location"
          },
          {
            label: "Action",
            field: "details"
          }
        ],
        rows: [
          {
            id: 1,
            name: "Mobile",
            age: 20,
            createdAt: "2011-10-31",
            details: "<p>asa</p>"
          }
        ],
        allproducts: []
      };
    },
    mounted() {
      this.getAllProducts();
    },
    methods: {
      getAllProducts: function() {
        this.$store.dispatch("getAllCust").then(res => {
          this.allproducts = JSON.parse(JSON.stringify(res.data));
        });
      },
      generateCoupon: function(id) {
        this.$router.push("/dashboard/users/coupon?" + id);
      },
    }
  };
</script>


<style scoped>
.btn-coupon {
  background-color: #fb641b;
  color: white;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);
}

.btn-coupon:hover {
  box-shadow: none;
  color: #f9f9f9;
}
</style>