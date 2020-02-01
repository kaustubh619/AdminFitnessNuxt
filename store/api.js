// console.log(process.env.NODE_ENV);

var url;

if (process.env.NODE_ENV == "development") {
  var url = "http://127.0.0.1:8000";
} else {
  var url = "/backend";
}

export const state = () => ({
  login: url + "/api/login",

  allProducts: url,

  deleteAdmin: url + "/user/",

  deleteTrainer: url + "/user/",

  getsubCategoryDetails: url + "/subcategory/",

  getAllTrainer: url + "/user_trainer",

  getAllCust: url + "/user_cust",

  addTrainer: url + "/api/register",

  addTrainerExt: url + "/user_ext_post",

  getUserDetail: url + "/user/",

  getUserExtDetail: url + "/user_ext/",

  updateUser: url + "/user/",

  updateUserExt: url + "/user_ext/",

  getProductDetail: url + "/single/",

  getCategory: url + "/product/category",

  getSubCategory: url + "/product/subcategory/all",

  getBrand: url + "/product/brand/all",

  updateProduct: url + "/product_update/",

  deleteProduct: url + "/product/delete/",

  addProduct: url + "/create/product",

  allCategories: url + "/product/category",

  allSubCategories: url + "/product/subcategory/all",

  subCategoryIdDetail: url + "/subcategory/",

  allBrands: url + "/product/brand/all",

  deleteCategory: url + "/product/category/delete/",

  deleteSubCategory: url + "/product/subcategory/delete/",

  deleteBrand: url + "/product/brand/delete/",

  updateCategory: url + "/category/update/",

  addCategory: url + "/category/add",

  updateSubCategory: url + "/subcategory/",

  addSubCategory: url + "/subcategory/add",

  getBrandDetail: url + "/brand/",

  addBrand: url + "/product/brand/create",

  getPlans: url + "/subscription_plan",

  getPlanDetails: url + "/sub_plan/",

  getGalleryImages: url + "/images_gallery",

  updateGallery: url + "/update_gallery/",

  generateCoupon: url + "/coupon",

  getUserCoupon: url + "/get_coupon/",

  getAdmin: url + "/user_ext"
});

export const getters = {};
