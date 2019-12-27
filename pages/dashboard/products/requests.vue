<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3
            style="display: flex;align-items: center;padding-left: 0;padding-bottom: 0;"
          >
            Product Approval Requests
          </h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allproducts">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'image'">
                <img
                  style="width: 40px; height: 40px; object-fit:contain"
                  :src="'/media/products/' + props.row.product_id['images'][0]"
                />
              </span>
              <span v-if="props.column.field === 'status'">
                <p
                  type="button"
                  v-if="props.row.status == 1"
                  class="btn btn-primary"
                >
                  APPROVED
                </p>
                <p
                  type="button"
                  v-if="props.row.status == 2"
                  class="btn btn-primary"
                >
                  REJECTED
                </p>
                <button
                  type="button"
                  v-if="props.row.status == 0 || props.row.status == 2"
                  @click="changeProductStatus(props.row.id, 1)"
                  class="btn btn-primary"
                >
                  APPROVE
                </button>
                <button
                  type="button"
                  v-if="props.row.status == 0 || props.row.status == 1"
                  @click="changeProductStatus(props.row.id, 2)"
                  class="btn btn-primary"
                >
                  REJECT
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
  data() {
    return {
      columns: [
        {
          label: "Image",
          field: "image"
        },
        {
          label: "Product Name",
          field: "product_id.product_name"
        },
        {
          label: "Brand",
          field: "product_id.brand"
        },
        {
          label: "Category",
          field: "product_id.category.name"
        },
        {
          label: "Status",
          field: "status"
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
      this.$store.dispatch("allProductsRequests").then(res => {
        console.log(res);
        this.allproducts = JSON.parse(JSON.stringify(res.data));

        for (var i = 0; i < this.allproducts.length; i++) {
          this.allproducts[i]["product_id"].images = JSON.parse(
            this.allproducts[i]["product_id"].images
          );
        }
      });
    },
    deleteProduct: function(id) {
      this.$store.dispatch("deleteProduct", id).then(res => {
        console.log(res);
        this.getAllProducts();
      });
    },
    changeProductStatus: function(id, status) {
      var payload = {
        id: id,
        status: status
      };
      this.$store.dispatch("changeProductStatus", payload).then(res => {
        console.log(res);
        this.getAllProducts();
      });
    }
  }
};
</script>

<style></style>
