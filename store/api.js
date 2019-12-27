// var url = "https://moovafrica.com/api/api";

console.log(process.env.NODE_ENV);

var url;

if (process.env.NODE_ENV == "development") {
  var url = "http://127.0.0.1:8000/backend/api/";
} else {
  var url = "/backend/api/";
}

console.log(url);

export const state = () => ({
  login: "http://127.0.0.1:8000/api/login",

  imageUpload: url + "products/upload/image",

  allProducts: "http://127.0.0.1:8000/",

  singleProduct: url + "products/single/",

  getCategory: url + "products/product/category",

  getsubCategory: url + "products/product/subcategory",

  getAllSubCategory: url + "products/product/subcategory/all",

  getBrand: url + "products/product/brand",

  getAllOrder: url + "orders",

  getAllAuction: url + "auction",

  getAllCompletedAuction: url + "auction/completed/",

  getAllOngoingAuction: url + "auction/ongoing/",

  addProduct: url + "products/create/product",

  addAuction: url + "auction/create",

  deleteAdmin: "http://127.0.0.1:8000/user/",

  deleteTrainer: "http://127.0.0.1:8000/user/",

  deleteSubCategory: url + "products/product/subcategory/delete/",

  deleteBrand: url + "products/product/brand/delete/",

  getsubCategoryDetails: "http://127.0.0.1:8000/subcategory/",

  allProductsRequests: url + "products/allProductsRequests", //id

  changeProductStatus: url + "products/product/changeProductStatus/", //id

  getAllSeller: "http://127.0.0.1:8000/user_ext", //id

  getAllTrainer: "http://127.0.0.1:8000/user_trainer",

  getAllCust: "http://127.0.0.1:8000/user_cust",

  addTrainer: "http://127.0.0.1:8000/api/register",

  addTrainerExt: "http://127.0.0.1:8000/user_ext_post",

  getUserDetail: "http://127.0.0.1:8000/user/",

  getUserExtDetail: "http://127.0.0.1:8000/user_ext/",

  updateUser: "http://127.0.0.1:8000/user/",

  updateUserExt: "http://127.0.0.1:8000/user_ext/",

  getProductDetail: "http://127.0.0.1:8000/single/",

  getCategory: "http://127.0.01:8000/product/category",

  getSubCategory: "http://127.0.01:8000/product/subcategory/all",

  getBrand: "http://127.0.01:8000/product/brand/all",

  updateProduct: "http://127.0.01:8000/product_update/",

  deleteProduct: "http://127.0.0.1:8000/product/delete/",

  addProduct: "http://127.0.0.1:8000/create/product",

  allCategories: "http://127.0.0.1:8000/product/category",

  allSubCategories: "http://127.0.0.1:8000/product/subcategory/all",

  subCategoryIdDetail: "http://127.0.0.1:8000/subcategory/",

  allBrands: "http://127.0.0.1:8000/product/brand/all",

  deleteCategory: "http://127.0.0.1:8000/product/category/delete/",

  deleteSubCategory: "http://127.0.0.1:8000/product/subcategory/delete/",

  deleteBrand: "http://127.0.0.1:8000/product/brand/delete/",

  updateCategory: "http://127.0.0.1:8000/category/update/",

  addCategory: "http://127.0.0.1:8000/category/add",

  updateSubCategory: "http://127.0.0.1:8000/subcategory/",

  addSubCategory: "http://127.0.0.1:8000/subcategory/add",

  getBrandDetail: "http://127.0.0.1:8000/brand/",

  addBrand: "http://127.0.0.1:8000/product/brand/create",

  getPlans: "http://127.0.0.1:8000/subscription_plan",

  getPlanDetails: "http://127.0.0.1:8000/sub_plan/"
});

export const getters = {
  // getLoginAPI(state) {
  //     return state.login
  // }
};
