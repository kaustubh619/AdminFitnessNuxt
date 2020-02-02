<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: center"
        >
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">
              Add Tainer
            </h2>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              v-model="name"
              class="trainer-form-control"
            />
            <input
              type="text"
              id="fb_link"
              placeholder="Facebook Link"
              v-model="fb_link"
              class="trainer-form-control"
            />
            <input
              type="text"
              id="insta_link"
              placeholder="Instagram Link"
              v-model="insta_link"
              class="trainer-form-control"
            />
            <input
              type="text"
              id="linkedin_link"
              placeholder="Linkedin Link"
              v-model="linkedin_link"
              class="trainer-form-control"
            />
            <input
              type="number"
              id="trainer_contact"
              placeholder="Contact No"
              v-model="trainer_contact"
              class="trainer-form-control"
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              v-model="address"
              class="trainer-form-control"
            />

            <div id="image-uploader" class="trainer-form-control">
              <label for="drag-drop-area" style="color: grey"
                >Trainer Gallery</label
              >
              <div id="drag-drop-area" style="margin-top: 10px"></div>
            </div>

            <div id="trainerEditor" class="trainer-form-control">
              <label for="editorjs" style="color: grey">Trainer Bio</label>
              <div
                id="editorjs"
                style="display: block;
                      min-width: 600px;
                      margin-top: 10px;
                      padding: 12px 10px;
                      border-radius: 3px;
                      border: 1px solid #c7c7c7;
                      box-shadow: 3px 2px 5px #e7e7e7;"
              ></div>
            </div>

            <button
              @click="updateTrainerBio"
              type="button"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto; padding: 10px 30px;"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let EditorJS, List;

  if (process.browser) {
    EditorJS = require("@editorjs/editorjs");
    List = require("@editorjs/list");
  }

  export default {
    data() {
      return {
        name: "",
        fb_link: "",
        insta_link: "",
        linkedin_link: "",
        trainer_contact: "",
        address: "",
        images: [],
        trainer_bio: "",
        previous_images: []
      };
    },

    mounted() {
      var uppy = Uppy.Core()
        .use(Uppy.Dashboard, {
          inline: true,
          target: "#drag-drop-area",
          width: 580,
          height: 300
        })
        .use(Uppy.XHRUpload, { endpoint: "http://mytruestrength.com/backend/uppy_image" });

      uppy.on("complete", result => {
        result.successful.map(item => {
          this.images.push(
            "http://mytruestrength.com/backend/media/uppy_images/" + item.name
          );
        });
      });

      this.getTrainerDetails();
    },

    methods: {
      getTrainerDetails: function() {
        this.$store
          .dispatch("getTrainerDetails", this.$route.params.id)
          .then(res => {
            this.name = res.data.trainer_name;
            this.fb_link = res.data.trainer_facebook_link;
            this.insta_link = res.data.trainer_instagram_link;
            this.linkedin_link = res.data.trainer_linkedin_link;
            this.trainer_contact = res.data.trainer_contact;
            this.address = res.data.trainer_address;
            this.trainer_bio = JSON.parse(res.data.trainer_bio);
            this.previous_images = res.data.trainer_gallery;
            console.log(res.data.trainer_gallery);
            this.editor = new EditorJS({
              holder: "editorjs",
              tools: {
                list: List
              },
              data: { blocks: this.trainer_bio }
            });
          });
      },

      updateTrainerBio: function() {
        this.editor.save().then(async data => {
          const payload = new FormData();
          payload.append("slug_id", this.$route.params.id);
          payload.append("trainer_name", this.name);
          payload.append("trainer_facebook_link", this.fb_link);
          payload.append("trainer_instagram_link", this.insta_link);
          payload.append("trainer_linkedin_link", this.linkedin_link);
          payload.append("trainer_contact", this.trainer_contact);
          payload.append("trainer_address", this.address);
          payload.append("trainer_gallery", this.images);
          payload.append("trainer_bio", JSON.stringify(data.blocks));
          if (this.images.length == 0) {
            payload.append("trainer_gallery", this.previous_images);
          } else {
            payload.append("trainer_gallery", this.images);
          }

          this.$store.dispatch("updateTrainerBio", payload).then(res => {
            this.$router.push("/trainer");
          });
        });
      }
    }
  };
</script>

<style scoped>
.trainer-form-control {
  display: block;
  min-width: 630px;
  margin: 20px;
  padding: 12px 10px;
  border-radius: 3px;
  border: 1px solid #c7c7c7;
  box-shadow: 3px 2px 5px #e7e7e7;
}

.trainer-form-control:focus {
  outline: none;
}
</style>