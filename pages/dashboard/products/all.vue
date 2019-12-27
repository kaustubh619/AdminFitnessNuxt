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
          <vue-good-table :columns="columns" :rows="allproducts">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'image'">
                <img
                  style="width: 40px; height: 40px; object-fit:contain"
                  :src="'/media/products/' + props.row.images[0]"
                />
              </span>
              <span v-if="props.column.field === 'details'">
                <button
                  type="button"
                  @click="deleteProduct(props.row.id)"
                  class="btn btn-primary"
                >
                  Delete
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
            field: "product_name"
          },
          {
            label: "Brand",
            field: "brand"
          },
          {
            label: "Category",
            field: "category.name"
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
        this.$store.dispatch("allProducts").then(res => {
          console.log(res);
          this.allproducts = JSON.parse(JSON.stringify(res.data));
          for (var i = 0; i < this.allproducts.length; i++) {
            this.allproducts[i].images = JSON.parse(this.allproducts[i].images);
          }
        });
      },
      deleteProduct: function(id) {
        this.$store.dispatch("deleteProduct", id).then(res => {
          console.log(res);
          this.getAllProducts();
        });
      }
    }
  };
</script>

<style></style>
