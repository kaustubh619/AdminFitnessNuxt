<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">All Products</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allOrder">
            <!-- <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <button type="button" @click="deleteProduct(props.row.id)" class="btn btn-primary">Delete</button>
              </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>-->
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data: () => ({
    allOrder: [],
    columns: [
      {
        label: "Order Id",
        field: "order_id"
      },
      {
        label: "Product Name",
        field: "product_name"
      },
      {
        label: "Price",
        field: "product_price"
      },
      {
        label: "Created Date",
        field: "created_date"
      }
    ]
  }),

  mounted() {
    this.getAllOrder();
  },
  methods: {
    getAllOrder: function() {
      this.$store.dispatch("getAllOrder").then(res => {
        console.log(res);
        this.allOrder = JSON.parse(JSON.stringify(res.data));
      });
    }
  }
};
</script>
