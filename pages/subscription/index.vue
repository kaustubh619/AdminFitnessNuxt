<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Subscription Plan</h3>
          <nuxt-link to="/subscription/add_plan" style="text-decoration:none">
            <button class="btn btn-red addTrainer">
              <span class="white-text">Add Plan</span>
            </button>
          </nuxt-link>
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="subscription_plans">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <nuxt-link
                  :to="{
                    name: 'subscription-id',
                    params: { id: props.row.id }
                  }"
                  class="btn detail"
                  >Edit</nuxt-link
                >
                <button
                  type="button"
                  @click="deletePlan(props.row.id)"
                  class="btn btn-primary delete"
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
    data() {
      return {
        columns: [
          {
            label: "Plan",
            field: "title"
          },
          {
            label: "Min BMR",
            field: "min_BMR"
          },
          {
            label: "Max BMR",
            field: "max_BMR"
          },
          {
            label: "Discount On Products",
            field: "discount_on_products"
          },
          {
            label: "Subscription Charge",
            field: "cost"
          },
          {
            label: "Action",
            field: "details"
          }
        ],
        subscription_plans: []
      };
    },
    mounted() {
      this.getPlans();
    },
    methods: {
      getPlans: function() {
        this.$store.dispatch("getPlans").then(res => {
          this.subscription_plans = JSON.parse(JSON.stringify(res.data));
        });
      },

      deletePlan: function(id) {
        // alert("Plan with id " + id + " will be deleted");
        // this.getPlans();
      }
    }
  };
</script>

<style>
.addTrainer {
  background-color: rgb(76, 175, 80);
  align-items: center;
  display: flex;
}

.addTrainer:hover {
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
