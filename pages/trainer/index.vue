<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Trainers List</h3>
          <nuxt-link to="/trainer/add" style="text-decoration:none">
            <button class="btn addTrainer">
              <span class="white-text">Add Trainer</span>
            </button>
          </nuxt-link>
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="trainers_list">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <nuxt-link
                  :to="{
                    name: 'trainer-id',
                    params: { id: props.row.slug }
                  }"
                  class="btn detail"
                  >Edit</nuxt-link
                >
                <button
                  type="button"
                  class="btn btn-primary delete"
                  @click="deleteTrainerBio(props.row.slug)"
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
        trainers_list: [],
        columns: [
          {
            label: "Name",
            field: "trainer_name"
          },
          {
            label: "Phone",
            field: "trainer_contact"
          },
          {
            label: "Action",
            field: "details"
          }
        ]
      };
    },

    mounted() {
      this.getTrainersList();
    },

    methods: {
      getTrainersList: function() {
        this.$store.dispatch("getTrainersList").then(res => {
          this.trainers_list = JSON.parse(JSON.stringify(res.data));
        });
      },

      deleteTrainerBio: function(slug) {
        var x = confirm("Are you sure you want to delete?");
        if (x)
          return this.$store.dispatch("deleteTrainerBio", slug).then(res => {
            this.getTrainersList();
          });
        else return false;
      }
    }
  };
</script>

<style scoped>
.addTrainer {
  background-color: #ff9f00;
  font-size: 17px;
  font-weight: 400;
  text-shadow: 2px 1px 3px grey;
  transition: all 0.5s;
}

.addTrainer:focus {
  outline: none;
}

.addTrainer:hover {
  background-color: #fb641b;
}
</style>