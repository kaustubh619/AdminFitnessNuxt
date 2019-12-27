<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Products List</h3>
          <nuxt-link
            to="/dashboard/products/add_brand"
            style="text-decoration:none"
          >
            <button class="btn btn-red addProduct">
              <!-- <i data-feather="upload"></i> -->
              <span class="white-text">Add Brand</span>
            </button>
          </nuxt-link>
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allBrands">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <nuxt-link
                  :to="{
                    name: 'dashboard-products-edit_brand',
                    params: { id: props.row.id }
                  }"
                  class="btn detail"
                  >Edit</nuxt-link
                >

                <button
                  type="button"
                  @click="deleteBrand(props.row.id)"
                  class="btn btn-primary delete"
                >
                  Delete
                </button>
              </span>

              <!-- <span v-if="props.column.field === 'status'">
              <p v-if="props.row.status == 1">Active</p>
              <p v-if="props.row.status == 2">Out of stock</p>
              <p v-if="props.row.status == 0">Offline</p>
             </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span> -->
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: "Brand Name",
            field: "name"
          },
          {
            label: "Action",
            field: "details"
          }
        ],

        allBrands: []
      };
    },

    computed: {},

    mounted() {
      this.getAllBrands();
    },

    methods: {
      getAllBrands: function() {
        this.$store.dispatch("allBrands").then(res => {
          this.allBrands = JSON.parse(JSON.stringify(res.data));
        });
      },

      deleteBrand: function(id) {
        var x = confirm("Are you sure you want to delete?");
        if (x)
          return this.$store.dispatch("deleteBrand", id).then(res => {
            this.getAllBrands();
          });
        else return false;
      }
    }
  };
</script>

<style scoped>
.addProduct {
  background-color: rgb(76, 175, 80);
  align-items: center;
  display: flex;
}

.addProduct:hover {
  background-color: #008000;
}

.detail {
  background-color: #1db6e0;
  color: white;
  height: auto;
  padding: 3px 12px;
  text-decoration: none;
  margin-bottom: 5px;
}

.detail:hover {
  background-color: #1d9ec2;
}

.delete {
  background-color: #e3364d;
  color: white;
  height: auto;
  padding: 3px 12px;
  margin-right: 10px;
  margin-bottom: 5px;
}

.delete:hover {
  background-color: #c00000;
}
</style>
